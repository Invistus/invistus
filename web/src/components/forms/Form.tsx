import React, { FormEventHandler, useEffect } from "react";
import ErrorMessages from "./errors/ErrorMessages";
import { FieldErrors } from "react-hook-form";
import { useFocus } from "utils/focus";

export type FormProps = {
    children: any;
    onSubmit?: FormEventHandler | undefined;
    className?: string;
    errors?: FieldErrors;
}

const Form: React.FC<FormProps> = ({ children, className, onSubmit, errors }: FormProps) => {
  const [ref, setFocus] = useFocus<HTMLDivElement>();
  useEffect(() => {
    setFocus();
  }, [errors]);
  return (
    <div className={`${className || ""}`}>
      {errors && <ErrorMessages errors={errors} ref={ref}/>}
      <form onSubmit={onSubmit}>
          {children}
      </form>       
    </div>
  );
};
  
export default Form;