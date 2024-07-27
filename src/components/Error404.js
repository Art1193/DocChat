import React from "react";
import { Zoom } from "react-reveal";

const Error404 = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div
        className=""
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Zoom duration={"1200"}>
          <img
            id="home_img"
            src="/./images/error.jpg"
            style={{ height: "80vh" }}
          />
        </Zoom>
      </div>
    </div>
  );
};

export default Error404;
