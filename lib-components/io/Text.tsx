import { Field } from "react-final-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

type TextProps = {
  name: string;
  caption?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
} & MuiTextFieldProps;

export const Text: React.FC<TextProps> = ({
  name,
  title,
  caption,
  validate,
  ...restProps
}) => {
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <MuiTextField
            error={props.meta.touched && !!props.meta.error}
            helperText={props.meta.touched && props.meta.error}
            className="mt-4"
            label={caption}
            {...props.input}
            {...restProps}
          />
        );
      }}
    </Field>
  );
};
