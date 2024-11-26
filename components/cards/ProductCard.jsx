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
        <button className="bg-red-600 text-white py-2 px-3 rounded-sm" onClick={()=>handleDelete(item?.uuid)}>Delete</button>
          <p className="text-sm text-gray-500">{item?.title}</p>

          <Image alt="Stars" src="/svg/stars.svg" width={100} height={100} />
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
