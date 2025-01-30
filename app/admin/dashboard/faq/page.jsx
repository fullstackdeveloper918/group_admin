"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
// import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = () => {
  // const router = useRouter();
    const [data,setData] = useState([]);
    const [activeIndex,setActiveIndex] = useState(null);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/card/faq-list");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
    // }, [router]);


    const handleFaq = (index)=>{
        setActiveIndex(activeIndex === index ? null : index);
    }

    
  return (

    <section className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28 '>
     
      <div className="flex items-end justify-between">
        <div className="flex flex-wrap space-y-4 w-full justify-between	">
          <h2 className=" text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
          FAQ List
          </h2>
          <Link href="/admin/dashboard/faq/addFaq" className="margin_zero">
            <Button className="leading-normal text-white sm:text-lg sm:leading-7">
            Add FAQ
            </Button>
          </Link>
        </div>
      </div>

    <div>
    
     {
       data.data && data.data.map((item,index)=>(
            <div key={index} className="shadow-lg border hover:shadow-2xl duration-200 transition-all rounded-lg px-4 mb-2 ">
                <div className="flex items-center justify-between pt-1">
                <span>{item.question}</span>
                <button type="button" className='w-10 h-10' onClick={()=>handleFaq(index)}>
                    {
                        activeIndex === index ? <RiSubtractFill size={20} /> : <IoMdAdd size={20} />
                    }
                </button>
                </div>
                <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  activeIndex === index ? "max-h-[500px] opacity-100 py-1" : "max-h-0 opacity-0 py-0"
                }`}
              >
                <span className="text-gray-500">{item.answer}</span>
              </div>
            </div>
        ))
     }
    </div>

    </section>
  )
}

export default page


