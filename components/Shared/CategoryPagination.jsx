"use client";
import React, { Suspense, useState, useEffect } from "react";
import CategoryCardSkeleton from "@/components/skeletons/CategoryCardSkeleton";
import CategoryCard from "@/components/cards/CategoryCard";
import ReactPaginate from "react-paginate";

const CategoryPagination = ({ categories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    setTotalPages(Math.ceil(categories.length / itemsPerPage));
  }, [categories]);

  const displayedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (selectedItem) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500">No categories available.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {displayedCategories.map((item, index) => (
          <Suspense key={item.id || index} fallback={<CategoryCardSkeleton />}>
            <CategoryCard item={item} />
          </Suspense>
        ))}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center space-x-2 mt-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link px-4 py-2 border rounded"}
        previousLinkClassName={"prev-link px-4 py-2 border rounded"}
        nextLinkClassName={"next-link px-4 py-2 border rounded"}
        activeClassName={"active bg-blue-500 text-white"}
      />
    </>
  );
};

export default CategoryPagination;
