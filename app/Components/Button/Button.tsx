import React, { ButtonHTMLAttributes, FC } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<IProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default Button;
