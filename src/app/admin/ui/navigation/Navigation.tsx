import MuiButton from "@/components/button/Button";
import MuiPaper from "@/components/paper/Paper";
import MuiTypography from "@/components/typography/Typograph";
import React from "react";

const Navigation = () => {
  return (
    <MuiPaper component={"nav"} className="flex-grow max-w-[240px] p-4" elevation={3} color="primary">
      <div className="flex flex-col gap-2">
        <MuiButton variant={"contained"}>
          <MuiTypography variant="button" fontSize={18}>
            Nav 1
          </MuiTypography>
        </MuiButton>
        <MuiButton variant={"contained"}>
          <MuiTypography variant="button" fontSize={18}>
            Nav 1
          </MuiTypography>
        </MuiButton>
        <MuiButton variant={"contained"}>
          <MuiTypography variant="button" fontSize={18}>
            Nav 1
          </MuiTypography>
        </MuiButton>
        <MuiButton variant={"contained"}>
          <MuiTypography variant="button" fontSize={18}>
            Nav 1
          </MuiTypography>
        </MuiButton>
      </div>
    </MuiPaper>
  );
};

export default Navigation;
