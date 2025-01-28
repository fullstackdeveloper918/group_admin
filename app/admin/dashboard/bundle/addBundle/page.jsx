"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosRequestInterceptor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
// import { IoMdArrowBack } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const [price, setPrice] = useState(0);
  const [state, setState] = useState();
  const [values, setValues] = useState({
    number_of_cards: 0,
    discount: 0,
    currency_type: "",
  });
  const [errors, setErrors] = useState({
    number_of_cards: "",
    price: "",
    card_bundle_description: "",
    discount: "",
    currency_type: "",
  });

  const [card_bundle_description, setCard_bundle_description] = useState([]);
  const [input, setInput] = useState("");
  const [edit, setEditing] = useState(null);
  const [edittext, setEditingText] = useState("");

  const InputHandler = (e) => {
    setInput(e.target.value);
  };

  const AddHandler = () => {
    setCard_bundle_description([...card_bundle_description, input]);
    setInput("");
  };

  const EditHandler = (e) => {
    setEditingText(e.target.value);
  };
  const handleDelete = (id) => {
    setCard_bundle_description(
      card_bundle_description.filter((item, index) => index !== id)
    );
  };

  const SubmitEdit = (id) => {
    setCard_bundle_description(
      [...card_bundle_description].map((descs, index) => {
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
    const fetchPrice = async () => {
      try {
        const response = await axiosInstance.get("/card/pricing-listing");
      
        if (Array.isArray(response?.data.data)) {
          const prices = response.data?.data?.map((res) => {
            if (res.card_type === "Single Card") {
              return res?.card_price;
            }
          });
          if (prices[0]) {
            if (typeof prices[0] === "string") {
              const parsedPrice = Number(prices[0].replace("$", ""));
              if (!isNaN(parsedPrice)) {
                setState(parsedPrice);
              } else {
                console.error("Invalid price: Unable to parse into a number");
                setState(0);
              }
            } else {
              setState(prices[0]);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPrice();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {
      number_of_cards: values.number_of_cards
        ? ""
        : "number_of_cards is required.",
      discount: values.discount ? "" : "discount are required.",
      card_bundle_description: card_bundle_description
        ? ""
        : "description is required.",
      currency_type: values.currency_type ? "" : "currency_type is required.",
      price: state ? "" : "price is required.",
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
    formData.append("number_of_cards", values.number_of_cards);
    formData.append("price", state);

    formData.append(
      "card_bundle_description",
      JSON.stringify(card_bundle_description)
    );

    formData.append("discount", values.discount);
    formData.append("currency_type", values.currency_type);


    // for (const value of formData.values()) {
    //     console.log(value,"oksdhfkdhfg");
    //   }

    try {
      const response = await axiosInstance.post("/card/add-card-bundle", formData);
      
      if (response) {
        toast.success("Card Added successfully");
        router.push("/admin/dashboard/bundle");
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
          <label
            htmlFor="number_of_cards"
            className="block text-sm font-semibold mb-2"
          >
            Number of Card
          </label>
          <input
            type="number"
            id="number_of_cards"
            name="number_of_cards"
            value={values.number_of_cards || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.number_of_cards && (
            <p className="text-red-500 text-sm">{errors.number_of_cards}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-semibold mb-2">
            Select Price
          </label>
          <select
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            className="w-full p-2 border rounded-sm"
          >
            <option value="">Select a collection</option>
            <option value={state}>{state}</option>
          </select>
          {errors.selectedCollection && (
            <p className="text-red-500 text-sm">{errors.selectedCollection}</p>
          )}
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-semibold mb-2">
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
            htmlFor="currency_type"
            className="block text-sm font-semibold mb-2"
          >
            Currency Type
          </label>
          <input
            type="text"
            id="currency_type"
            name="currency_type"
            value={values.currency_type || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.currency_type && (
            <p className="text-red-500 text-sm">{errors.currency_type}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="card_bundle_description"
            className="block text-sm font-semibold mb-2"
          >
            Description
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
            {card_bundle_description.map((descs, index) => (
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
