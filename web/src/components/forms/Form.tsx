import React, { FormEventHandler } from "react";
import ErrorMessages from "./errors/ErrorMessages";
import { FieldErrors } from "react-hook-form";

export type FormProps = {
    children: any;
    onSubmit?: FormEventHandler | undefined;
    className?: string;
    errors?: FieldErrors;
}

const Form: React.FC<FormProps> = ({ children, className, onSubmit, errors }: FormProps) => {
    return (
      <div className={`${className || ""}`}>
        {errors && <ErrorMessages errors={errors} />}
        <form onSubmit={onSubmit}>
            {children}
        </form>       
      </div>
    );
  };
  
  export default Form;