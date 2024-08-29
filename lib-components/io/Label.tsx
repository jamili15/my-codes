import { Field } from "react-final-form";

type LabelProps = {
  name: string;
  caption?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
};

export const Label: React.FC<LabelProps> = ({ name, caption, validate }) => {
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <div>
            <label>{caption}</label>
            <p>{props.input.value}</p>
          </div>
        );
      }}
    </Field>
  );
};
