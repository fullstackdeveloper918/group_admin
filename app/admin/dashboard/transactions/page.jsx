"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import Cookies from "js-cookie";

const page = () => {

    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
          const token = Cookies.get("token");
            try {
                const response = await fetch("https://magshopify.goaideme.com/razorpay/payment-list", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                  },
                });
                const result  = await response.json();
                console.log("res",result)
                  if (result?.status === 401 || result?.message === "Token is expired") {
                      Cookies.remove("token"); 
                      if (typeof window !== "undefined") {
                        // Client-side redirect
                        window.location.href = "/";
                      } else {
                        // Server-side redirect
                        redirect("/");
                      } 
                    } 
                setData(result);
            } catch (error) {
                console.error("Error fetching data", error);
            }            
        }

        fetchData();
    },[])


  return (
    <section className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28'>
        <div className='flex flex-wrap space-y-4 w-full justify-between '>
          <h2 className='text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Payment List
          </h2>
         
        </div>
       
          <div className='w-full border border-gray-200 rounded-xl overflow-x-auto'>
            <table className='w-full divide-y divide-gray-200 w-100 over'>
               <thead className="bg-gray-50 text-slate-800">
               <tr >
                <th className='table_heading px-3 whitespace-pre' >Payment_id</th>
                <th className='table_heading whitespace-pre'>payment Type</th>
                <th className='table_heading whitespace-pre'>User_Name</th>
                <th className='table_heading whitespace-pre'>Currency_Type</th>
               <th className='table_heading whitespace-pre'>Amount</th>
                <th  className='table_heading whitespace-pre'>Payment Status</th>
                <th className='table_heading whitespace-pre'>Email</th>
                <th className='table_heading whitespace-pre'>Contact_Us</th>
               </tr>
               </thead>
            
            {
                data.data && data.data.map((item,index)=>(
                    
              <tbody key={index} className="divide-y divide-gray-200 bg-white text-slate-800">
                  <tr className='divide-x divide-gray-200' >
                    <td className='px-4 py-2'>{item.payment_id}</td>
                    <td className='px-4 py-2'>{item.payment_for}</td>
                    <td className='px-4 py-2 whitespace-pre'>
                        {
                            item.userDetail.map((user)=>(
                                <span key={user.id}>{user.full_name}</span>
                            ))
                        }
                    </td>
                    <td className='px-4 py-2'> {item.currency}</td>
                    <td className='px-4 py-2'>{item.amount}</td>
                    <td className='px-4 py-2'>{item.payment_status}</td>
                    <td className='px-4 py-2'>{item.email}</td>
                    <td className='px-4 py-2'>{item.contact}</td>
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