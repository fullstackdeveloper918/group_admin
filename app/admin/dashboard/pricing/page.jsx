"use client"
import React, { useEffect, useState } from 'react'

 const page = () => {

     const [data,setData] = useState([]);

    useEffect(()=>{

        const fetchData = async()=>{
            try {
                const response = await fetch("https://magshopify.goaideme.com/card/pricing-listing");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error Fetch Data",error);
            }

        }
        fetchData();
    },[])
    
    console.log(data);


  return (
    <section>
        <div className='flex flex-col space-y-4 my-4 '>
      <h2 className='max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
        Pricing List
      </h2>

    </div>
     <div className='grid grid-cols-3 gap-4'>
        {
          data.data && data.data.map((item,index)=>(
            <div key={index} className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4">
            
      
            <div className="m-3 rounded-2xl bg-gray-100 relative">
            
              <h1>{item.card_type}</h1>
              <p>{item.card_price}</p>
              <p>{item.card_desc}</p>
                <div>
                        <ul>
                            {
                                item.benfit_desc.map((desc,index)=>{
                                    <li key={index}>
                                        <span>{desc}</span>
                                    </li>
                                })
                            }
                        </ul>
                </div>
            </div>
                  
          </div>
            ))
        }
     </div>
     
    </section>
  )
}


export default page;