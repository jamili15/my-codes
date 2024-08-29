import { Field } from "react-final-form";
import MuiFormControl from "@mui/material/FormControl";
import MuiInputLabel from "@mui/material/InputLabel";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import MuiMenuItem from "@mui/material/MenuItem";

export type SelectItemType = {
  objid?: string;
  caption: string;
  value: string | number | undefined;
};

type SelectProps = {
  name: string;
  caption?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
  items?: SelectItemType[];
  itemKey?: string;
  minWidth?: number;
} & MuiSelectProps;

export const SelectItem = MuiMenuItem;

export const Select: React.FC<SelectProps> = ({
  name,
  title,
  caption,
  validate,
  children,
  minWidth = 120,
  items = [],
  itemKey = "objid",
  ...restProps
}) => {
  let selectItems: React.ReactNode = null;
  if (items.length > 0) {
    selectItems = items?.map((item) => (
      <MuiMenuItem key={item[itemKey]} value={item.value}>
        {item.caption}
      </MuiMenuItem>
    ));
  } else {
    selectItems = children;
  }
  return (
    <div>
      <MuiFormControl sx={{ m: 1, minWidth: minWidth }}>
        <MuiInputLabel id="id-mui-select">{caption}</MuiInputLabel>
        <Field name={name} validate={validate}>
          {(props) => {
            return (
              <MuiSelect
                labelId="id-mui-select"
                id="mui-select"
                {...props.input}
                {...restProps}
              >
                {selectItems}
              </MuiSelect>
            );
          }}
        </Field>
      </MuiFormControl>
    </div>
  );
};
