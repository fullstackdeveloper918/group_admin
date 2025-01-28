"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const page = () => {
    const [data,setData] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/discount/get-discount");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
   


  return (
    <section className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28'>
        <div className="flex items-end justify-between">
        <div className="flex flex-wrap space-y-4 w-full justify-between	">
          <h2 className=" text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
          Discount List
          </h2>
          <Link href="/admin/dashboard/discount/addDiscount" className="margin_zero">
            <Button className="leading-normal text-white sm:text-lg sm:leading-7">
            Add Discount
            </Button>
          </Link>
        </div>
      </div>
       
          <div className='w-full border border-gray-200 rounded-xl overflow-x-auto'>
            <table className='w-full divide-y divide-gray-200 w-100 over'>
               <thead className="bg-gray-50 text-slate-800">
               <tr >
                <th className='table_heading px-3' >Name</th>
                <th className='table_heading'>Discount_Type</th>
                <th className='table_heading'>value</th>
                <th className='table_heading'>Currency_Type</th>
               <th className='table_heading'>Quantity</th>
                {/* <th  className='table_heading'>Start_Date</th>
                <th className='table_heading'>End_Date</th> */}
               </tr>
               </thead>
            
            {
                data.data && data.data.map((item,index)=>(
                    
              <tbody key={index} className="divide-y divide-gray-200 bg-white text-slate-800">
                  <tr className='divide-x divide-gray-200' >
                    <td className='px-4 py-2'>{item.name}</td>
                    <td className='px-4 py-2'>{item.type}</td>
                    <td className='px-4 py-2'> {item.value}</td>
                    <td className='px-4 py-2'>{item.currency}</td>
                    <td className='px-4 py-2'>{item.quantity}</td>
                    {/* <td className='px-4 py-2'>{item.start_date}</td>
                    <td className='px-4 py-2'>{item.end_date}</td> */}
                </tr>
              </tbody>

            
                ))
            }
            </table>
            </div>
    </section>
  )
}


export default page;