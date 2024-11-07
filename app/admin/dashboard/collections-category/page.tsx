import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
       <Link href={`/admin/dashboard/collections-category/add`}>
          <button className="text-3xl text-black border-2">Add Category</button>
          </Link>
    </div>
  )
}

export default page