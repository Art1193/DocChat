import { Button } from "primereact/button";
import React, { useRef, useState } from "react";

import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Zoom } from "react-reveal";
import { Toast } from "primereact/toast";

const CreateRoom = () => {
  const toast = useRef(null);

  const showSticky = (severity, summary, Message) => {
    console.log("inside toast");
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: Message,
      sticky: true,
    });
  };
  const options = ["Public", "Private"];
  const [name, setName] = useState("");
  const [visability, setvisability] = useState(false);
  const [count, setCount] = useState(1);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(options[0]);
  const [isloading, setisloading] = useState(false);
  const createroom = async () => {
    if (value == "private") {
      setValue(true);
    } else {
      setValue(false);
    }
    console.log(
      name,
      count,
      JSON.parse(localStorage.getItem("user"))._id,
      visability
    );
    let res = await fetch(
      "https://docchat-backend.onrender.com/api/room/newRoom",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          maxUsers: count,
          private: visability,
          user: JSON.parse(localStorage.getItem("user"))._id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    const data = await res.json();
    if (res.status == 200) {
      setisloading(false);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      console.log("Uploaded");
      showSticky(
        "success",
        "Room Created Successfully",
        "Click here to View 🤩🤩"
      );
    } else {
      console.log(data);
      setisloading(false);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Toast ref={toast} />
      {isloading && (
        <div style={{ height: "100%" }}>
          <div
            style={{
              display: "flex",
              paddingTop: "150px",
              justifyContent: "center",
            }}
          >
            <img
              id="chat_img"
              src="../images/loading_animation.gif"
              height={450}
            />
          </div>
          <h3 className="text-center p-2">Creating Room .....</h3>
        </div>
      )}
      {!isloading && (
        <div
          className="flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <div className=" p-4  border-round w-full lg:w-6">
            <div className="text-center mb-5">
              <Zoom duration={"1200"}>
                <img
                  src="../images/logo.png"
                  alt="hyper"
                  height={80}
                  className="mb-3"
                />
              </Zoom>

              <h1 className="p-4">Create Room</h1>
              <span className="text-600 font-medium line-height-3">
                Don't know how to use?
              </span>
              <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                Check here!
              </a>
            </div>
            <Zoom duration={"1200"} delay={600}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-900 font-medium mb-2"
                >
                  Name
                </label>
                <InputText
                  id="password"
                  placeholder="Enter Name of your room"
                  className="w-full mb-3"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <div className="flex align-items-center justify-content-center p-3">
                  <Button
                    type="button"
                    icon="pi pi-plus"
                    onClick={() => setCount(count + 1)}
                    className="p-button-rounded p-button-success ml-2"
                  ></Button>
                  <h3 className="text-center px-2" style={{ minWidth: "5rem" }}>
                    Max users: {count}
                  </h3>
                  <Button
                    type="button"
                    icon="pi pi-minus"
                    onClick={() => setCount(count - 1)}
                    className="p-button-rounded p-button-danger ml-2"
                  ></Button>
                </div>
                <div className="p-3 flex justify-content-center">
                  <SelectButton
                    value={value}
                    onChange={(e) => {
                      if (e.value == "Private") {
                        setValue(e.value);
                        setvisability(true);
                      }
                    }}
                    options={options}
                  />
                </div>

                <div className="flex align-items-center justify-content-between mb-6">
                  <div className="flex align-items-center">
                    <Checkbox
                      id="rememberme"
                      onChange={(e) => setChecked(e.checked)}
                      checked={checked}
                      className="mr-2"
                    />
                    <label htmlFor="rememberme">
                      Accept terms & Conditions
                    </label>
                  </div>
                </div>
                <div className="flex  justify-content-center">
                  <Button
                    label="Create Room"
                    icon="pi pi-bolt"
                    rounded
                    className="w-full"
                    onClick={() => {
                      setisloading(true);
                      createroom();
                    }}
                  />
                </div>
              </div>
            </Zoom>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
