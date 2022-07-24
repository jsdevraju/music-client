import React, { ButtonHTMLAttributes, FC } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Input: FC<IProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default Input;
