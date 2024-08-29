import { Field } from "react-final-form";
import MuiRadio from "@mui/material/Radio";
import MuiRadioGroup, {
  RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material/RadioGroup";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormLabel from "@mui/material/FormLabel";

export type RadioItemType = {
  caption: string;
  value: string;
};

export const RadioItem: React.FC<RadioItemType> = ({ caption, value }) => {
  return (
    <MuiFormControlLabel value={value} control={<MuiRadio />} label={caption} />
  );
};

type RadioProps = {
  name: string;
  caption?: string;
  defaultValue?: any;
  items?: RadioItemType[];
} & MuiRadioGroupProps;

export const Radio: React.FC<RadioProps> = ({
  name,
  caption,
  children,
  defaultValue,
  items = [],
  ...restProps
}) => {
  let radioItems: React.ReactNode = undefined;
  if (items.length > 0) {
    radioItems = items.map((item) => <RadioItem {...item} />);
  } else {
    radioItems = children;
  }
  return (
    <Field name={name}>
      {(props) => {
        return (
          <MuiFormControl>
            {caption && (
              <MuiFormLabel id="mui-radio-id">{caption}</MuiFormLabel>
            )}
            <MuiRadioGroup
              aria-labelledby="mui-radio-id"
              defaultValue={defaultValue}
              {...props.input}
              {...restProps}
            >
              {radioItems}
            </MuiRadioGroup>
          </MuiFormControl>
        );
      }}
    </Field>
  );
};
