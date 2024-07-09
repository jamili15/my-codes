import { Manager } from "socket.io-client";
import connections from "./connections";
import serviceMgr from "./service-manager";

const CHANNEL = "/gdx";

const gdxConnection = connections["gdx"];

console.log("gdxConnection", gdxConnection);

const CONNECTION_TIMEOUT = gdxConnection["readTimeout"]
  ? +gdxConnection["readTimeout"]
  : 120 * 1000;

const manager = new Manager(gdxConnection["app.host"], {
  reconnectionDelayMax: 5000,
  timeout: CONNECTION_TIMEOUT,
  connect_timeout: CONNECTION_TIMEOUT,
});

const socket = manager.socket(CHANNEL, {
  timeout: CONNECTION_TIMEOUT,
});

const isRemote = (serviceName) => {
  return serviceName.indexOf(":") > 0;
};

const findRemoteService = (name, connection, module) => {
  const idx = name.indexOf(":");
  const channel = name.substring(0, idx);
  const serviceName = name.substring(idx + 1);
  return RemoteProxy(serviceName, channel, connection, module);
};

const findLocalService = ({ serviceName, connection, module }) => {
  return LocalProxy(serviceName, connection, module);
};

const RemoteProxy = (name, channel, connection, module) => {
  const invoke = async (method, args) => {
    const promise = new Promise((resolve, reject) => {
      const params = {
        service: name,
        method: method,
        connection: connection,
        channel: channel,
        module: module,
        args: args,
      };

      console.log(
        `RemoteProxy [status] invoking ${params.service}.${params.method} channel: ${params.channel} connection: ${connection}`
      );

      socket.emit("invoke", params, (res) => {
        if (res.status === "OK") {
          resolve(res.data);
        } else {
          reject(res.msg);
        }
      });
    });
    return await promise;
  };
  return { invoke };
};

const LocalProxy = (name, connection, module) => {
  const invoke = async (action, args) => {
    try {
      const svc = await serviceMgr.getService(name, action, connection);
      return await svc.invoke(args);
    } catch (err) {
      throw err.toString();
    }
  };
  return { invoke };
};

const serviceCache = {};

const Service = {};

Service.lookup = function (serviceName, connection = "default", module) {
  if (serviceCache[serviceName] == null) {
    let svc;
    if (isRemote(serviceName)) {
      svc = findRemoteService(serviceName, connection, module);
    } else {
      svc = findLocalService({
        serviceName,
        connection,
        module,
      });
    }
    serviceCache[serviceName] = svc;
  }
  return serviceCache[serviceName];
};

export default Service;
