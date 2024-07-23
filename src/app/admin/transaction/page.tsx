import React from "react";
import Dashboard from "../ui/dashboard/Dashboard";
import { Box } from "@mui/material";
import MuiBox from "@/components/box/Box";
import MuiButton from "@/components/button/Button";
import MuiTypography from "@/components/typography/Typograph";
import MuiPaper from "@/components/paper/Paper";

const TransactionPage = () => {
  return (
    <Dashboard>
      <MuiBox className="flex gap-4 flex-wrap">
        <MuiButton className="flex-grow">
          <MuiTypography fontSize={24}>History</MuiTypography>
        </MuiButton>
        <MuiButton className="flex-grow" color="info">
          <MuiTypography fontSize={24}>Process</MuiTypography>
        </MuiButton>
      </MuiBox>
      <MuiPaper className="min-h-[380px]">Graph</MuiPaper>
      <MuiBox className="flex-grow flex gap-4 flex-wrap">
        <MuiPaper className="flex-grow">Summary</MuiPaper>
        <MuiPaper className="flex-grow">Summary</MuiPaper>
      </MuiBox>
    </Dashboard>
  );
};

export default TransactionPage;
