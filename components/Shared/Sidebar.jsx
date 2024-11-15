import Image from "next/image";
import MenuLink from "../Shared/MenuLink";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import Link from "next/link";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Category",
        path: "/admin/dashboard/category",
        icon: <MdShoppingBag />,
      },
      {
        title: "Cards",
        path: "/admin/dashboard/cards",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/admin/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/admin/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/admin/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/admin/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/admin/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/admin/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {
  //   const { user } = await auth();
  return (
    <div className="sticky top-10">
      <div className="flex items-center mb-5 gap-5">
        <Link href="/admin/dashboard">
          <Image
            className="object-cover rounded-full cursor-pointer"
            src="/images/noavatar.png"
            alt="User Image"
            width={50}
            height={50}
          />
        </Link>
        <div className="flex flex-col">
          <span className="font-medium text-[#b7bac1]">User</span>
          <span className="text-xs text-[#b7bac1]">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="text-xs font-bold text-[#b7bac1] my-3">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
      // action={async () => {
      //   "use server";
      //   await signOut();
      // }}
      >
        <button className="p-5 my-[5px] flex items-center gap-3 cursor-pointer rounded-xl bg-none border-none text-white w-full hover:bg-[#2e374a]">
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
