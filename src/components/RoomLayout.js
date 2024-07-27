import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { Chart } from "chart.js";
import Chat from "../room_assets/Chat";
import Upload from "../room_assets/Upload";
import Stats from "../room_assets/Stats";
import Files from "../room_assets/Files";
import Menu from "./assets/Menu";
import { Button } from "primereact/button";

const RoomLayout = (props) => {
  const [id, setid] = useState({});
  const num = useParams();
  useEffect(() => {
    setid(num);
    console.log(id.id);
  }, [num]);

  return (
    <div style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <div className="grid grid-nogutter">
        {/* <div className="col-12 grid grid-nogutter mt-3 mb-3">
          <div
            className="col-1"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="../images/logo.png" height={50} />
            </div>
          </div>
          <div className="col-9">
            <h1 className="text-start ">Doc Chat</h1>
          </div>
          <div className="col-2">
            <Menu />
          </div>
        </div> */}
      </div>
      <div
        id="room_grid"
        className="flex mt-3 justify-content-center align-items-center"
      >
        <h2 className="text-center">Room Id :- {id.id}</h2>
        <Button
          text
          className="ml-5"
          icon="pi pi-share-alt"
          rounded
          size="lg"
          onClick={() =>
            navigator.clipboard.writeText(
              `http://localhost:3000/joinroom/${id.id}`
            )
          }
        />
      </div>
      <div
        className="network_img"
        style={{ position: "absolute", bottom: "0", right: "0" }}
      >
        <img src="/.../images/network.jpg" height={250} />
      </div>
      <div className=" pt-0">
        <TabView>
          <TabPanel
            className=""
            header="Files"
            leftIcon="pi pi-file mr-2"
            headerClassName="flex align-content-between"
          >
            <Files />
          </TabPanel>
          <TabPanel
            header="Upload"
            leftIcon="pi pi-upload mr-2"
            className=""
            headerClassName="flex align-content-between"
          >
            <Upload />
          </TabPanel>
          <TabPanel
            header="Chat"
            className=""
            leftIcon="pi pi-comments mr-2"
            headerClassName="flex align-content-between"
          >
            <Chat socketio={props.socketio} />
          </TabPanel>
          <TabPanel
            header="Stats"
            className=""
            leftIcon="pi pi-chart-bar mr-2"
            headerClassName="flex align-content-between"
          >
            <Stats />
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default RoomLayout;
