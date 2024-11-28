"use client"
import React from 'react'
import { useState,useEffect } from 'react'

const page = () => {

    const [data,setData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch("https://magshopify.goaideme.com/razorpay/payment-list");
                const result  = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data", error);
            }            
        }

        fetchData();
    },[])


  return (
    <section>
        <div className='flex flex-col space-y-4 my-4 '>
          <h2 className='max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Payment List
          </h2>
         
        </div>
         <div className='grid grid-cols-3 gap-4'>
            <table>
               <thead>
               <tr>
                <th>payment_id</th>
                <th>payment_Type</th>
                <th>User_Name</th>
                <th>Currency_Type</th>
               <th>Amount</th>
                <th>Payment_Status</th>
                <th>Email</th>
                <th>Contact_Us</th>
               </tr>
               </thead>
            
            {
                data.data && data.data.map((item,index)=>(
                    
              <tbody key={index}>
                  <tr  >
                    <td>{item.payment_id}</td>
                    <td>{item.payment_for}</td>
                    <td>
                        {
                            item.userDetail.map((user)=>(
                                <span>{user.full_name}</span>
                            ))
                        }
                    </td>
                    <td>{item.currency}</td>
                    <td>{item.amount}</td>
                    <td>{item.payment_status}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
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