import { ShoppingCart } from "lucide-react";
import Image from "next/image";
// import Link from 'next/link'

// import IconButton from '@/components/ui/IconButton'

const ProductCard = ({ item }) => {
  console.log(item.images[0].card_images[0], "item");

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
