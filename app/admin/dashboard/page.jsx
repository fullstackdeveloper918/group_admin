import Chart from "../../../components/Shared/Chart";
import Image from "next/image";
import React from "react";
import { rightbarData } from "../../../lib/data";
import { MdPlayCircleFilled } from "react-icons/md";
import DashboardCards from "../../../components/Shared/DashboardCards"

const page = () => {

  return (
    <>
      <div className="flex gap-5 mt-5">
        <div className="flex-[3] flex flex-col gap-5">
          <div className="">
            <DashboardCards  />
          </div>
          <Chart />
        </div>
       
      </div>
    </>
  );
};

export default page;
