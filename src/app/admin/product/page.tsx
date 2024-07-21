import React from "react";
import Dashboard from "../ui/dashboard/Dashboard";
import MuiPaper from "@/components/paper/Paper";
import ProductList from "./ui/ProductList";
import ProductAction from "./ui/ProductAction";
import CreateProductDialog from "./ui/CreateProductDialog";
import UpdateProductDialog from "./ui/UpdateProductDialog";

const ProductPage = () => {
  return (
    <>
      <Dashboard>
        <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
          <ProductAction />
          <div>
            <ProductList />
          </div>
        </MuiPaper>
      </Dashboard>
      <CreateProductDialog />
      <UpdateProductDialog />
    </>
  );
};

export default ProductPage;
