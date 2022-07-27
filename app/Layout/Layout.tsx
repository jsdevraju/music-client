import React, { FC, ReactNode } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
