"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from './DashboardCard'
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
// import { useRouter } from "next/navigation";

const DashboardCards = () => {
  const [countUsers, setCountUsers] = useState(0);
  const [countCards, setCountCards] = useState(0);
  const [countSuccess, setCountSuccess] = useState(0);

  // const router  = useRouter();
  // for users

   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("/user/users-list?page=1&limit=10");
          setCountUsers(response.data.total);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []); 


  //for cards

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/card/card-listing");
        const cards = response.data?.listing
        setCountCards(cards.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };

    fetchData();
  }, []);

 //for success payment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/razorpay/payment-list");
        if(Array.isArray(response.data)){
          const success = response.data?.filter((item)=> item.payment_status === 'successed')
          if(success){
            setCountSuccess(success.length);
          }
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };

    fetchData();
  }, []);


  return (
   <div className="flex justify-around items-center">
      <DashboardCard name='Users' count={countUsers} href='/admin/dashboard/users' />
      <DashboardCard name='Cards' count={countCards} href='/admin/dashboard/cards' />
      <DashboardCard name='Success Payment' count={countSuccess} href='/admin/dashboard/transactions' />
   </div>
  );
};

export default DashboardCards;
