import Chart from "../../../components/Shared/Chart";
import Image from "next/image";
import React from "react";
import { rightbarData, transaction_data } from "../../../lib/data";
import { MdPlayCircleFilled } from "react-icons/md";

const dashboard = () => {
  return (
    <>
      <div className="flex gap-5 mt-5">
        <div className="flex-[3] flex flex-col gap-5">
          <div className="flex justify-between gap-5">
            {/* {cards.map((item) => (
              <Card item={item} key={item.id} />
            ))} */}
          </div>
          <div className="bg-[#182237] p-5 rounded-lg text-white">
            <h2 className="mb-5 font-extralight">Latest Transactions</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <td className="p-5">Name</td>
                  <td className="p-5">Status</td>
                  <td className="p-5">Date</td>
                  <td className="p-5">Amount</td>
                </tr>
              </thead>
              <tbody>
                {transaction_data.map((item) => (
                  <>
                    <tr>
                      <td className="p-5">
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/Images/noavatar.png"
                            alt=""
                            width={40}
                            height={40}
                            className="cover rounded-[50%]"
                          />
                          John Doe
                        </div>
                      </td>
                      <td className="p-5">
                        <span
                          className={`rounded-lg cursor-pointer p-[6px] text-sm ${
                            item?.Status === "Pending"
                              ? "bg-red-600"
                              : "bg-lime-600"
                          }`}
                        >
                          {item?.Status}
                        </span>
                      </td>
                      <td className="p-5">{item?.Date}</td>
                      <td className="p-5">{item?.Amount}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Chart />
        </div>
        <div className="flex-1">
          <div className="fixed">
            {rightbarData.map((item) => (
              <React.Fragment key={item?.id}>
                <div className="bg-gradient-to-t from-[#182237] to-[#253352] py-5 px-6 rounded-lg mb-5 relative">
                  <div className="absolute right-0 bottom-0 w-[50%] h-[50%]">
                    <Image
                      className="contain opacity-20"
                      src={item?.img}
                      alt=""
                      fill
                    />
                  </div>
                  <div className="flex flex-col gap-6 text-white">
                    <span className="font-bold">🔥 Available Now</span>
                    <h3 className="font-bold">
                      How to use the new version of the admin dashboard?
                    </h3>
                    <span className="font-medium text-xs text-[#b7bac1]">
                      Takes 4 minutes to learn
                    </span>
                    <p className="text-[#b7bac1] text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit eius libero perspiciatis recusandae
                      possimus.
                    </p>
                    <button className="p-3 flex items-center gap-3 w-max bg-[#5d57c9] text-white border-none rounded cursor-pointer">
                      <MdPlayCircleFilled />
                      Watch
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
