import React, { LabelHTMLAttributes } from "react";

interface IProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<IProps> = ({ children, ...props }) => (
  <label {...props}>{children}</label>
);
export default Label;