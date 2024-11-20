"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import "./login.css";
import React from "react";
import {toast, Toaster} from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(false)
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

 
  const validatePassword = (password) => {
    return password.length >= 6; 
  };
  async function handleSubmit(event) {
    event.preventDefault();
  
    // Reset error messages
    setEmailError("");
    setPasswordError("");
  
    const formData = new FormData(event.currentTarget);
  
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
  
    let valid = true;
  

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
  
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (!valid) {
      return;
    }
  
    try {
      setDisabled(true)
      const response = await fetch("https://magshopify.goaideme.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status == 200) {
        toast.success('Login Successful')
        setDisabled(false)
        router.push("/admin/dashboard");
      }else {

      } 
    } catch (error) {
        setDisabled(false)
      toast.error('Something went wrong. Please try again.');
    }
  }
  

  return (
    <>
      <section className="home show">
        <div className="form_container">
          <div className="form login_form">
            <form action="#" onSubmit={handleSubmit}>
              <h2>Login as Admin</h2>
              <div className="input_box">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                {emailError && (
                  <div className="text-red-600 mt-2">{emailError}</div> 
                )}
              </div>
              <div className="input_box">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
                {passwordError && (
                  <div className="text-red-600 mt-2">{passwordError}</div> 
                )}
              </div>
              <button className="button mt-5" style={{opacity: disabled ? "0.4" : "1", cursor: disabled ? 'default' : 'pointer'}} type="submit">
                Login Now
              </button>
            </form>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default page;
