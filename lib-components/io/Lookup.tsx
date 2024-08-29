import { Field } from "react-final-form";

type LookupProps = {
  name: string;
  caption?: string;
  validators?: [];
  validate?: (value: any) => undefined | string;
};

export const Lookup: React.FC<LookupProps> = ({ name, caption, validate }) => {
  return (
    <Field name={name} validate={validate}>
      {(props) => {
        return (
          <div>
            <h1>Lookup Component Under Construction</h1>
            <label>{caption}</label>
          </div>
        );
      }}
    </Field>
  );
};
