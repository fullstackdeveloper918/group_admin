import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CardsPagination from '@/components/Shared/CardsPagination'
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = async () => {

  const response = await axiosInstance.get("/card/card-listing");
  const cards = response.data?.listing;
  // console.log("card",cards)

  return (
    <section
      id='categories'
      aria-labelledby='categories-heading'
      className='space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28 '
    >
      <div className='flex items-end justify-between'>
        <div className='flex flex-wrap space-y-4 w-full justify-between	'>
          <h2 className=' text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]'>
          Explore Cards
          </h2>
          <Link href="/admin/dashboard/cards/add" className="margin_zero">
          <Button className='leading-normal text-white sm:text-lg sm:leading-7'>
          Add Cards
          </Button>
          </Link>
        </div>
        
      </div>
      <CardsPagination cards={cards} />
    </section>
  )
}

export default page