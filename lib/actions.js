"use server";

const MAX_LIMIT = 8;




export async function fetchData(url) {
  const response = await fetch(
    `${url}`
  , {cache: 'no-cache'});
  const data = await response.json();

   return data;

}

