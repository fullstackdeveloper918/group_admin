"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import {useRouter} from "next/navigation"
const page = () => {
  const [data, setData] = useState([]);
  const router=useRouter()

  useEffect(()=>{

    const fetchData = async()=>{
       try {
        const response = await fetch("https://magshopify.goaideme.com/card/bundle-list-admin?page=1&limit=10");
        const result = await response.json();
        setData(result);
       } catch (error) {
         console.error("Error fetching data", error);
       }
    }

    fetchData();

  },[])
    
  // console.log(data);
   
  const handleDelete = async(id)=>{
    const uuidData = {
      bundle_id : id
    }
    console.log(uuidData);

    try {
      const response = await axios.post("https://magshopify.goaideme.com/card/delete-bundle",
        uuidData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        toast.success("Card Delete successfully");
        window.location.reload()
      }

      // router.back()
    } catch (error) {
      console.error("Network error", error);
    }
    
  }


  return (
    <section>
        <div className='flex flex-col space-y-4 my-4 '>
          <h2 className='max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Bundle List
          </h2>
          <Link href="/admin/dashboard/bundle/addBundle">
          <Button className='leading-normal max-w-sm sm:text-lg sm:leading-7'>
            Add Bundle
          </Button>
          </Link>
        </div>
         <div className='grid grid-cols-3 gap-4'>
            {
              data.data && data.data.map((item,index)=>(
                <div key={index} className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4">
                
          
                <div className="p-3 text-center rounded-2xl bg-gray-100 relative">
                  <h1  className='text-2xl my-3'>{item.number_of_cards} Cards</h1>
                  <span className='text-xl '>$ {item.price} </span>
                  <span className='line-through text-3xl text-[#9f9d9d] ml-2' > $ {item.cost_price}</span>
                  <span className="text-3xl text-grey-700 ml-2">$ {item.sale_price}</span>
                 
                  <span> {item.currency_type}</span>
                  <span className='bg-[#C1F2C7] p-2 text-lg font-medium my-4 block w-24 mx-auto rounded-lg'> {item.discount}</span>
                  <div>
                    <ul className='text-left'>
                      {
                        item.card_bundle_description.map((data,index)=>(
                            <li key={index}>
                                <span className='flex gap-2 mb-2 text-lg align-center'><FaCheck className='mt-2 text-green-600 ml-3'/> {data}</span>
                            </li>
                        ))
                      }
                    </ul>
                  </div>
                  <button type="button" className='bg-[#a50404] text-white py-2 px-3 rounded-sm flex w-full my-3  text-center justify-center mt-6 max-w-[90%] mx-auto' onClick={()=>handleDelete(item.uuid)} ><MdDelete size={24} className='mr-2' />Delete</button>
                 

                </div>
                      
              </div>
                ))
            }
         </div>
    </section>
  )
}


export default page;