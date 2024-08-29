import { Field } from "react-final-form";
import MuiSwitch, { SwitchProps as MuiSwitchProps } from "@mui/material/Switch";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

type SwitchProps = {
  name: string;
  caption?: string;
} & MuiSwitchProps;

export const Switch: React.FC<SwitchProps> = ({
  name,
  caption,
  ...componentProps
}) => {
  return (
    <Field name={name}>
      {(props) => {
        return (
          <MuiFormControlLabel
            checked={!!props.input.value}
            label={caption}
            control=<MuiSwitch {...props.input} {...componentProps} />
          />
        );
      }}
    </Field>
  );
};
