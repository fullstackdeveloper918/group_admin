"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {

    const [data,setData] = useState([]);
    const [activeIndex,setActiveIndex] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response  = await fetch("https://magshopify.goaideme.com/card/faq-list");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error Fetch data ",error);
            }
        }
        fetchData();
    },[])


    const handleFaq = (index)=>{
        setActiveIndex(activeIndex === index ? null : index);
    }

    
  return (
    <section>
        <div className='flex flex-col space-y-4 my-4 '>
          <h2 className='max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            FAQ List
          </h2>
          <Link href="/admin/dashboard/faq/addFaq">
          <Button className='leading-normal max-w-sm sm:text-lg sm:leading-7'>
            Add FAQ
          </Button>
          </Link>
        </div>
    <div>
     {
       data.data && data.data.map((item,index)=>(
            <div key={index} className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4">
                <span>{item.question}</span>
                <button type="button" className='w-12 h-12' onClick={()=>handleFaq(index)}>
                    {
                        activeIndex === index ? "-" : "+"
                    }
                </button>
                {
                    activeIndex === index
                    &&
                    (<div>
                        <span>{item.answer}</span>
                    </div>)
                }
            </div>
        ))
     }
    </div>

    </section>
  )
}

export default page


