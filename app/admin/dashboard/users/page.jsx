"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";

const page = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/users-list?page=1&limit=10");
        setData(response.data);
        setCount(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="flex flex-col space-y-4 my-4 ">
        <h2 className="max-w-sm text-3xl md:text-5xl text-start text-emerald-600 font-bold leading-[1.1]">
          User List
        </h2>
        <p>Users: {count}</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.result &&
          data.result.map((item, index) => (
            <div
              key={index}
              className="shadow-lg border hover:shadow-2xl duration-300 transition-all rounded-2xl space-y-4"
            >
              <div className="p-5 rounded-2xl bg-gray-100 relative">
                {/* <div className="aspect-square m-3 rounded-2xl bg-gray-100 relative"> */}
                <img
                  src={`${
                    item.profile_pic !== null
                      ? item.profile_pic
                      : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAvwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwEHAv/EADgQAQABAwEFAwoFAwUAAAAAAAABAgMEEQUGEiExQVFxEyNSYXKBkaHB0TI1c7HhFIPxM0JDU2L/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AigAAAAAAAAAAAA72MTJyP9GxcrjvinkDgLKjYe0KutiKfarj7oWTj3MW9VZvREV09dJ1ByAAAAAAAAAAAAAAAABodkbCiaab+bT1502p+v2BUYWz8nNnzFueHtrq5Ux715i7t2adJybtVyfRo5QvKaYppimIiIjsiOT0EaxgYmPHmce3TPfprPxlJ7ABE2lGRGHdnCjz3Zp19ejEVRVFU8evFrz166voSu2nsqznxNXK3ejpXEdfEGNHXJx7uLem1fo4a4+fg5AAAAAAAAAAAAAAAu92sGL96rJuxrRanSmO+r+GoV279EUbKs6f7tap+KxAAAAAABB2rs+jPx5p5RdpjW3V3T3eDGV01UV1UVRpVTOkx3S+gsfvFRFG1bnDGnFEVT46ArAAAAAAAAAAAAAAbXYcabKxvZ+qchbFjTZWN7CaAAAAAAAye8/5n/bp+rWMnvP+Zx+lT9QVAAAAAAAAAAAAAO2JjXMvIpsWtOOrprPIGx2P+V4v6cJiPgWasfDs2a9Jqop0mY6JAAAAAAADJ7z/AJnH6VP1aqvoze82LenI/quHzMU008WvaCiAAAAAAAAAAAATtiVcO1cbnprVp8kF2xLkWcuzdnpRcpqnwiQb0eRMTETHOJ6PQAAAAAAFTvNVpszTvuUwtlFvZciMexa151VzVp6oj+QZkAAAAAAAAAAAAAGt3dy6sjB4Lk61WquH3di2ZjdW7FOVetTP46ImPGP8tOAAAAAAAxG1syrNza65/BTPDRHqhrdp5H9NgX7uukxTMU+M8oYYAAAAAAAAAAAAAAHbEyKsXJt37f4qJ107/U3GNkW8mzTetVa0VR8PUwLR7qcXksmdZ4eKnSOzUGgAAAAB5PWPEGb3nzYrrpxLdWsUzxV6d/ZChdcqZnKvTM6z5Sr93IAAAAAAAAAAAAAABqN1qdMC5V6V36Qpdj4MZ+XFuuZi3THFXp10a/FxbWJZ8lYpmmjWZ0mdQdgAAADTWYAGAyOeRd9ur93Nd7wbMtYtNORY1imurSqmZ15zz1UgAAAAAAAAAAAAAk4mBk5lWli1VVHpTyiPeu8PduinSrMu8U+hRyj4g93WxZos3Mmr/knhp8I6/P8AZfPxZtUWLVNq1Tw0UxpEP2AAAAAACFtjFnL2fdt0/jpjjp8YYl9C7VRmbv416ZqsVVWa5599PwBlBYZmxszF1nyflKPSt8/l1V4AAAAAAAtMDYmVlaV1x5G3PbVHOfCGhwdlYuFpNFvjuf8AZXzn3dwM3hbGzMrSeDyVv0q+Xwhe4ewsTG0quU+Xr76+nuhagPIiIiIiIiI6RD0AAAAAAAAAAAETM2biZcedsxxenTyq+KWAzGZu7et61YlcXafRq5VfZTXbVyzXNF2iqiuOyqNG/lzv2LWRb4L9umunumAYEaLN3cjnVh3NP/Ff3UWRjXsavgv26qKvXHXwByand7Ax4xLeVNHFdq151c+HwAFzE66vQAAAAAAAAAAAAAAAAAAAcr9q3ejgu26a6e6qNQB//9k="
                  }`}
                  // sizes="120"
                  alt="profile_pic"
                  className="aspect-square object-cover rounded-full mx-auto w-28"
                />

                {/* </div>  */}
                <div className="mt-2 text-center">
                  <h1 className="text-center text-lg text-black">
                    {item.full_name} Cards
                  </h1>
                  <span className="text-center ">{item.email}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default page;
