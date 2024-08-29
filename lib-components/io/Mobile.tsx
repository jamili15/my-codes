import { Field } from "react-final-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

type MobileProps = {
  name: string;
  caption?: string;
} & MuiTextFieldProps;

export const Mobile: React.FC<MobileProps> = ({
  name,
  caption,
  ...restProps
}) => {
  return (
    <Field name={name}>
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
