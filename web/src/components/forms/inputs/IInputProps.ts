interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: any;
    onChange?: (value: any) => void;
}

export default InputProps;