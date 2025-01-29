"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    discount: 0,
    expiration: "",
    user_id: 0,
    discount_type: "",
  });
  const [errors, setErrors] = useState({
    discount: "",
    expiration: "",
    user_id: "",
    discount_type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/user/users-list?page=1&limit=10"
        );
        // console.log("id",response.data.result)
        setData(response?.data.result);
        // setCountUsers(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      discount: values.discount ? "" : "discount is required.",
      expiration: values.expiration ? "" : "expiration is required.",
      user_id: values.user_id ? "" : "user_id is required.",
      discount_type: values.discount_type ? "" : "discount_type is required.",
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
    formData.append("discount", values.discount);

    const expirationDate = new Date(values.expiration);
    if (!isNaN(expirationDate.getTime())) {
      formData.append("expiration", expirationDate.toLocaleDateString("en-GB"));
    } else {
      console.error("Invalid date:", values.expiration);
    }
   
    formData.append("user_id", values.user_id);
    formData.append("discount_type", values.discount_type);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axiosInstance.post(
        "/discount/add-voucher",
        formData
      );

      if (response) {
        toast.success("Voucher Added successfully");
        router.push("/admin/dashboard/voucher");
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
            htmlFor="discount"
            className="block text-sm font-semibold mb-2"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={values.discount || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="expiration"
            className="block text-sm font-semibold mb-2"
          >
            Expiration
          </label>
          <div className="flex gap-1">
            <div className="">
              <input
                type="date"
                id="expiration"
                name="expiration"
                value={values.expiration || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-sm"
              />
              {errors.expiration && (
                <p className="text-red-500 text-sm">{errors.expiration}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="user_id" className="block text-sm font-semibold mb-2">
            User Id
          </label>
          <select
            id="user_id"
            name="user_id"
            value={values.user_id}
            onChange={handleChange}
            className={`w-full p-2 border rounded-sm ${
              errors.user_id ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.user_id}
          >
            <option value="">Select a user name</option>
            {data &&
              data.map((item, index) => (
                <option key={item.uuid || index} value={item.uuid}>
                  {item?.full_name}
                </option>
              ))}
          </select>
          {errors.user_id && (
            <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="discount_type"
            className="block text-sm font-semibold mb-2"
          >
            Discount Type
          </label>
          <select
            id="discount_type"
            name="discount_type"
            value={values.discount_type}
            onChange={handleChange}
            className={`w-full p-2 border rounded-sm ${
              errors.discount_type ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.discount_type}
          >
            <option value="">Select a discount type</option>
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
          {errors.discount_type && (
            <p className="text-red-500 text-sm mt-1">{errors.discount_type}</p>
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
