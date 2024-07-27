import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useRef, useState } from "react";
import { SplitButton } from "primereact/splitbutton";
import { Zoom } from "react-reveal";
import { Link, useNavigate, useParams } from "react-router-dom";
import Search from "../components/assets/Search";
import Splliter from "../components/assets/Splliter";
import { TieredMenu } from "primereact/tieredmenu";
import { SpeedDial } from "primereact/speeddial";

const Files = () => {
  const menu = useRef(null);
  let params = useParams();
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [path, setpath] = useState("./" + params["id"]);
  const [arr, setarr] = useState([]);
  const [paginator, setpaginator] = useState(0);
  const onPageChange = (event) => {
    setpaginator(event.first);
  };

  const items = [
    {
      label: "Update",
      icon: "pi pi-refresh",
    },
    {
      label: "Delete",
      icon: "pi pi-times",
    },
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {
        window.location.href = "https://reactjs.org/";
      },
    },
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => {
        //router.push('/fileupload');
      },
    },
  ];

  const [Folder, setFolder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setloading(true);
    const get_folders = async (val) => {
      // if (val != "./bjcjsg") {
      //   setarr([]);
      // } else {
      //   setarr([1, 2, 3, 4, 5]);
      // }
      console.log(val);
      let res = await fetch(
        "https://docchat-backend.onrender.com/api/folder/getFiles",
        {
          method: "POST",
          body: JSON.stringify({
            path: val,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      let data = await res.json();
      console.log(data);
      setloading(false);
      if (res.status == 200) {
        setarr(data);
        // alert("Sucussfully Fetched");
      } else {
        console.log("errorr");
      }
    };
    console.log("A folder is selected and fetching details in path : ", path);
    get_folders(path);
  }, [path]);
  const addFolder = async (val) => {
    console.log(val);
    let res = await fetch(
      "https://docchat-backend.onrender.com/api/folder/newFolder",
      {
        method: "POST",
        body: JSON.stringify({
          name: val,
          path: path + "/" + val,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    let data = await res.json();
    console.log(data);

    if (res.status == 200) {
      setloading(false);
      setarr(data);
      console.log(Folder);
      console.log("Sucuss");
      // alert("Sucussfully Fetched");
    } else {
      setloading(false);
      console.log("errorr");
    }
    get_folders(path);
  };
  const get_folders = async (val) => {
    setloading(true);
    console.log(val);
    let res = await fetch(
      "https://docchat-backend.onrender.com/api/folder/getFiles",
      {
        method: "POST",
        body: JSON.stringify({
          path: val,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    let data = await res.json();
    console.log(data);

    if (res.status == 200) {
      setloading(false);
      setarr(data);
      console.log(Folder);
      console.log("Sucuss");
      // alert("Sucussfully Fetched");
    } else {
      setloading(false);
      console.log("errorr");
    }
  };

  const [visible, setVisible] = useState(false);
  const header = <h2 className="text-center">File splliter</h2>;
  return (
    <div style={{ width: "100%" }}>
      <div class="grid grid-nogutter">
        <div className="col-12 flex justify-content-center align-items-center ">
          <h3 className="text-center mr-2">Path : {path}</h3>
          <Button
            text
            icon="pi pi-copy"
            rounded
            size="lg"
            onClick={() => {
              const val = path;
              navigator.clipboard.writeText(val);
            }}
          />
          <div className="">
            <Button
              className="custom-tooltip-btn ml-3"
              tooltipOptions={{ position: "top" }}
              icon="pi pi-folder"
              size="lg"
              rounded
              text
              severity="info"
              aria-label="User"
            />
          </div>
          <Tooltip
            target=".custom-tooltip-btn"
            position="bottom"
            autoHide={false}
            event="focus"
          >
            <div className="flex justify-content-center align-items-center p-1 md:pd-3">
              <div className="px-3">
                <InputText
                  style={{ borderRadius: "30px" }}
                  placeholder="Enter name ..."
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div>
                <Button
                  size="lg"
                  icon="pi pi-plus"
                  rounded
                  outlined
                  severity="info"
                  aria-label="User"
                  onClick={() => {
                    // setarr([
                    //   ...arr,
                    //   { name: name, isFile: false, path: path + "/" + name },
                    // ]);
                    addFolder(name);
                  }}
                />
              </div>
            </div>
          </Tooltip>
        </div>

        <div className="col-12 md:col-12 grid grid-nogutter px-4">
          <div
            className="col-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div className="flex-1">
              <Button
                className="ml-4 mr-3"
                size="lg"
                icon="pi pi-arrow-left"
                rounded
                text
                severity="info"
                aria-label="User"
                onClick={() => {
                  navigate(-1);
                  setpath(path.split("/").slice(0, -1).join("/"));
                }}
              />
            </div>
            <Search />
            <div className="flex-1">
              <Button
                className="ml-4"
                size="lg"
                text
                icon="pi pi-refresh"
                rounded
                severity="info"
                aria-label="User"
                onClick={() => get_folders(path)}
              />
            </div>
            <div className="flex">
              <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
              <Button
                id="menu_button"
                text
                icon="pi pi-ellipsis-v"
                rounded
                size="lg"
                onClick={(e) => menu.current.toggle(e)}
              />
              {/* <SpeedDial model={items} direction="down" /> */}
            </div>
          </div>
          {loading ? (
            <div className="col -12 h-15rem flex justify-content-center align-items-center">
              <h3 className="text-center">Loading ...</h3>
            </div>
          ) : (
            <>
              {arr.length == 0 ? (
                <div className=" col -12 flex justify-content-center align-items-center">
                  <img src="/../images/empty.jpg" height={280} />
                </div>
              ) : (
                <>
                  <div class="col-4 flex flex-column justify-content-center align-items-center p-2 ">
                    <Link to={arr[paginator].name}>
                      <Zoom duration={800} delay={200}>
                        {arr[paginator].isFile ? (
                          <img
                            src="/../images/file.jpg"
                            height={100}
                            alt="img"
                            id="temp_img"
                            onClick={() => {
                              setpath(path + "/" + arr[paginator].name);
                            }}
                          />
                        ) : (
                          <img
                            src="/../images/folder.jpg"
                            height={100}
                            id="temp_img"
                            alt="img"
                            onClick={() => {
                              setpath(path + "/" + arr[paginator].name);
                            }}
                          />
                        )}
                      </Zoom>
                    </Link>
                    <p className="text-center">{arr[paginator].name}</p>
                  </div>
                  {paginator + 1 < arr.length && (
                    <div class="col-4 flex flex-column justify-content-center align-items-center p-2 ">
                      <Zoom duration={800} delay={200}>
                        <Link to={arr[paginator + 1].name}>
                          {arr[paginator + 1].isFile ? (
                            <img
                              src="/../images/file.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                setpath(path + "/" + arr[paginator + 1].name);
                              }}
                            />
                          ) : (
                            <img
                              src="/../images/folder.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                setpath(path + "/" + arr[paginator + 1].name);
                              }}
                            />
                          )}
                        </Link>
                      </Zoom>
                      {/* <h3>{paginator + 1}</h3> */}
                      <p className="text-center">{arr[paginator + 1].name}</p>
                    </div>
                  )}
                  {paginator + 2 < arr.length && (
                    <div class="col-4 flex flex-column justify-content-center align-items-center p-2 ">
                      <Zoom duration={800} delay={200}>
                        <Link to={arr[paginator + 2].name}>
                          {arr[paginator + 2].isFile ? (
                            <img
                              src="/../images/file.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                setpath(path + "/" + arr[paginator + 2].name);
                              }}
                            />
                          ) : (
                            <img
                              src="/../images/folder.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                setpath(path + "/" + arr[paginator + 2].name);
                              }}
                            />
                          )}
                        </Link>
                      </Zoom>
                      {/* <h3>{paginator + 2}</h3> */}
                      <p className="text-center">{arr[paginator + 2].name}</p>
                    </div>
                  )}
                  {paginator + 3 < arr.length && (
                    <>
                      <div class="col-4  flex flex-column justify-content-center align-items-center p-2 ">
                        <Zoom duration={800} delay={200}>
                          <Link to={arr[paginator + 3].name}>
                            {arr[paginator + 3].isFile ? (
                              <img
                                src="/../images/file.jpg"
                                height={100}
                                id="temp_img"
                                alt="img"
                                onClick={() => {
                                  setpath(
                                    "./" +
                                      params["id"] +
                                      "/" +
                                      arr[paginator + 3].name
                                  );
                                }}
                              />
                            ) : (
                              <img
                                src="/../images/folder.jpg"
                                height={100}
                                id="temp_img"
                                alt="img"
                                onClick={() => {
                                  setpath(
                                    "./" +
                                      params["id"] +
                                      "/" +
                                      arr[paginator + 3].name
                                  );
                                }}
                              />
                            )}
                          </Link>
                        </Zoom>
                        {/* <h3>{paginator + 3}</h3> */}
                        <p className="text-center">{arr[paginator + 3].name}</p>
                      </div>
                    </>
                  )}
                  {paginator + 4 < arr.length && (
                    <div class="col-4 flex flex-column justify-content-center align-items-center p-2 ">
                      <Zoom duration={800} delay={200}>
                        <Link to={arr[paginator + 4].name}>
                          {arr[paginator + 4].isFile ? (
                            <img
                              src="/../images/file.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                setpath(
                                  "./" +
                                    params["id"] +
                                    "/" +
                                    arr[paginator + 4].name
                                );
                              }}
                            />
                          ) : (
                            <img
                              src="/../images/folder.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                setpath(
                                  "./" +
                                    params["id"] +
                                    "/" +
                                    arr[paginator + 4].name
                                );
                              }}
                            />
                          )}
                        </Link>
                      </Zoom>
                      {/* <h3>{paginator + 4}</h3> */}
                      <p className="text-center">{arr[paginator + 4].name}</p>
                    </div>
                  )}
                  {paginator + 5 < arr.length && (
                    <div class="col-4 flex flex-column justify-content-center align-items-center p-2 ">
                      <Zoom duration={800} delay={200}>
                        <Link to={"dfh"}>
                          {arr[paginator + 5].isFile ? (
                            <img
                              src="/../images/file.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                get_folders("./New Folder");
                              }}
                            />
                          ) : (
                            <img
                              src="/../images/folder.jpg"
                              height={100}
                              alt="img"
                              id="temp_img"
                              onClick={() => {
                                get_folders("./New Folder");
                              }}
                            />
                          )}
                        </Link>
                      </Zoom>
                      {/* <h3>{paginator + 5}</h3> */}
                      <p className="text-center">{arr[paginator + 5].name}</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* {Folder &&
            Folder.map((file) => (
              <>
                <div class="col-4 flex justify-content-center align-items-center p-2 ">
                  <Zoom duration={800} delay={200}>
                    <img src="/../images/file.jpg" height={100} id="temp_img" />
                    <h5>{file.name}</h5>
                  </Zoom>
                </div>
              </>
            ))} */}
          <div
            className="col-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // padding: "30px",
            }}
          >
            <div className="card">
              <Paginator
                first={paginator}
                rows={6}
                totalRecords={arr.length}
                onPageChange={onPageChange}
                template={{
                  layout: "PrevPageLink CurrentPageReport NextPageLink",
                }}
              />
            </div>
          </div>
        </div>
        {/* <div
          className="col-12 md:col-3 p-3"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Button
              label="open File Splitter"
              icon="pi pi-external-link"
              text
              raised
              rounded
              onClick={() => setVisible(true)}
            />
          </div>
        </div> */}
      </div>

      <Dialog
        header={header}
        visible={visible}
        style={{ width: "80vw", height: "85vh" }}
        onHide={() => setVisible(false)}
        maximizable
      >
        <Splliter />
      </Dialog>
    </div>
  );
};

export default Files;
