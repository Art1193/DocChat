import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Tooltip } from "primereact/tooltip";
import { Zoom } from "react-reveal";
import { ScrollPanel } from "primereact/scrollpanel";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  let params = useParams();
  const roomId = params["id"]
  const userId = JSON.parse(localStorage.getItem("user")).name
  const socket = props.socketio;
  const joinRoom = () => {
    socket.emit('join_room', { "username" : userId, "room" : roomId })
    setVisible(true)
  }
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{
    message: "Welcome to Chat",
    username: ""
  }]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessages((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });
    return () => socket.off('receive_message');
  }, [socket]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      socket.emit('send_message', { "username" : userId, "room" : roomId, message, __createdtime__ });
      setMessage('');
    }
    console.log(messages);
  }
  const header = (
    <div className="grid grid-nogutter grid grid-nogutter-nogutter">
      <div className="col-2">
        <Button
          className="custom-tooltip-btn"
          type="button"
          tooltip="Current viewers"
          text
          size="lg"
          icon="pi pi-eye"
          tooltipOptions={{ position: "bottom" }}
        />
      </div>
      <div style={{width : "100%"}}>
        <h2 className="text-center">Chat Room ...</h2>
      </div>
    </div>
  );
  const footerContent = (
    <div className="grid grid-nogutter">
      <div className="col-8">
        <InputTextarea
          style={{ width: "50vw" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
        />
      </div>

      <div className="col-4">
        <Button
          icon="pi pi-send"
          rounded
          size="lg"
          onClick={sendMessage}
          texticon="pi pi-check"
          text
          tooltip="Send message"
          tooltipOptions={{
            position: "bottom",
          }}
        />
      </div>
    </div>
  );
  return (
    <div style={{ height: "100%" }}>
      <div>
        <div
          className="homeroom_img"
          style={{
            height: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Zoom duration={"1200"}>
            <img
              id="chat_img"
              src="/../images/chat.jpg"
              style={{ height: "45vh", padding: "10px" }}
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
          <Tooltip
            target=".p-dialog-titlebar-close"
            tooltip="Enter your username"
            tooltipOptions={{ position: "top" }}
          />
          <Dialog
            header={header}
            visible={visible}
            style={{ width: "60vw", backgroundColor : "red"}}
            onHide={() => setVisible(false)}
            footer={footerContent}
            breakpoints={{ "960px": "85vw", "641px": "90vw" }}
          >
          <div style={{display : "flex", flexDirection : "column", alignItems : "flex-start"}}>
      {messages.map((msg, i) => (
        <div key={i} style={{padding : "5px", backgroundColor : "#E8F0FE", borderRadius : "5px", width : "fit-content", marginBottom : "25px", alignSelf : msg.username == userId ? "flex-end" : ""}}> {
        }
            <span style={{fontSize : "13px"}}>{msg.username}</span>
          <p style={{fontSize : "15px"}}>{msg.message}</p>
            <span style={{fontSize : "10px"}}>
              {msg.__createdtime__ ? formatDateFromTimestamp(msg.__createdtime__) : "" }
            </span>
        </div>
      ))}
    </div>            
          </Dialog>
          <Button
            tooltip="Join Chat room"
            tooltipOptions={{ position: "top" }}
            label="Join Chat"
            onClick={joinRoom}
            icon="pi pi-bolt"
            className="m-3 font-bold px-5 py-3 p-button-raised p-button-rounded   "
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
