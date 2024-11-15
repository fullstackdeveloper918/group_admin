import { Button } from '@/components/ui/button';
import { fetchData } from '@/lib/actions';
import Link from 'next/link';
import { Suspense } from 'react'
import ProductCard from '@/components/cards/ProductCard'
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton'



const page = async () => {

  const data = await fetchData(
    "https://magshopify.goaideme.com/card/card-listing"
  );

  const cards = data?.listing

  return (
    <section
      id='categories'
      aria-labelledby='categories-heading'
      className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-24 sm:pb-28'
    >
      <div className='flex items-end justify-between'>
        <div className='flex flex-col space-y-4'>
          <h2 className='max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Explore Cards
          </h2>
          <Link href="/admin/dashboard/cards/add">
          <Button className='leading-normal sm:text-lg sm:leading-7'>
            Add Cards
          </Button>
          </Link>
        </div>
        
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {cards && cards.map((item,index) => (
          <Suspense  fallback={<ProductCardSkeleton />}>
            <ProductCard item={item} />
          </Suspense>
        ))}
      </div>
    </section>
  )
}

export default page