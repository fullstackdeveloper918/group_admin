"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    type: "",
    value: 0,
    quantity: 0,
    currency: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    value: "",
    quantity: "",
    currency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: values.name ? "" : "name of card is required.",
      type: values.type ? "" : "discount type is required.",
      currency: values.currency ? "" : "currency_type is required.",
      quantity: values.quantity ? "" : "Quantity is required.",
      value: values.value ? "" : "Value of discount is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("quantity", values.quantity);
    formData.append("currency", values.currency);
    formData.append("type", values.type);
    formData.append("value", values.value);

    try {
      const response = await axiosInstance.post("/discount/add", formData);

      if (response) {
        toast.success("Discount Added successfully");
        router.push("/admin/dashboard/discount");
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={handleBack}
          className="flex bg-[#182237] text-white p-2 pl-1 rounded-lg my-3 mb-5"
        >
          <IoChevronBackOutline size={22} />
          Back
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded-lg  mx-auto bg-[#f5f5f7] relative"
      >
        <div>
          <label
            htmlFor="name_of_cards"
            className="block text-sm font-semibold mb-2"
          >
            Name of Card
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label
            htmlFor="discount_type"
            className="block text-sm font-semibold mb-2"
          >
            Discount Type
          </label>
          <select
            id="type"
            name="type"
            value={values.type}
            onChange={handleChange}
            className={`w-full p-2 border rounded-sm ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.type}
          >
            <option value="" disabled>
              Select a discount type
            </option>
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-semibold mb-2">
            Value
          </label>
          <input
            type="number"
            id="value"
            name="value"
            value={values.value || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.value && (
            <p className="text-red-500 text-sm">{errors.value}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="currency_type"
            className="block text-sm font-semibold mb-2"
          >
            Currency Type
          </label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={values.currency || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.currency && (
            <p className="text-red-500 text-sm">{errors.currency}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="Quantity"
            className="block text-sm font-semibold mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={values.quantity || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="py-2 bg-primary text-white px-5 mt-3"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
