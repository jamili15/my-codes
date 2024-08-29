import { Field } from "react-final-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

interface ArrayTextProps
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

const ArrayText: React.FC<ArrayTextProps> = ({
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
        const values = Array.isArray(input.value)
          ? input.value
          : valueKeys.map(() => "");

        const handleChange = (index: number, value: string) => {
          const updatedValues = [...values];
          updatedValues[index] = value;
          input.onChange(updatedValues);
        };

        return (
          <div>
            {valueKeys.map((key, index) => (
              <MuiTextField
                key={key}
                value={values[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                label={labels[key] || key}
                {...restProps}
              />
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

export default ArrayText;
