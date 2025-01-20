// "use client"
import React from "react";
import EditCategory from "../../../../../components/cards/EditCategory";
import Cookies from "js-cookie";

const page = async ({ params }) => {
  const token = Cookies.get("token");
  let data = await fetch(
    `https://magshopify.goaideme.com/card/edit-collection-admin/${params?.slug[1]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const posts = await data.json();

  return <EditCategory data={posts} querydata={params?.slug[1]} />;
};

export default page;
