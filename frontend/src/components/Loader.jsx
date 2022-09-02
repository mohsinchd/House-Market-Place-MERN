import React from "react";
import loadingImg from "../imgs/loader/load.png";
const Loader = () => {
  return (
    <div className="loading d-flex justify-content-center">
      <img src={loadingImg} alt="Loading..."></img>
    </div>
  );
};

export default Loader;
