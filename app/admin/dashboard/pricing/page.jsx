"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const page = () => {
  const [data, setData] = useState([]);
  const [card, setCard] = useState("Single Card");

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          "https://magshopify.goaideme.com/card/pricing-listing", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error Fetch Data", error);
      }
    };
    fetchData();
  }, []);

  // console.log(data);

  const handleClickGroup = () => {
    setCard("Group Card");
  };
  const handleClickIndi = () => {
    setCard("Single Card");
  };
  return (
    <section className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28'>
      
       <div className="flex items-end justify-between">
        <div className="flex flex-wrap space-y-4 w-full justify-between	">
          <h2 className=" text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
          Pricing List
          </h2>
          <Link href="/admin/dashboard/pricing/addPricing" className="margin_zero">
            <Button className="leading-normal text-white sm:text-lg sm:leading-7">
            Add Pricing
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {data.data &&
            data.data.map(
              (item, index) =>
                item.card_type === card && (
                  <div
                    key={index}
                    className="m-3 rounded-2xl bg-gray-100 relative"
                  >
                    <div>
                      <Button
                        className="leading-normal max-w-sm sm:text-lg sm:leading-7"
                        onClick={handleClickGroup}
                      >
                        Group
                      </Button>
                      <Button
                        className="leading-normal max-w-sm sm:text-lg sm:leading-7"
                        onClick={handleClickIndi}
                      >
                        Individual
                      </Button>
                    </div>
                    
                    <h1>{item.card_type}</h1>
                    <p>{item.card_price}</p>
                    <p>{item.card_desc}</p>
                    <hr />
                    {/* <p>{item.benfit_desc}</p> */}
                    <div>
                      <ul>
                        {item.benfit_desc &&
                          item.benfit_desc.map((desc, index) => (
                            <li key={index}>
                              <span>{desc}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  
                )

                
            )}
        </div>

        <div>
          {data.data &&
            data.data.map(
              (item, index) =>
                item.card_type === "Card Bundle" && (
                  <div
                    key={index}
                    className="m-3 rounded-2xl bg-gray-100 relative"
                  >
                    <h1>{item.card_type}</h1>
                    <p>{item.card_price}</p>
                    <p>{item.card_desc}</p>
                    <hr />
                    {/* <p>{item.benfit_desc}</p> */}
                    <div>
                      <ul>
                        {item.benfit_desc &&
                          item.benfit_desc.map((desc, index) => (
                            <li key={index}>
                              <span>{desc}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </section>
  );
};

export default page;


