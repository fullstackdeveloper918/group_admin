
import { fetchData } from "@/lib/actions";
import React, { Suspense } from "react";
import CategoryCard from '@/components/cards/CategoryCard'
import CategoryCardSkeleton from '@/components/skeletons/CategoryCardSkeleton'
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = async () => {
  const data = await fetchData(
    "https://magshopify.goaideme.com/card/collection-listing"
  );

  const categories = data?.data
  
  return (
    <>
     <section
      id='categories'
      aria-labelledby='categories-heading'
      className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-24 sm:pb-28'
    >
      <div className='flex items-end justify-between'>
        <div className='flex flex-col space-y-4'>
          <h2 className='max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]'>
            Featured Categories
          </h2>
          <Link href="/admin/dashboard/category/add">
          <Button className='leading-normal text-white sm:text-lg sm:leading-7'>
            Add Category
          </Button>
          </Link>
        </div>
        
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {categories.map((item,index) => (
          <Suspense  fallback={<CategoryCardSkeleton />}>
            <CategoryCard item={item} />
          </Suspense>
        ))}
      </div>
    </section>
    </>
  );
};

export default page;
