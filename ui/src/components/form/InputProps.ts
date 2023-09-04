import { UseFormRegister } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: number) => void;
}

export default InputProps;