import { Field } from "react-final-form";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

type DateProps = {
  name: string;
  caption?: string;
  validate?: (value:any) => undefined | string;
} & MuiTextFieldProps;

export const Date: React.FC<DateProps> = ({ 
  name,
  title,
  caption,
  validate,
  ...restProps
}) => {
  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const todayStartOfTheDay = today.startOf('day');

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

