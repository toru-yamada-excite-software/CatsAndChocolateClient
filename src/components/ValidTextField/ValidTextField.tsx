import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

export default function ValidTextField(props: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement>();
  const [inputError, setInputError] = useState(false);

  function onChange(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (!ref?.validity.valid) {
        setInputError(true);
      } else {
        setInputError(false);
      }
    }
    props.onChange?.(e);
  }

  return (
    <TextField
      {...{
        ...props,
        error: inputError,
        inputRef: inputRef,
        onChange: onChange,
      }}
    />
  );
}
