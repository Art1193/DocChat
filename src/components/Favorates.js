import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Zoom } from "react-reveal";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";

const Favorates = (props) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const [ind, setind] = useState(null);
  const [ans, setans] = useState(["hello"]);
  // useEffect(() => {
  //   // console.log(localStorage.getItem("fav"));
  //   const answer = JSON.parse(localStorage.getItem("fav"));
  //   setans(() => answer);
  //   // console.log(ans);
  // }, []);
  useEffect(() => {
    console.log(props.data);
    setans(props.data);
  }, [props.data]);

  let params = useParams();
  // console.log(params["*"]);
  return (
    <>
      <div className="grid grid-nogutter p-4">
        <div className="col-1">
          {ind && (
            <Button
              id="menu"
              size="lg"
              icon="pi pi-arrow-left"
              rounded
              outlined
              severity="info"
              aria-label="User"
              onClick={() => {
                setind(null);
              }}
            />
          )}
        </div>
        <div className="col-11 grid grid-nogutter">
          {!ind
            ? ans.map((item, ind) => (
                <div
                  className="col-4 p-3 grid grid-nogutter"
                  // style={{ display: "flex", flexDirection: "column", width: "auto" }}
                >
                  <div className="col-12 justify-content-center flex">
                    <Zoom duration={1100} delay={600}>
                      <img
                        id="temp_img"
                        src="/../images/folder.jpg"
                        height={120}
                        onClick={() => {
                          setind(ind + 1);
                        }}
                      />
                    </Zoom>
                  </div>
                  <div className="col-12 ">
                    <p className="text-center p-2">{item.name}</p>
                  </div>
                </div>
              ))
            : ans[ind - 1].inner.map((item, ind) => (
                <div
                  className="col-4 p-3"
                  // style={{ display: "flex", flexDirection: "column", width: "auto" }}
                >
                  <div className="col-12 justify-content-center flex">
                    <Zoom duration={1100} delay={600}>
                      <img
                        id="temp_img"
                        src="/../images/file.jpg"
                        height={120}
                      />
                    </Zoom>
                  </div>
                  <div className="col-12 ">
                    <p className="text-center p-2">{item.name}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Favorates;
