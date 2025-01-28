"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from 'react-icons/io5';


const page = () => {

    const router = useRouter();
    const [values, setValues] = useState({
        question : "",
        answer : ""
    })
    const [errors, setErrors] = useState({
        question: "",
        answer: "",
        
      });

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setValues((prev)=> ({
            ...prev,
            [name] : value
        }));
    }

    const validateForm = ()=>{
        const newErrors = {
            question : values.question ? "" : "question is required",
            answer : values.answer ? "" : "answer is required"
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
          return;
        }
    
        const formData = new FormData();
        formData.append("question", values.question);
        formData.append("answer", values.answer);
    
    
        // for (const value of formData.values()) {
            // console.log(value,"oksdhfkdhfg");
          // }
        try {
          const response = await axiosInstance.post("/card/faq", formData);
    
          if (response) {
            toast.success("Faq Added successfully");
            router.push("/admin/dashboard/faq");
          }
        } catch (error) {
          console.error("Network error", error);
        }
      };

      const handleBack = ()=>{
        router.back();
      }

  return (
    <>
        <div className="">
        <button type="button" onClick={handleBack} className="flex bg-[#182237] text-white p-2 pl-1 rounded-lg my-3 mb-5" >
        <IoChevronBackOutline 
         size={22} />
         Back
        </button>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg  mx-auto bg-[#f5f5f7] relative">
        <div className="">
            <label htmlFor="question" className="block text-sm font-semibold mb-2">
                Question
            </label>
            <input 
            type="text"
            id='question'
            name='question'
            className="w-full p-2 border rounded-sm"
            value={values.question || ""}
            onChange={handleChange}
             />
        </div>
        <div className="">
            <label htmlFor="question" className="block text-sm font-semibold mb-2">
                Answer
            </label>
            <input 
            type="text"
            id='answer'
            name='answer'
            className="w-full p-2 border rounded-sm"
            value={values.answer || ""}
            onChange={handleChange}
             />
        </div>

        <div className="flex gap-4">
         
          <Button type="submit" className="py-2 bg-primary text-white px-5 mt-3">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default page
