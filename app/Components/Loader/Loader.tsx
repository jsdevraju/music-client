import { Bars } from "react-loader-spinner";

const Loader = () => (
  <div className="flex items-center justify-center h-[40vh]">
    <Bars width="100" color="#0e7490" ariaLabel="loading-indicator" />
  </div>
);
export default Loader;
