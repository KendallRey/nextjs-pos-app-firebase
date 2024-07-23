import React from "react";
import Dashboard from "../ui/dashboard/Dashboard";
import MuiPaper from "@/components/paper/Paper";
import CategoryAction from "./ui/CategoryAction";
import CategoryList from "./ui/CategoryList";
import CreateCategoryDialog from "./ui/CreateCategoryDialog";

const CategoryPage = () => {
  return (
    <>
      <Dashboard>
        <MuiPaper className="flex-grow min-h-[180px] p-4" elevation={2} color="primary">
          <CategoryAction />
          <div>
            <CategoryList />
          </div>
        </MuiPaper>
      </Dashboard>

      <CreateCategoryDialog />
    </>
  );
};

export default CategoryPage;
