import React, { useRef } from "react";
import { SpeedDial } from "primereact/speeddial";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const toast = useRef(null);
  const navigate = useNavigate();
  const items = [
    {
      label: "Add",
      icon: "pi pi-sign-in",
      command: () => {
        navigate("/signup");
      },
    },
    {
      label: "Update",
      icon: "pi pi-refresh",
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Update",
          detail: "Data Updated",
        });
      },
    },
    {
      label: "home",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Fav",
      icon: "pi pi-star",
      command: () => {
        navigate("/profile/fav");
      },
    },
  ];

  return (
    <div id="menu">
      <Toast ref={toast} />
      <SpeedDial
        model={items}
        radius={120}
        type="semi-circle"
        direction="left"
        showIcon="pi pi-bars"
        hideIcon="pi pi-times"
        buttonClassName="p-button"
      />
    </div>
  );
}
