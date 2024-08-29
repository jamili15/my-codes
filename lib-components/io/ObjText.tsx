import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import React from "react";
import { Field } from "react-final-form";

interface ObjTextProps
  extends Omit<
    MuiTextFieldProps,
    "name" | "value" | "onChange" | "helperText" | "error"
  > {
  name: string;
  valueKeys: string[];
  labels?: Record<string, string>;
  validate?: (value: any) => undefined | string | Promise<any>;
  format?: (value: any) => any;
  parse?: (value: any) => any;
  initialValue?: any;
}

function ObjText({
  name,
  valueKeys,
  labels = {},
  validate,
  format,
  parse,
  initialValue,
  ...restProps
}: ObjTextProps) {
  return (
    <Field
      name={name}
      validate={validate}
      format={format}
      parse={parse}
      initialValue={initialValue}
    >
      {({ input, meta }) => {
        const initialValues = [].reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {} as Record<string, string>);

        const val = input.value || initialValues;

        const handleChange = (key: string | number, value: string) => {
          const updatedVal = { ...val, [key]: value };
          input.onChange(updatedVal);
        };

        return (
          <>
            {valueKeys.map((key, index) => (
              <MuiTextField
                key={index}
                value={val[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                label={labels[key] || key}
                {...restProps}
              />
            ))}
            {meta.touched && meta.error && (
              <span style={{ color: "red" }}>{meta.error}</span>
            )}
          </>
        );
      }}
    </Field>
  );
}

export default ObjText;
