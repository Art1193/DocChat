import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JoinRoom = () => {
  const parms = useParams();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/signin");
  //   }
  // }, []);

  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      console.log(parms["id"], JSON.parse(localStorage.getItem("user"))._id);
      console.log("hello");
      const fetchData = async () => {
        let res = await fetch(
          "https://docchat-backend.onrender.com/api/room/joinRoom",
          {
            method: "POST",
            body: JSON.stringify({
              user: JSON.parse(localStorage.getItem("user"))._id,
              room: parms["id"],
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );
        const data = res.json();
        if (res.status == 200) {
          console.log(res.json());
          localStorage.setItem("user", JSON.stringify(data));
          setisloading(false);
          console.log("Uploaded");
          alert("Room created Sucussfully");
        } else {
          console.log(res.json());
          setisloading(false);
        }
        setisloading(false);
      };
      fetchData();
    }
  }, []);

  return (
    <div>
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
              src="/../images/loading_animation.gif"
              height={450}
            />
          </div>
          <h3 className="text-center p-2">Creating Room .....</h3>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
