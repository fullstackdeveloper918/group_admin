"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
// import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = () => {
  // const router = useRouter();
  const [data, setData] = useState([]);
  const [card, setCard] = useState("Single Card");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/card/pricing-listing");
        // console.log("resprice", response)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
// }, [router]);
  const handleClickGroup = () => {
    setCard("Group Card");
  };
  const handleClickIndi = () => {
    setCard("Single Card");
  };
  return (
    <section className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28">
      <div className="flex items-end justify-between">
        <div className="flex flex-wrap space-y-4 w-full justify-between	">
          <h2 className=" text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
            Pricing List
          </h2>
          <Link
            href="/admin/dashboard/pricing/addPricing"
            className="margin_zero"
          >
            <Button className="leading-normal text-white sm:text-lg sm:leading-7">
              Add Pricing
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="px-6 py-9 h-full w-96 bg-white border shadow-lg rounded-lg relative">
          {data.data &&
            data.data.map(
              (item, index) =>
                item.card_type === card && (
                  <div
                    key={index}
                    className="rounded-2xl flex flex-col items-center gap-5 "
                  >
                    <h1 className="text-2xl">Single Card</h1>
                    <div className="max-w-80">
                      <Button
                        className="leading-normal bg-white text-black max-w-sm hover:bg-gray-100 sm:text-sm border"
                        // onClick={handleClickGroup}
                      >
                        <span className="mr-2">Premium</span>
                        <MdStars color="#061178" size={20} />
                      </Button>
                      <Button
                        className={`bg-white text-black max-w-sm hover:bg-gray-100 sm:text-sm border ${
                          card === "Group Card" ? "bg-gray-100" : "bg-white"
                        }`}
                        onClick={handleClickGroup}
                      >
                        Group
                      </Button>
                      <Button
                        className={`bg-white text-black max-w-sm hover:bg-gray-100 sm:text-sm border ${
                          card === "Single Card" ? "bg-gray-100" : "bg-white"
                        }`}
                        onClick={handleClickIndi}
                      >
                        Individual
                      </Button>
                    </div>

                    <p className="text-3xl text-blue-900 font-semibold">
                      {item.card_price}
                    </p>
                    <div className="flex gap-4 flex-col">
                      <p className=" text-gray-600">{item.card_desc}</p>
                      <hr className="border border-2 border-blue-200 w-60 " />
                    </div>
                    {/* <p>{item.benfit_desc}</p> */}
                    <div className="mb-12">
                      <ul className="flex flex-col gap-5">
                        {item.benfit_desc &&
                          item.benfit_desc.map((desc, index) => (
                            <li
                              key={index}
                              className="flex gap-2 text-gray-600"
                            >
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-18ypdxu"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="DoneIcon"
                              >
                                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                              </svg>
                              <span>{desc}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <Button className="leading-normal absolute bottom-1 my-3 bg-blue-800 text-white sm:text-md w-80 hover:bg-blue-700 sm:leading-7">
                      Create a card for $2.50
                    </Button>
                  </div>
                )
            )}
        </div>

        <div className="px-6 py-8 bg-white border shadow-lg rounded-lg w-96 relative">
          {data.data &&
            data.data.map(
              (item, index) =>
                item.card_type === "Card Bundle" && (
                  <div
                    key={index}
                    className="rounded-2xl flex flex-col items-center gap-5 "
                  >
                    <h1 className="text-2xl">{item.card_type}</h1>
                    <p className="text-3xl text-blue-900 font-semibold">
                      {/* {item.card_price} */}
                      From {item.card_price} USD
                    </p>
                    <div className="flex gap-4 flex-col">
                      <p className="text-gray-600">{item.card_desc}</p>
                      <hr className="border border-2 border-blue-200 w-60" />
                    </div>
                    {/* <p>{item.benfit_desc}</p> */}
                    <div className="mb-28">
                      <ul className="flex flex-col gap-5">
                        {item.benfit_desc &&
                          item.benfit_desc.map((desc, index) => (
                            <li
                              key={index}
                              className="flex gap-2 text-gray-600"
                            >
                              {/* <TiTick color="green" size={20} /> */}
                              <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mus-18ypdxu"
                                focusable="false"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                data-testid="DoneIcon"
                              >
                                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                              </svg>
                              <span>{desc}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <Button className="leading-normal absolute bottom-1 my-3 bg-white border text-black sm:text-md w-80 hover:bg-blue-50 sm:leading-7">
                      View Bundles
                    </Button>
                  </div>
                )
            )}
        </div>
      </div>
    </section>
  );
};

export default page;
