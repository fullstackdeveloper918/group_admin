"use client";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { LuSaveAll } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";


const page = () => {
  const [vouchers, setVouchers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axiosInstance.get("/discount/voucher-list");
        setVouchers(response.data.data || []);
        console.log("voucher code",response.data.data)
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        setError("Failed to fetch voucher data.");
      }
    };

    fetchVouchers();
  }, []);


  const getUserName = (uuid) => {
    // console.log("voucer",vouchers)
    const user = vouchers.find((u) => u.uuid === uuid);
    // console.log("users",user)
    return user.userdetail.length > 0 ? user.userdetail[0].full_name
    : "Unknown User";
  };

  const handleSave = (id) => {
    const user = vouchers.find((u) => u.id === id);
    // console.log("usr",user)
    if (user) {
      navigator.clipboard.writeText(user.code)
        .then(() => {
          toast.success("Voucher code copied !")
          // alert();
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };
  

  return (
    <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28">
      <div className="flex items-end justify-between">
        <div className="flex flex-wrap space-y-4 w-full justify-between">
          <h2 className="text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
            Voucher List
          </h2>
          <Link href="/admin/dashboard/voucher/addVoucher">
            <Button className="leading-normal text-white sm:text-lg sm:leading-7">
              Add Voucher
            </Button>
          </Link>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="w-full border border-gray-200 rounded-xl overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-slate-800">
            <tr>
              <th className="table_heading">User Name</th>
              <th className="table_heading px-3">Discount</th>
              <th className="table_heading">Discount Type</th>
              <th className="table_heading">Voucher Code</th>
              <th className="table_heading">Expiration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white text-slate-800">
            {vouchers.length > 0 ? (
              vouchers.map((voucher) => (
                <tr key={voucher.id} className="divide-x divide-gray-200">
                  <td className="px-4 py-2">{getUserName(voucher.uuid)}</td>
                  <td className="px-4 py-2">{voucher.discount}</td>
                  <td className="px-4 py-2">{voucher.discount_type}</td>
                  <td className="px-4 py-2 flex gap-8 items-center"> <span>{voucher.code}</span> <span onClick={()=> handleSave(voucher.id)} className="cursor-pointer"><MdContentCopy /></span> </td>
                  <td className="px-4 py-2">{voucher.expiration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No vouchers available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default page;
