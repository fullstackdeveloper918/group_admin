"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  // const params = useParams();
  const { slug } = useParams();
  const CategoryId = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    collectionUri: "",
    collectionType: "",
    collectionDescription: "",
    collectionImage: [], 
  });
  const [errors, setErrors] = useState({
    collectionUri: "",
    collectionType: "",
    collectionDescription: "",
    collectionImage: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editMode, setEditMode] = useState(false); 


  useEffect(() => {
    if (CategoryId !== "add") {
      setEditMode(true); 
      fetchCollectionData(CategoryId);
    } else{
      setEditMode(false)
    }
  }, [CategoryId]);

  const fetchCollectionData = async (id) => {
    try {
      const response = await axios.get(`https://magshopify.goaideme.com/card/collection/${id}`);
      const data = response.data;

      console.log(data, 'data')

      setValues({
        collectionUri: data.collection_uri,
        collectionType: data.collection_title,
        collectionDescription: data.collection_description,
        collectionImage: [],
      });

     
      const imagePreviews = data.collection_images || [];
      setImagePreviews(imagePreviews);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      collectionUri: values.collectionUri ? "" : "Collection URI is required.",
      collectionType: values.collectionType ? "" : "Collection type is required.",
      collectionDescription: values.collectionDescription ? "" : "Description is required.",
      collectionImage: values.collectionImage.length > 0 ? "" : "At least one image is required.",
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
    formData.append("collection_uri", values.collectionUri);
    formData.append("collection_title", values.collectionType);
    formData.append("collection_description", values.collectionDescription);

    values.collectionImage.forEach((file) => {
      formData.append("files", file);
    });

    try {
      let response;
      if (editMode) {
        response = await axios.put(
          `https://magshopify.goaideme.com/card/update-card-collection/${collectionId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "https://magshopify.goaideme.com/card/add-card-collection",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response) {
        toast.success(editMode ? "Category Updated Successfully" : "Category Added Successfully");
        router.push('/admin/dashboard/category');
      }
    } catch (error) {
      console.error("Network error", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="collectionUri" className="block text-sm font-semibold">
            Collection URI
          </label>
          <input
            type="text"
            id="collectionUri"
            name="collectionUri"
            value={values.collectionUri}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          {errors.collectionUri && (
            <p className="text-red-500 text-sm">{errors.collectionUri}</p>
          )}
        </div>

        <div>
          <label htmlFor="collectionType" className="block text-sm font-semibold">
            Collection Type
          </label>
          <input
            type="text"
            id="collectionType"
            name="collectionType"
            value={values.collectionType || ""}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          {errors.collectionType && (
            <p className="text-red-500 text-sm">{errors.collectionType}</p>
          )}
        </div>

        <div>
          <label htmlFor="collectionDescription" className="block text-sm font-semibold">
            Collection Description
          </label>
          <textarea
            id="collectionDescription"
            name="collectionDescription"
            value={values.collectionDescription}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          {errors.collectionDescription && (
            <p className="text-red-500 text-sm">{errors.collectionDescription}</p>
          )}
        </div>

        <div>
          <label htmlFor="collectionImage" className="block text-sm font-semibold">
            Collection Images
          </label>
          <input
            type="file"
            id="collectionImage"
            name="collectionImage"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border"
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
          <Button
            type="button"
            className="bg-gray-500 text-white"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-500 text-white">
            {editMode ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
