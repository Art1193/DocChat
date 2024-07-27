import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function Search() {
  const [Visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const items = Array.from({ length: 100000 }).map((_, i) => ({
    label: `Item #${i}`,
    value: i,
  }));

  const searchItems = (event) => {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo purposes we filter at client side
    let query = event.query;
    let _filteredItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }

    setFilteredItems(_filteredItems);
  };
  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AutoComplete
        value={selectedItem}
        suggestions={filteredItems}
        completeMethod={searchItems}
        virtualScrollerOptions={{ itemSize: 38 }}
        field="label"
        dropdown
        onChange={(e) => setSelectedItem(e.value)}
        onFocus={() => setVisible(true)}
      />
    </div>
  );

  return (
    <>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          style={{ borderRadius: "30px" }}
          onFocus={() => setVisible(true)}
          placeholder="Search"
        />
      </span>
      {/* <AutoComplete
        value={selectedItem}
        suggestions={filteredItems}
        completeMethod={searchItems}
        virtualScrollerOptions={{ itemSize: 38 }}
        field="label"
        dropdown
        onChange={(e) => setSelectedItem(e.value)}
        onFocus={() => setVisible(true)}
      /> */}
      <Dialog
        header={header}
        visible={Visible}
        style={{ width: "60vw" }}
        onHide={() => setVisible(false)}
        breakpoints={{ "960px": "85vw", "641px": "90vw" }}
      >
        <div
          className="homeroom_img"
          style={{
            height: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "50px",
          }}
        >
          <img
            className="gif_img"
            src="/../images/loading_animation.gif"
            height={300}
          />
          <h3 className="text-center">Loading .....</h3>
        </div>
      </Dialog>
    </>
  );
}
