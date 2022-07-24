import React, { FC, InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<IProps> = ({ ...props }) => <input {...props} />;

export default Input;
