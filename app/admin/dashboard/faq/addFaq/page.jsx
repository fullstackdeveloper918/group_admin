"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";


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
    
    
        for (const value of formData.values()) {
            console.log(value,"oksdhfkdhfg");
          }
    // return;
        try {
          const response = await axios.post(
            "https://magshopify.goaideme.com/card/faq",
            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
    
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
            <button type="button" onClick={handleBack}><IoMdArrowBack size={26} /></button>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="">
            <label htmlFor="question" className="block text-sm font-semibold">
                Question
            </label>
            <input 
            type="text"
            id='question'
            name='question'
            className="w-full p-2 border"
            value={values.question || ""}
            onChange={handleChange}
             />
        </div>
        <div className="">
            <label htmlFor="question" className="block text-sm font-semibold">
                Answer
            </label>
            <input 
            type="text"
            id='answer'
            name='answer'
            className="w-full p-2 border"
            value={values.answer || ""}
            onChange={handleChange}
             />
        </div>

        <div className="flex gap-4">
         
          <Button type="submit" className="bg-blue-500 text-white">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default page
