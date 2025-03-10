"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Line } from "react-icons/ri";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/card/bundle-list-admin?page=${currentPage}&limit=10`
      );
      setData(response.data || []);
      setTotalPages(Math.ceil(response.data.totalItems / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    
    let uuidData ={
      bundle_id:id
    }
    
    try {
      const response = await axiosInstance.post(
        "/card/delete-bundle",
        uuidData
      );
      fetchData()
      
      if (response) {
        toast.success("Card deleted successfully");
        
        setData((prev) => (Array.isArray(prev) ? prev.filter((item) => item.uuid !== id)  : []));

      }
    } catch (error) {
      console.error("Network error", error);
    }
  };


  const handlePageClick = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  return (
    <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28">
      <div className="flex items-end justify-between">
        <div className="flex flex-wrap space-y-4 w-full justify-between">
          <h2 className="text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
            Bundle List
          </h2>
          <Link
            href="/admin/dashboard/bundle/addBundle"
            className="margin_zero"
          >
            <Button className="leading-normal text-white sm:text-lg sm:leading-7">
              Add Bundle
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data?.data?.map((item, index) => (
          <div
            key={index}
            className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4"
          >
            <div className="p-3 text-center rounded-2xl bg-gray-100 relative">
              <h1 className="text-2xl my-3 font-semibold">
                {item.number_of_cards} Cards
              </h1>
              <span className="text-4xl font-semibold">${item.price} </span>
              <br />
              <span className="line-through text-3xl text-[#9f9d9d] ml-2">
                ${item.cost_price.toFixed(2)}
              </span>
              <span className="text-3xl text-grey-700 ml-2">
                ${item.sale_price.toFixed(2)}
              </span>

              <span> {item.currency_type}</span>
              <span className="bg-[#C1F2C7] p-2 text-lg font-medium my-4 block w-24 mx-auto rounded-lg">
                {item.discount}
              </span>
              <div>
                <ul className="text-left">
                  {item.card_bundle_description.map((data, index) => (
                    <li key={index}>
                      <span className="flex gap-2 mb-2 text-lg align-center">
                        <FaCheck className="mt-2 text-green-600 ml-3" />
                        {data}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleDelete(item?.uuid)}
                className="bg-[#f8dfdf] text-[#f20c0c] py-2 px-3 rounded-sm flex w-full my-3 text-center justify-center mt-6 max-w-[90%] mx-auto hover:bg-[#f20c0c] hover:text-white"
              >
                {" "}
                <RiDeleteBin6Line className="mr-1 mt-0.5" size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center space-x-2 mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link px-4 py-1 border rounded"}
        previousLinkClassName={"prev-link px-4 py-1 border rounded"}
        nextLinkClassName={"next-link px-4 py-1 border rounded"}
        activeClassName={"active bg-blue-500 text-white rounded"}
      />
    </section>
  );
};

export default page;
