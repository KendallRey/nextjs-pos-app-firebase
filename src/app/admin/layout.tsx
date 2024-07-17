import React from "react";
import Navigation from "./ui/navigation/Navigation";

const AdminLayout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="flex min-h-screen justify-between p-24 gap-8 bg-zinc-100">
      <Navigation />
      {children}
    </div>
  );
};

export default AdminLayout;
