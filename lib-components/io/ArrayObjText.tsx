import { Field } from "react-final-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

interface ArrayObjTextProps
  extends Omit<
    MuiTextFieldProps,
    "name" | "value" | "onChange" | "helperText" | "error"
  > {
  name: string;
  valueKeys: string[][];
  labels?: Record<string, string>;
  validate?: (value: any) => undefined | string | Promise<any>;
  format?: (value: any) => any;
  parse?: (value: any) => any;
  initialValue?: any;
}

const ArrayObjText: React.FC<ArrayObjTextProps> = ({
  name,
  valueKeys,
  labels = {},
  validate,
  format,
  parse,
  initialValue,
  ...restProps
}) => {
  return (
    <Field
      name={name}
      validate={validate}
      format={format}
      parse={parse}
      initialValue={initialValue}
    >
      {({ input, meta }) => {
        const valueArray = Array.isArray(input.value)
          ? input.value
          : valueKeys.map(() => ({}));

        const handleChange = (
          groupIndex: number,
          key: string,
          value: string | number
        ) => {
          const updatedArray = [...valueArray];
          updatedArray[groupIndex] = {
            ...updatedArray[groupIndex],
            [key]: value,
          };
          input.onChange(updatedArray);
        };

        return (
          <div>
            {valueKeys.map((group, groupIndex) => (
              <div key={groupIndex} style={{ marginBottom: "20px" }}>
                {group.map((key) => (
                  <MuiTextField
                    key={`${groupIndex}-${key}`}
                    value={valueArray[groupIndex]?.[key] || ""}
                    onChange={(e) =>
                      handleChange(groupIndex, key, e.target.value)
                    }
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    label={labels[key] || key}
                    {...restProps}
                  />
                ))}
              </div>
            ))}
            {meta.touched && meta.error && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default ArrayObjText;
