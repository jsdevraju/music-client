import React, { FC, ReactNode } from "react";
import Navbar from "../Components/Navbar/Navbar";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;
