"use client"
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import {toast} from 'react-hot-toast'
// import Link from 'next/link'

// import IconButton from '@/components/ui/IconButton'

const ProductCard = ({ item }) => {
  console.log(item.images[0].card_images[0], "item");



  const handleDelete = async (id) => {
    
    const data  = {
      card_uuid: id
    }
    try {
      
      const confirmDelete = window.confirm("Are you sure you want to delete this collection?");
      if (!confirmDelete) {
        return; 
      }
  
      
      const response = await fetch(`https://magshopify.goaideme.com/card/delete-card`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(data), 
      });

  
     
      if (response) {
        console.log('eneterd')
        const data = await response.json();
        toast.success("Collection deleted successfully!");
        window.location.reload();
        
      } else {
        // const errorData = await response.json();
        toast.error("Failed to delete collection. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the collection.");
    }
  };
  



  return (
    <div className="group/card shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4 h-full">
      {/* <Link
        href={`/${product.storeId}/${product.slug}?productId=${product.id}`}
      > */}

      <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative">
        <Image
          src={`https://magshopify.goaideme.com/${item.images[0].card_images[0]}`}
          fill
          sizes="200"
          alt=""
          className="aspect-square object-cover rounded-2xl"
        />
        
      </div>
      <div className="px-4 space-y-3 pb-6">
        <div className="space-y-1">
       <div className="text-end">
       <button className="bg-red-600 text-white py-2 px-3 rounded-sm flex" onClick={()=>handleDelete(item?.uuid)}><svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg> Delete</button>
       
       </div>   <p className="text-sm my-3 block text-gray-900 text-wrap">{item?.title}</p>

          <Image alt="Stars" src="/svg/stars.svg" width={100} height={30} />
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
            {item?.description}
          </div>
          {/* <div className='flex justify-center group/icon'>
              <IconButton
                aria-label='add-to-cart'
                className='bg-emerald-50 group-hover/icon:bg-emerald-500'
                icon={
                  <ShoppingCart
                    size={20}
                    className='text-emerald-600 group-hover/icon:text-emerald-50'
                  />
                }
              />
            </div> */}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
