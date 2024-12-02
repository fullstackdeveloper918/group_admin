"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

import { IoChevronBackOutline } from "react-icons/io5";

const Page = () => {

  const router = useRouter()
  const [data, setData] = useState([]); // state to store fetched data
  const [values, setValues] = useState({
    url: "",
    title: "",
    tags: [],
    description: "",
    inventory: null,
    price: null,
    sale: null,
    selectedCollection: "",
    visible_at_home: "0",
    cards_images: [], 
  });
  const [errors, setErrors] = useState({
    url: "",
    title: "",
    tags: "",
    description: "",
    inventory: "",
    price: "",
    sale: "",
    selectedCollection: "", 
    visible_at_home: "",
    cards_images: ""

  });
  const [imagePreviews, setImagePreviews] = useState([]); 


  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch("https://magshopify.goaideme.com/card/collection-listing");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json(); 
   
        setData(result?.data); 
      } catch (err) {
        console.log(err)
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

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files) {
      const selectedFiles = Array.from(files);

    
      setValues((prev) => ({
        ...prev,
        collectionImage: selectedFiles,
      }));


      const newImagePreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(newImagePreviews);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...values.collectionImage];
    updatedImages.splice(index, 1); 

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1); 

  
    setValues((prev) => ({
      ...prev,
      collectionImage: updatedImages,
    }));
    setImagePreviews(updatedPreviews);
  };

  const validateForm = () => {
    const newErrors = {
      url: values.url ? "" : "URL is required.",
      title: values.title? "" : "title is required.",
      tags: values.tags ? "" : "tags are required.",
      description: values.description? "" : "description is required.",
      inventory: values.inventory? "" : "inventory is required.",
      price: values.price ? "" : "price is required.",  
      sale: values.sale ? "" : "sale is required.",
      selectedCollection: values.selectedCollection ? "" : "Select Category",
      collectionImage: values.collectionImage.length > 0 ? "" : "At least one image is required.",
      visible_at_home: values.visible_at_home ? "" : "Visibility is required.",
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
    formData.append("url", values.url);
    formData.append("title", values.title);
    formData.append("tags", values.tags);
    formData.append("description", values.description);
    formData.append("inventory", values.inventory);
    formData.append("visible_at_home", values.visible_at_home);
    formData.append("price", values.price);
    formData.append("sale", values.sale);
    formData.append("collection_type", values.selectedCollection);


    values.collectionImage.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "https://magshopify.goaideme.com/card/add-card",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        toast.success("Card Added successfully");
        router.push('/admin/dashboard/cards')
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
            htmlFor="selectedCollection"
            className="block text-sm font-semibold mb-2"
          >
            Select Category
          </label>
          <select
            id="selectedCollection"
            name="selectedCollection"
            value={values.selectedCollection}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          >
            <option value="">Select a collection</option>
            {data && data.map((item) => (
              <option key={item.uuid} value={item.uuid}>
                {item?.collection_title} 
              </option>
            ))}
          </select>
          {errors.selectedCollection && (
            <p className="text-red-500 text-sm">{errors.selectedCollection}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Visible at Home</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                id="visible_at_home_1"
                name="visible_at_home"
                value="1"
                checked={values.visible_at_home === "1"}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                id="visible_at_home_0"
                name="visible_at_home"
                value="0"
                checked={values.visible_at_home === "0"}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
          {errors.visible_at_home && (
            <p className="text-red-500 text-sm">{errors.visible_at_home}</p>
          )}
        </div>


        <div>
          <label htmlFor="url" className="block text-sm font-semibold mb-2">
            Cards URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={values.url}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.url && (
            <p className="text-red-500 text-sm">{errors.url}</p>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            Cards Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-semibold mb-2">
            Cards Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={values.tags || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags}</p>
          )}
        </div>

        <div>
          <label htmlFor="inventory" className="block text-sm font-semibold mb-2">
            Cards Inventory
          </label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            value={values.inventory || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.collectionType && (
            <p className="text-red-500 text-sm">{errors.collectionType}</p>
          )}
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-semibold mb-2">
            Cards Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={values.price || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
        <div>
          <label htmlFor="sale" className="block text-sm font-semibold mb-2">
            Cards Sale
          </label>
          <input
            type="number"
            id="sale"
            name="sale"
            value={values.sale || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.sale && (
            <p className="text-red-500 text-sm">{errors.sale}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold mb-2">
            Cards Description
          </label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="collectionImage" className="block text-sm font-semibold mb-2">
            Collection Images
          </label>
          <input
            type="file"
            id="collectionImage"
            name="collectionImage"
            multiple
            onChange={handleFileChange}
            className=" p-2 border rounded-sm border-[#8e8e8e6b] border-dashed"
          />
          {errors.collectionImage && (
            <p className="text-red-500 text-sm">{errors.collectionImage}</p>
          )}
        </div>

        {imagePreviews.length > 0 && (
          <div className="mt-2">
            <p className="text-sm">Image Previews:</p>
            <div className="grid grid-cols-3 gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 text-red-500 font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4">
         
          <Button type="submit" className="py-2 bg-primary text-white px-5 mt-3">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
