"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from './DashboardCard'
import Cookies from "js-cookie";
const DashboardCards = () => {
  const [countUsers, setCountUsers] = useState(0);
  const [countCards, setCountCards] = useState(0);
  const [countSuccess, setCountSuccess] = useState(0);

  // for users
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token"); 
      try {
        const response = await fetch(
          "https://magshopify.goaideme.com/user/users-list?page=1&limit=10",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        const result = await response.json();
        setCountUsers(result.total);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);


  //for cards
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token"); 
      try {
        const response = await fetch(
          "https://magshopify.goaideme.com/card/card-listing",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        const result = await response.json();
        const cards = result?.listing
        setCountCards(cards.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
 

  //for success payment
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token"); 
      try {
        const response = await fetch(
          "https://magshopify.goaideme.com/razorpay/payment-list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
        );
        const result = await response.json();
        // console.log("object", result.data)

        const success = result?.data?.filter((item)=> item.payment_status === 'successed')
        if(success){
          setCountSuccess(success.length);
        }
        
      } catch (error) {
        console.error("Error fetching data", error);
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
