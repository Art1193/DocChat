import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useState } from "react";
import { Zoom } from "react-reveal";
import { Outlet } from "react-router-dom";
import Favorates from "./Favorates";

import { Paginator } from "primereact/paginator";

const Profile = (props) => {
  const [Fav, setFav] = useState([]);
  const [paginator, setpaginator] = useState(0);
  const onPageChange = (event) => {
    setpaginator(event.first);
  };
  const [show_Fav, setshow_Fav] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [value, setvalue] = useState("");
  const [visible, setVisible] = useState(false);
  const [userDetails, setuserDetails] = useState([]);
  const [img_indx, setimg_indx] = useState(1);
  const add_element = (item) => {
    const new_fav = [...Fav, item];
    setFav(new_fav);
    localStorage.setItem("fav", JSON.stringify(new_fav));
  };
  useEffect(() => {
    setFav(JSON.parse(localStorage.getItem("fav")) || []);
    setuserDetails(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center p-5">Profile</h1>
        {!show_Fav && (
          <div className="">
            <div className="justify-content-center align-items-center flex p-2 pt-0">
              <Button
                text
                icon="pi pi-angle-left"
                rounded
                size="lg"
                onClick={() => {
                  setimg_indx((pre) => (pre - 1) % 6);
                  console.log(img_indx);
                }}
              />
              <Zoom duration={"1200"}>
                <img
                  src={`../images/user${img_indx}.jpg`}
                  height={220}
                  className="m-2"
                />
              </Zoom>
              <Button
                text
                size="lg"
                icon="pi pi-angle-right"
                rounded
                onClick={() => {
                  setimg_indx((pre) => (pre + 1) % 6);
                  console.log(img_indx);
                }}
              />
            </div>
            <h3 className="text-center p-2">{userDetails.name}</h3>
            <div className="justify-content-center align-items-center flex">
              <Button
                label="view Fav"
                text
                icon="pi pi-heart"
                raised
                rounded
                onClick={() => setshow_Fav(true)}
              />
            </div>
            <div className="p-5">
              <div className="grid grid-nogutter m-3 p-4 ">
                <div className="col-12 md:col-4 py-3 justify-content-center flex ">
                  <h3
                    className="text-center "
                    style={{ border: "1px solid black", width: "30%" }}
                  >
                    Rooms {paginator - 2}
                  </h3>
                </div>
                <div className="col-12 md:col-4 py-3 justify-content-center flex">
                  <h3
                    className="text-center "
                    style={{ border: "1px solid black", width: "30%" }}
                  >
                    Rooms {paginator - 1}
                  </h3>
                </div>
                <div className="col-12 md:col-4 py-3 justify-content-center flex">
                  <h3
                    className="text-center "
                    style={{ border: "1px solid black", width: "30%" }}
                  >
                    Rooms {paginator}
                  </h3>
                </div>
              </div>
              <div className="card">
                <Paginator
                  first={paginator}
                  rows={3}
                  totalRecords={50}
                  onPageChange={onPageChange}
                  template={{
                    layout: "PrevPageLink CurrentPageReport NextPageLink",
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {show_Fav && (
          <>
            <div>
              <div>
                <div className="justify-content-center align-items-center flex">
                  <Button
                    className="mr-4"
                    size="lg"
                    icon="pi pi-arrow-left"
                    rounded
                    outlined
                    severity="info"
                    aria-label="User"
                    onClick={() => {
                      setshow_Fav(false);
                    }}
                  />
                  <Button
                    label="Add new Folder"
                    text
                    icon="pi pi-folder"
                    raised
                    rounded
                    onClick={() => setVisible(true)}
                  />
                  <Button
                    className="custom-tooltip-btn ml-3"
                    size="lg"
                    tooltipOptions={{ position: "top" }}
                    icon="pi pi-bookmark"
                    rounded
                    outlined
                    severity="info"
                    aria-label="User"
                  />
                  <Tooltip
                    target=".custom-tooltip-btn"
                    position="bottom"
                    autoHide={false}
                    event="focus"
                  >
                    <div className="flex justify-content-center align-items-center p-1 md:pd-3">
                      <Dropdown
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.value)}
                        options={Fav}
                        optionLabel="name"
                        editable
                        placeholder="Select a Folder"
                        className="w-full md:w-14rem mr-3"
                      />
                      <div>
                        <Button
                          size="lg"
                          icon="pi pi-plus"
                          rounded
                          outlined
                          severity="info"
                          aria-label="User"
                          onClick={() => {
                            const fin = Fav.findIndex(
                              (obj) => obj.name == selectedCity.name
                            );

                            const arr = [...Fav];
                            arr[fin].inner.push({ name: "hello" });
                            console.log(arr);
                            setFav(arr);
                            localStorage.setItem("fav", JSON.stringify(arr));
                          }}
                        />
                      </div>
                    </div>
                  </Tooltip>

                  <Dialog visible={visible} onHide={() => setVisible(false)}>
                    <div className="m-4 p-5">
                      <label
                        htmlFor="password"
                        className="block text-900 font-medium mb-2"
                      >
                        Name
                      </label>
                      <InputText
                        id="text"
                        placeholder="Enter Name of your Folder"
                        className="w-20rem mb-3"
                        onChange={(e) => {
                          setvalue(e.target.value);
                          console.log(value);
                        }}
                      />
                      <div className="justify-content-center align-items-center flex">
                        <Button
                          label="Add Folder"
                          text
                          rounded
                          onClick={() => {
                            add_element({
                              name: value,
                              inner: [{ name: "yahoo" }],
                            });
                            setVisible(false);
                          }}
                        />
                      </div>
                    </div>
                  </Dialog>
                </div>
                <Favorates data={Fav} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
