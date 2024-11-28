"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";


const page = () => {
  const [data, setData] = useState([]);
  
  useEffect(()=>{

    const fetchData = async()=>{
       try {
        const response = await fetch("https://magshopify.goaideme.com/card/bundle-list?page=1&limit=10");
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
                
          
                <div className="m-3 rounded-2xl bg-gray-100 relative">
                  <h1>{item.number_of_cards} Cards</h1>
                  <span>$ {item.price}</span>
                  <span>$ {item.cost_price}</span>
                  <span>$ {item.sale_price}</span>
                  <span> {item.discount}</span>
                  <span> {item.currency_type}</span>
                  <div>
                    <ul>
                      {
                        item.card_bundle_description.map((data,index)=>(
                            <li key={index}>
                                <span>{data}</span>
                            </li>
                        ))
                      }
                    </ul>
                  </div>
                  <button type="button" className='text-red-600' onClick={()=>handleDelete(item.uuid)} ><MdDelete size={24} /></button>
                 

                </div>
                      
              </div>
                ))
            }
         </div>
    </section>
  )
}


export default page;