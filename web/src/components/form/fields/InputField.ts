import { Control, FieldValues } from "react-hook-form";
import { FieldProps } from "./Field";

export default interface InputField<T extends FieldValues> extends FieldProps {
    name: string,
    control: Control<T, any>
}