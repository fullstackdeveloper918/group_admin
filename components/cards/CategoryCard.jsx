"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const CategoryCard = ({ item }) => {
  // console.log(item,"itemmmmmmmmm")
  // const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const handleMouseEnter = (id) => {
    setIsActive(isActive === id ? null : id);
  };
  const handleMouseLeave = (id) => {
    setIsActive(isActive === id ? null : id);
  };



  const handleDelete = async (id) => {
    const data = {
      collection_uuid: id,
    };

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axios.post(
        "https://magshopify.goaideme.com/card/delete-collection",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast.success("Card deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };
  //line-limit

  return (
    <Card className="relative h-full w-full overflow-hidden edit_card rounded-lg bg-transparent transition-colors group hover:bg-[#f0f9f6]">
      <CardHeader className="flex flex-row justify-between">
        <div className="card_image relative">
          <Image
            src={`https://magshopify.goaideme.com/${item?.collection_image[0]}`}
            alt="test"
            layout="fill"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <CardTitle className="capitalize text-emerald-600 group-hover:text-grey">
          {item?.collection_title}
        </CardTitle>
        <CardDescription
          className="e break-all relative"
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={()=> handleMouseLeave(item.id)}
        >
          {/* {isActive !== item.id ? <> {item?.collection_description.substring(0,100)}<span onClick={()=>toggleExpand(item?.id)}>...</span></> : item?.collection_description }    */}
          {/* {item?.collection_description} */}
          {isActive !== item.id ? (
            `${item?.collection_description.substring(0, 70)}...`
          ) : (
            <div className="relative">
            {item?.collection_description.substring(0, 60)}...
            <div className="absolute w-full flex flex-col items-center bottom-10 left-1/2 transform -translate-x-1/2 text-center">
              <div className="z-10 bg-white border border-gray-200 shadow-md p-4 rounded-md">
                {/* Popover content */}
                {item?.collection_description.substring(0, 100)}....
                <br />
              <span className="text-blue-400 cursor-pointer">Read more</span>
              </div>
              <span className="-mt-[12px] z-20 text-white">
                <IoMdArrowDropdown size={30} />
              </span>
            </div>
          </div>
          
            
          )}
          {/* {item?.collection_description.substring(0, 100)} */}
        </CardDescription>
      </CardContent>

      <div className="flex justify-start px-6 pb-5">
        <Link href={`/admin/dashboard/category/edit/${item?.uuid}`}>
          <Button className="mr-3 pl-2 bg-[#cfffcf] text-[green] hover:bg-[#059669] hover:text-white">
            {" "}
            <MdEdit className="mr-1" size={20} />
            Edit
          </Button>
        </Link>
        {/* nsnc */}
        <button
          onClick={() => handleDelete(item?.uuid)}
          className="bg-[#f8dfdf] text-[#f20c0c] py-2 px-3 rounded-sm flex hover:bg-[#f20c0c] hover:text-white"
        >
          {" "}
          <RiDeleteBin6Line className="mr-1 mt-0.5" size={18} />
          Delete
        </button>
      </div>
    </Card>
  );
};

export default CategoryCard;
