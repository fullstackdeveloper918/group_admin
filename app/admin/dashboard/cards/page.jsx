
import LoadMore from '../../../../components/Shared/LoadMore'
import { fetchCard } from "@/lib/actions";
import Link from 'next/link';
import React from "react";

const cards = async () => {
  const data = await fetchCard(1);
  return (
    <>
      <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
        <div className="flex " style={{justifyContent:'space-between'}}>
          <h2 className="text-3xl text-black font-bold">Explore Anime</h2>
          <Link href={`/admin/dashboard/cards/add`}>
          <button className="text-3xl text-black border-2">Add Cards</button>
          </Link>
        </div>
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data}
        </section>
        <LoadMore {...data} />
      </main>
    </>
  );
};

export default cards;
