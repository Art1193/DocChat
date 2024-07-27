import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { Zoom } from "react-reveal";
import { Dialog } from "primereact/dialog";

import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";

export default function Upload() {
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("token")));
  }, []);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);

  const [name, setname] = useState("");
  const [path, setpath] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const upload = () => {
    setLoading(true);
    setVisible(false);

    const formData = new FormData();
    console.log("upload button is clicked");
    formData.append("file", fileUploadRef.current.getFiles()[0]);
    formData.append("upload_preset", "ska0dni8");

    fetch("https://api.cloudinary.com/v1_1/dsfems7vy/auto/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (result) => {
        console.log(result.format, result.url, totalSize);
        let res = await fetch(
          "https://docchat-backend.onrender.com/api/file/newFile",
          {
            method: "POST",
            body: JSON.stringify({
              name: name,
              fileType: result.format,
              path: path + name + "." + result.format,
              url: result.url,
              size: totalSize,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
            },
          }
        );
        const data = await res.json();
        if (res.status == 200) {
          setLoading(false);
          console.log("Uploaded");
          console.log(data);
          alert("uploaded Sucussfully");
        } else {
          console.log(data);
          setLoading(false);
        }
      });
  };

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}

        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <Zoom duration={"1200"}>
          <img src="/../images/draganddrop.jpg" height={160} />
        </Zoom>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-2"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Toast ref={toast}></Toast>

        <Dialog
          visible={visible}
          style={{ width: "60vw" }}
          onHide={() => setVisible(false)}
          breakpoints={{ "960px": "85vw", "641px": "90vw" }}
        >
          <div className="">
            <div
              className="flex flex-column align-items-center"
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   justifyContent: "center",
              // }}
            >
              <div className="p-inputgroup m-2 w-30rem  flex">
                <span className="p-inputgroup-addon ">/</span>
                <InputText
                  placeholder="Path"
                  onChange={(e) => setpath(e.target.value)}
                />
              </div>

              <div className="p-inputgroup m-2 w-30rem  flex">
                <span className="p-inputgroup-addon">Name</span>
                <InputText
                  placeholder="Enter name of the file"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
            </div>
            <div className="justify-content-center flex">
              <Button
                label="Upload Files"
                icon="pi pi-bolt"
                loading={loading}
                className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap m-4 "
                onClick={upload}
              />
            </div>
          </div>
        </Dialog>
        {!loading ? (
          <div className="">
            <FileUpload
              style={{ width: "60vw" }}
              id="file_container"
              ref={fileUploadRef}
              name="demo[]"
              url="/api/upload"
              multiple
              accept="image/*"
              maxFileSize={1000000}
              onUpload={onTemplateUpload}
              onSelect={onTemplateSelect}
              onError={onTemplateClear}
              onClear={onTemplateClear}
              headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              emptyTemplate={emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Button
                label="Upload Files"
                icon="pi pi-bolt"
                loading={loading}
                className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap "
                onClick={() => {
                  setVisible(true);
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="gif_img"
            style={{
              height: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              id="home_img"
              src="/../images/loading_animation.gif"
              height={300}
            />
            <h3 className="text-center">Uploading .....</h3>
          </div>
        )}
      </div>
    </div>
  );
}
