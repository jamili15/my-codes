import { Field } from "react-final-form";
import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import MuiFormGroup from "@mui/material/FormGroup";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

type CheckboxProps = {
  name: string;
  caption?: string;
} & MuiCheckboxProps;

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  caption,
  required,
  disabled,
  ...componentProps
}) => {
  return (
    <Field name={name}>
      {(props) => {
        return (
          <MuiFormGroup>
            <MuiFormControlLabel
              checked={!!props.input.value}
              label={caption}
              control={<MuiCheckbox {...props.input} {...componentProps} />}
              required={required}
              disabled={disabled}
            />
          </MuiFormGroup>
        );
      }}
    </Field>
  );
};
