"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/offer-receiver-user");
        console.log("respoOffer",response)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
 
  console.log("offerData", data.data)

  return (
    <section>
      <div className="flex flex-col space-y-4 my-4 ">
        <h2 className="max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]">
          Offer List
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.data &&
          data.data?.map((item, index) => (
            <div
              key={index}
              className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4"
            >
              <div className="p-5 rounded-2xl bg-gray-100 relative">
                {/* <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative"> */}
                <img
                  src="/images/correct.png"
                  // sizes="120"
                  alt="profile_pic"
                  className="aspect-square object-cover rounded-full mx-auto w-28"
                />

                {/* </div>  */}
                <div className="mt-2 text-center">
                  <h1 className="text-center text-lg text-black">
                    {item.full_name} Cards
                  </h1>
                  <span className="text-center ">{item.email}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default page;
