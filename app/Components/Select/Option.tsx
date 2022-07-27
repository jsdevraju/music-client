import React, { FC, OptionHTMLAttributes } from "react";

interface IProps extends OptionHTMLAttributes<HTMLOptionElement> {}

const Option: FC<IProps> = ({ children, ...props }) => (
  <option {...props}>{children}</option>
);

export default Option;
