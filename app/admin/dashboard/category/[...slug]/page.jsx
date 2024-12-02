// "use client"
import React from "react";
import EditCategory from "../../../../../components/cards/EditCategory"
const page = async ({params}) => {

 
        let data = await fetch(`https://magshopify.goaideme.com/card/edit-collection-admin/${params?.slug[1]}`, {
          method: 'GET', 
          // headers: {
          //   'authorization': `Bearer ${gettoken.value}` // Send the token in the Authorization header
          // }
        });
        const posts = await data.json();
      
  return (
  <EditCategory data={posts} querydata={params?.slug[1]}/>
  );
};

export default page;
