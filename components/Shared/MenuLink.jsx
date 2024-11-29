"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item?.path}
      className={`p-5 flex text-white items-center gap-2 my-[5px] borde rounded-lg hover:bg-[#2e374a] ${
        pathname === item?.path && "bg-[#2e374a]"
      }`}
    >
      {item?.icon}
      {item?.title}
    </Link>
  );
};

export default MenuLink;
