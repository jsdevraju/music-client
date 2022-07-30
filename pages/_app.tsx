import "../styles/globals.css";
import type { AppProps } from "next/app";
// import Layout from "../app/Layout/Layout";
import StoreProvider from "../app/store";
import { Toaster } from "react-hot-toast";
import Navbar from "../app/Components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <StoreProvider>
        <Navbar />
        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}

export default MyApp;
