import * as React from "react";
import { Field } from "react-final-form";
import MuiFormControl from "@mui/material/FormControl";
import MuiInputLabel from "@mui/material/InputLabel";
import MuiOutlinedInput, {
  OutlinedInputProps as MuiOutlinedInputProps,
} from "@mui/material/OutlinedInput";
import MuiFilledInput, {
  FilledInputProps as MuiFilledInputProps,
} from "@mui/material/FilledInput";
import MuiFormHelperText from "@mui/material/FormHelperText";
import { NumericFormat } from "react-number-format";

const DecimalFormat = React.forwardRef((props: any, ref) => {
  const {
    onChange,
    onFocus,
    onBlur,
    value,
    allowNegative,
    thousandSeparator,
    decimalScale,
    prefix,
    suffix,
    textAlign,
  } = props;
  return (
    <NumericFormat
      getInputRef={ref}
      defaultValue={value}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: +values.value,
          },
        });
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      valueIsNumericString={false}
      allowNegative={allowNegative}
      thousandSeparator={thousandSeparator}
      prefix={prefix}
      suffix={suffix}
      decimalScale={decimalScale}
      fixedDecimalScale={true}
      style={{
        textAlign: textAlign,
        width: "100%",
        border: "none",
        outline: "none",
        height: "55px",
        zIndex: -1,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    />
  );
});

type DecimalProps = {
  name: string;
  caption?: string;
  captionLayout?: string;
  minWidth?: number;
  decimalScale?: number;
  allowNegative?: boolean;
  thousandSeparator?: boolean;
  prefix?: string;
  suffix?: string;
  variant?: "filled" | "outlined" | "standard";
  textAlign?: "left" | "right" | "center";
  validate?: (value: any) => undefined | string;
} & MuiOutlinedInputProps &
  MuiFilledInputProps;

export const Decimal: React.FC<DecimalProps> = ({
  name,
  caption,
  captionLayout,
  validate,
  allowNegative = false,
  thousandSeparator = true,
  decimalScale = 2,
  textAlign = "center",
  variant = "outlined",
  prefix = undefined,
  suffix = undefined,
  ...restProps
}) => {
  let BgColor = "";
  let FieldComponent = MuiOutlinedInput;
  if (variant === "filled") {
    FieldComponent = MuiFilledInput;
    BgColor = " !bg-transparent";
  }
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <MuiFormControl className="mt-4">
            <MuiInputLabel
              htmlFor="my-input"
              variant={variant}
              className={`bg-white px-1 ${captionLayout} ${BgColor}`}
            >
              {caption}
            </MuiInputLabel>
            <FieldComponent
              id="my-input"
              aria-describedby="my-helper-text"
              components={{ Input: DecimalFormat }}
              slotProps={{
                input: {
                  allowNegative: allowNegative,
                  thousandSeparator: thousandSeparator,
                  decimalScale: decimalScale,
                  prefix: prefix,
                  suffix: suffix,
                  textAlign: textAlign,
                  onChange: props.input.onChange,
                },
              }}
              {...restProps}
              {...props.input}
            />
            {props.meta.touched && props.meta.error && (
              <MuiFormHelperText
                error={props.meta.touched && !!props.meta.error}
              >
                {props.meta.error}
              </MuiFormHelperText>
            )}
          </MuiFormControl>
        );
      }}
    </Field>
  );
};
