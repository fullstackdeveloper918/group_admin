"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);
  const [card, setCard] = useState("Single Card");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://magshopify.goaideme.com/card/pricing-listing"
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
    <section>
      <div className="flex flex-col space-y-4 my-4 ">
        <h2 className="max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]">
          Pricing List
        </h2>
        <Link href="/admin/dashboard/pricing/addPricing">
          <Button className='leading-normal max-w-sm sm:text-lg sm:leading-7'>
            Add Pricing
          </Button>
          </Link>
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

// {
//   data.data && data.data.map((item,index)=>(
//     <div key={index} className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4">

// <div className="m-3 rounded-2xl bg-gray-100 relative">

//   <h1>{item.card_type}</h1>
//   <p>{item.card_price}</p>
//   <p>{item.card_desc}</p>
//   {/* <p>{item.benfit_desc}</p> */}
//     <div>
//             <ul>
//                 {
//                     item.benfit_desc && item.benfit_desc.map((desc,index)=>(
//                         <li key={index}>
//                             <span>{desc}</span>

//                         </li>
//                     ))
//                 }
//             </ul>
//     </div>
// </div>

//   </div>
//     ))
// }
