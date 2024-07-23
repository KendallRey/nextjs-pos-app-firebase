import React from "react";
import Dashboard from "../ui/dashboard/Dashboard";
import MuiPaper from "@/components/paper/Paper";

const CategoryPage = () => {
  return (
    <>
      <Dashboard>
        <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary"></MuiPaper>
      </Dashboard>
    </>
  );
};

export default CategoryPage;
