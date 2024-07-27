import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef } from "react";
import { Zoom } from "react-reveal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Login from "./Signin";
const Home = () => {
  const toast = useRef(null);

  const showSticky = (severity, summary, Message) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: Message,
      sticky: true,
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  // const socket = io("http://localhost:3001");
  // socket.on("connect", () => {
  //   console.log("Connected to WebSocket server");
  // });
  return (
    <div>
      <Toast ref={toast} />
      {() =>
        showSticky("success", "Successfully Logged In", "Welcome Back 🤩🤩")
      }
      <div
        id="home_"
        className="homeroom_img"
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Zoom duration={"1200"} delay={600}>
          <img
            id="home_img"
            src="/./images/room.jpg"
            style={{ height: "70vh", padding: "30px" }}
          />
        </Zoom>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/createroom" style={{ textDecoration: "none" }}>
          <Button
            label="Create Room"
            icon="pi pi-bolt"
            className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap "
          />
        </Link>
      </div>
      <h2 className="text-center pt-3 pb-3">or</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button label="Join a room" size="lg" text />
      </div>
    </div>
  );
};

export default Home;
