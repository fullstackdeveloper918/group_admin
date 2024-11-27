import { Button } from '@/components/ui/button';
import { fetchData } from '@/lib/actions';
import Link from 'next/link';
import React from 'react'

const page = async() => {
    const data = await fetchData("https://magshopify.goaideme.com/card/bundle-list");
    
    
    // console.log(data);
    

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
                  
                </div>
                
              </div>
                ))
            }
         </div>
    </section>
  )
}


export default page;