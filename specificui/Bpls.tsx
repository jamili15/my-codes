import React from "react";
import Footer from "../layouts/Footer";
import Header from "../Header";
import Template from "../layouts/Template";
import QueueGroup from "../modules/QueueGroup";
import QueueTv from "../modules/QueueTv";

const Bpls = () => {
  return (
    <Template
      title="Home Page"
      description="Welcome to our website!"
      templateType="template2" //there a two templates. { template1 and template2 }. To change the template replace the templateType=" " to template1 or template2.
    >
      <Header componentType="header" />
      <QueueGroup
        numberOfItems={8}
        componentType="main-left"
        orientation="vertical" // available properties horizontal and vertical
        verticalRows={3}
        horizontalCols={0}
      />
      <QueueTv
        src={"/videos/example.mp4"}
        componentType="main-right"
        layoutType="custom" //there a two layouts. { default and custom }. To change the layout replace the layoutType=" " to default or custom.
      />
      <Footer
        componentType="footer"
        groupName={"Business Permit and Licensing System"}
        groupAddr={"Cebu City"}
      />
    </Template>
  );
};

export default Bpls;
