import React from "react";
import CategoryPagination from "@/components/Shared/CategoryPagination"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = async () => {
  const response = await axiosInstance.get("/card/collection-listing");
  const categories = response.data?.data;

  return (
    <>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-8 px-4 sm:px-6 lg:px-8 py-8 md:pt-10 lg:pt-18 sm:pb-28"
      >
        <div className="flex items-end justify-between">
          <div className="flex flex-wrap space-y-4 w-full justify-between	">
            <h2 className=" text-3xl md:text-4xl text-start text-emerald-600 font-bold leading-[1.1]">
              Featured Categories
            </h2>
            <Link href="/admin/dashboard/category/add" className="margin_zero">
              <Button className="leading-normal text-white sm:text-lg sm:leading-7">
                Add Category
              </Button>
            </Link>
          </div>
        </div>
        <div className="">
          <CategoryPagination categories={categories} />
        </div>
      </section>
    </>
  );
};

export default page;
