import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const DashboardCard = ({ name, count, href }) => {
  return (
      <div className="px-2 w-60 py-3 rounded-2xl bg-gray-100 relative flex flex-col items-center gap-4 shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl">
        <div className="mt-2 text-center">
          <h1 className="text-center text-lg text-black">{name}</h1>
          <span className="text-center ">{count}</span>
        </div>
        <Link href={href}>
          <Button className="leading-normal text-white sm:text-lg sm:leading-7">
            view all
          </Button>
        </Link>
      </div>
  );
};

export default DashboardCard;
