import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../app/Layout/Layout";
import StoreProvider from "../app/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </>
  );
}

export default MyApp;
