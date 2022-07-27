import { Bars } from "react-loader-spinner";

const Loader = () => (
  <div
    className="flex items-center justify-center min-h-screen"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Bars width="100" color="#0e7490" ariaLabel="loading-indicator" />
  </div>
);
export default Loader;
