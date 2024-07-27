import React, { useState, useEffect, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProductService } from "./service/ProductService";

export default function Folder() {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedProductContent = selectedProduct && (
    <div className="p-5 surface-card shadow-2 border-round">
      <div className="relative">
        <img
          src={
            "https://primefaces.org/cdn/primereact/images/product/" +
            selectedProduct.image
          }
          alt={selectedProduct.name}
        ></img>
      </div>
      <div className="flex align-items-center justify-content-between mt-3 mb-2">
        <span className="text-900 font-medium text-xl">
          {selectedProduct.name}
        </span>
        <span className="text-900 text-xl ml-3">
          {"$" + selectedProduct.price}
        </span>
      </div>
      <span className="text-600">{selectedProduct.category}</span>
    </div>
  );

  const op = useRef(null);
  const toast = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current && selectedProduct) {
      op.current.hide();
      toast.current.show({
        severity: "info",
        summary: "Product Selected",
        detail: selectedProduct.name,
        life: 3000,
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    isMounted.current = true;
    ProductService.getProductsSmall().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const onProductSelect = (e) => {
    setSelectedProduct(e.value);
  };

  const imageBody = (rowData) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        className="w-4rem shadow-1"
      />
    );
  };

  const priceBody = (rowData) => {
    return formatCurrency(rowData.price);
  };

  return (
    <div className="card flex flex-column align-items-center gap-3">
      <Toast ref={toast} />
      <Button
        type="button"
        icon="pi pi-search"
        label="Search"
        onClick={(e) => op.current.toggle(e)}
      />
      {selectedProductContent}
      <OverlayPanel ref={op} showCloseIcon>
        <DataTable
          value={products}
          selectionMode="single"
          paginator
          rows={5}
          selection={selectedProduct}
          onSelectionChange={(e) => setSelectedProduct(e.value)}
        >
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "12rem" }}
          />
          <Column header="Image" body={imageBody} />
          <Column
            field="price"
            header="Price"
            sortable
            body={priceBody}
            style={{ minWidth: "8rem" }}
          />
        </DataTable>
      </OverlayPanel>
    </div>
  );
}
