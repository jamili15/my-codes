import React from "react";
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
  FormRenderProps,
} from "react-final-form";

type FormProps = {
  children?: (props: FormRenderProps) => React.ReactNode;
  render?: (props: FormRenderProps) => React.ReactNode;
} & FinalFormProps;

export const Form: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  children,
  render,
  validate,
}) => {
  return (
    <FinalForm
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues || {}}
      render={(formRenderProps) => (
        <form onSubmit={formRenderProps.handleSubmit}>
          {render
            ? render(formRenderProps)
            : children
            ? (children as (props: FormRenderProps) => React.ReactNode)(
                formRenderProps
              )
            : null}
        </form>
      )}
    />
  );
};

export default Form;
