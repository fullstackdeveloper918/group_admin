"use server";

import Cookies from "js-cookie";

const MAX_LIMIT = 8;


export async function fetchData(url) {
  const token = Cookies.get("token");
  const response = await fetch(
    `${url}`,
   {cache: 'no-cache'}, 
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  }
);
  const data = await response.json();

   return data;

}

