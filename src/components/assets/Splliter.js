import React from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Button } from "primereact/button";

export default function Splliter() {
  return (
    <Splitter style={{ height: "90%" }}>
      <SplitterPanel
        // className="flex align-items-center justify-content-center"
        size={50}
        minSize={10}
      >
        <object
          width="100%"
          height="100%"
          data="http://www.africau.edu/images/default/sample.pdf"
          type="application/pdf"
        >
          {" "}
        </object>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Button label="Choose File" rounded />
        </div>
      </SplitterPanel>
      <SplitterPanel
        // className="flex align-items-center justify-content-center"
        size={50}
        minSize={10}
      >
        <object
          width="100%"
          height="100%"
          data="http://www.africau.edu/images/default/sample.pdf"
          type="application/pdf"
        >
          {" "}
        </object>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            padding: "20px",
          }}
        >
          <Button label="Choose File" rounded />
        </div>
      </SplitterPanel>
    </Splitter>
  );
}
