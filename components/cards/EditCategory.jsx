"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const EditCategory = ({ data, querydata }) => {
  // console.log(querydata,"querydata");
  // console.log(data,"datatattatat");

  const router = useRouter();
  const { slug } = useParams();
  const CategoryId = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const [values, setValues] = useState(() => {
    if (querydata) {
      return {
        collectionUri: data?.data?.collection_uri,
        collectionType: data?.data?.collection_title,
        collectionDescription: data?.data?.collection_description,
        collectionImage: `https://magshopify.goaideme.com/${data?.data?.collection_image}`,
      };
    } else {
      return {
        collectionUri: "",
        collectionType: "",
        collectionDescription: "",
        collectionImage: [],
      };
    }
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
    } else {
      setEditMode(false);
    }
  }, [CategoryId]);

  const fetchCollectionData = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `https://magshopify.goaideme.com/card/collection/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      const data = response?.data;
      setValues({
        collectionType: data.collection_title,
        collectionUri: data.collection_uri,
        collectionDescription: data.collection_description,
        collectionImage: [],
      });

      const imagePreviews = data.collection_images || [];
      setImagePreviews(imagePreviews);
    } catch (error) {
      console.error("Errorrr fetching collection data:", error);
    }
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

  // console.log(values,"valuessssss");

  // console.log(imagePreviews,"imagepreviws");

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

  const UpdateImage = (index) => {
    // console.log(values.collectionImage, "uuuuuuuuuuuuuuuuuuuu");
    if(Array.isArray(values.collectionImage)){
      const UpdatedImage = values.collectionImage.filter((_, i) => i !== index);
      // console.log(UpdatedImage, "updataddddddddd");
    }
    setValues((prevValues) => ({
      ...prevValues,
      collectionImage: UpdatedImage,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      collectionType: values.collectionType
        ? ""
        : "Collection type is required.",
      collectionUri: values.collectionUri ? "" : "Collection URI is required.",
      collectionDescription: values.collectionDescription
        ? ""
        : "Description is required.",
      collectionImage:
        values.collectionImage.length > 0
          ? ""
          : "At least one image is required.",
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
    formData.append("collection_title", values.collectionType);
    formData.append("collection_uri", values.collectionUri);
    formData.append("collection_description", values.collectionDescription);

    // if (Array.isArray(values.collectionImage)) {
    //   values.collectionImage.forEach((file) => {
    //     formData.append("files", file);
    //   });
    // } else {
    //   console.error("collectionImage is not an array:", values.collectionImage);
    // }
    const images = Array.isArray(values.collectionImage)
      ? values.collectionImage
      : [values.collectionImage];

    images.forEach((image) => {
      formData.append("files", image);
    });
   
    const token = Cookies.get("token");
    try {
      let response;
      if (editMode) {
        response = await axios.post(
          `https://magshopify.goaideme.com/card/update_collection/${querydata}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (response) {
        toast.success(
          editMode
            ? "Category Updated Successfully"
            : "Category Added Successfully"
        );
        router.push("/admin/dashboard/category");
      }
    } catch (error) {
      console.error("Network error", error);
      toast.error("Something went wrong.");
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
            htmlFor="collectionUri"
            className="block text-sm font-semibold mb-2 mb-2"
          >
            Collection URI
          </label>
          <input
            type="text"
            id="collectionUri"
            name="collectionUri"
            value={values.collectionUri}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.collectionUri && (
            <p className="text-red-500 text-sm">{errors.collectionUri}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="collectionType"
            className="block text-sm font-semibold mb-2 mb-2"
          >
            Collection Type
          </label>
          <input
            type="text"
            id="collectionType"
            name="collectionType"
            value={values.collectionType || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.collectionType && (
            <p className="text-red-500 text-sm">{errors.collectionType}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="collectionDescription"
            className="block text-sm font-semibold mb-2 mb-2"
          >
            Collection Description
          </label>
          <textarea
            id="collectionDescription"
            name="collectionDescription"
            value={values.collectionDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm"
          />
          {errors.collectionDescription && (
            <p className="text-red-500 text-sm">
              {errors.collectionDescription}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="collectionImage"
            className="block text-sm font-semibold mb-2 mb-2"
          >
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

        {querydata && (
          <div className="mt-2">
            <p className="text-sm">Images:</p>
            <div className="grid grid-cols-3 gap-2">
              {data?.data?.collection_image.map((image, index) => (
                // {console.log(image,"fdhfsh")}
                <div key={index} className="relative">
                  <img
                    src={`https://magshopify.goaideme.com/${image}`}
                    alt={`EditImage ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => UpdateImage(index)}
                    className="absolute top-0 right-0 text-red-500 font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {imagePreviews.length ||
          (values.collectionImage > 0 && (
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
          ))}

        <div className="flex gap-4">
          <Button type="submit" className="bg-primary text-white px-5 mt-3">
            {editMode ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditCategory;
