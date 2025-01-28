"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const page = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      setDisabled(true);
      const response = await fetch(
        "https://magshopify.goaideme.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.status === 200 && data.token) {
        Cookies.set("token", data.token);
        toast.success("Login Successful", {
          autoClose: 1000,
        });
        setTimeout(() => {
          router.replace("/admin/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <section className="relative h-screen w-full bg-cover bg-center bg-gray-50">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="fixed top-1/2 left-1/2 max-w-sm w-full transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-semibold text-gray-800">Login as Admin</h2>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full h-10 px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none text-gray-800"
              />
              {emailError && (
                <p className="text-red-600 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full h-10 px-3 border-b-2 border-gray-300 focus:border-purple-500 outline-none text-gray-800"
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <button
              className={`w-full py-2 text-white bg-purple-600 rounded-lg transition-opacity ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
              type="submit"
              disabled={disabled}
            >
              Login Now
            </button>
          </form>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default page;
