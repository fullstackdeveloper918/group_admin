"use client";
import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between rounded-lg p-5 bg-[#182237]">
      <div className="font-bold capitalize text-[#b7bac1]">
        {pathname.split("/").pop()}
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg">
          <MdSearch />
          <input
            type="text"
            placeholder="Search..."
            className="border-none bg-transparent text-white"
          />
        </div>
        <div className="flex gap-5 text-white">
          <MdOutlineChat size={20}  />
          <MdNotifications size={20}  />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
