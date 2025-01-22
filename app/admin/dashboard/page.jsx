// import Chart from "../../../components/Shared/Chart";
import React from "react";
import DashboardCards from "../../../components/Shared/DashboardCards"

const page = () => {

  return (
    <>
      <div className="flex gap-5 mt-5">
        <div className="flex-[3] flex flex-col gap-5">
          <div className="">
            <DashboardCards  />
          </div>
          {/* <Chart /> */}
        </div>
       
      </div>
    </>
  );
};

export default page;
