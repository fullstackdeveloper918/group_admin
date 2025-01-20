"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { Card } from "@/components/ui/card";
import { IoMdArrowBack } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const [cardType, setCardType] = useState([]);
  const [card, setCard] = useState("");

  const [values, setValues] = useState({
    card_price: 0,
    card_desc: "",
  });
  const [errors, setErrors] = useState({
    card_price: "",
    card_desc: "",
  });

  const [benfit_description, setBenfit_description] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEditing] = useState(null);
  const [edittext, setEditingText] = useState("");

  const InputHandler = (e) => {
    setInput(e.target.value);
  };

  const AddHandler = () => {
    // console.log("add clicked");
    setBenfit_description([...benfit_description, input]);
    setInput("");
  };

  const EditHandler = (e) => {
    setEditingText(e.target.value);
  };

  const handleDelete = (id) => {
    setBenfit_description(
      benfit_description.filter((item, index) => index !== id)
    );
  };

  const SubmitEdit = (id) => {
    setBenfit_description(
      [...benfit_description].map((descs, index) => {
        if (index === id) {
          descs = edittext;
        }
        return descs;
      })
    );
    setEditing(null);
    setEditingText("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://magshopify.goaideme.com/card/pricing-listing"
        );
        const result = await response.json();
        // console.log("result data", result.data);

        setCardType(result.data);
      } catch (error) {
        console.error("Error Fetch Data", error);
      }
    };
    fetchData();
  }, []);

  const handleCardType = (e) => {
    setCard(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      card_price: values.card_price ? "" : "card_price are required.",
      card_type: card ? "" : "card_type are required.",
      card_desc: values.card_desc ? "" : "card_desc is required.",
      benfit_description: benfit_description
        ? ""
        : "benfit_description is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    // console.log("handle clicked");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("card_type", card);
    formData.append("card_price", values.card_price);
    formData.append("card_desc", values.card_desc);

    formData.append("benfit_desc", JSON.stringify(benfit_description));

    // for (const value of formData.values()) {
    //   console.log(value, "oksdhfkdhfg");
    // }
    // return     for the stop code
    // return;
    try {
      const response = await axios.post(
        "https://magshopify.goaideme.com/card/add-pricing",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response);

      if (response) {
        toast.success("Pricing Card Added successfully");
        router.push("/admin/dashboard/pricing");
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
      <button type="button" onClick={handleBack} className="flex bg-[#182237] text-white p-2 pl-1 rounded-lg my-3 mb-5" >
        <IoChevronBackOutline
         size={22} />
         Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg  mx-auto bg-[#f5f5f7] relative">
        <div>
          <label htmlFor="card" className="block text-sm font-semibold mb-2">
            Select Card
          </label>
          <select
            id="card_type"
            name="card_type"
            value={card}
            onChange={handleCardType}
            className="w-full p-2 border rounded-sm"
          >
            <option value="">Select a collection</option>
            {cardType.map((item) => (
              <option value={item.card_type}>{item.card_type}</option>
            ))}
          </select>
          {errors.selectedCollection && (
            <p className="text-red-500 text-sm">{errors.selectedCollection}</p>
          )}
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-semibold mb-2">
            Card Price
          </label>
          <input
            type="number"
            id="card_price"
            name="card_price"
            value={values.card_price || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.card_price && (
            <p className="text-red-500 text-sm">{errors.card_price}</p>
          )}
        </div>
        <div>
          <label htmlFor="card_desc" className="block text-sm font-semibold mb-2">
            Card Description
          </label>
          <input
            type="text"
            id="card_desc"
            name="card_desc"
            value={values.card_desc || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.card_desc && (
            <p className="text-red-500 text-sm">{errors.card_desc}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="benfit_description"
            className="block text-sm font-semibold mb-2"
          >
            Benfit Description
          </label>

          <div className="">
            <input
              value={input}
              className="border shadow-md w-80 mx-4 my-3 px-3"
              onChange={InputHandler}
            />
            <button type="button" onClick={AddHandler}>
              Add
            </button>
            {benfit_description.map((descs, index) => (
              <div key={index}>
                {edit === index ? (
                  <>
                    <input
                      type="text"
                      value={edittext}
                      className="mx-4 px-3 w-80 "
                      onChange={EditHandler}
                    />
                    <button onClick={() => SubmitEdit(index)}>Edit</button>
                  </>
                ) : (
                  <div className="flex w-96 justify-between gap-4">
                    <p
                      onDoubleClick={() => {
                        setEditing(index);
                        setEditingText(descs);
                      }}
                      className="ml-2 flex w-80 px-3 "
                    >
                      {descs}
                    </p>
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => handleDelete(index)}
                    >
                      <MdDelete size={24} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="py-2 bg-primary text-white px-5 mt-3">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
