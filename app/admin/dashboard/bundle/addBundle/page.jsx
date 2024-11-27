
"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { Form } from "react-hook-form";

const Page = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    // const [data, setData] = useState([]);
    const [price,setPrice]=useState(0);
    const [state,setState]=useState();
    const [card_bundle_description,setCard_bundle_description] = useState([]);
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
//   const [imagePreviews, setImagePreviews] = useState([]); 
// console.log(price,"pricepriceprice");
// console.log(state,"statestate");

//   useEffect(() => {
   
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://magshopify.goaideme.com/card/bundle-list");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json(); 

//         console.log(result);
        
   
//         setData(result?.data); 
//       } catch (err) {
//         console.log(err)
//       } 
//     };

//     fetchData(); 
//   }, []); 


const [desc, setDesc] = useState([])
  const [input, setInput] = useState('')
  const [edit, setEditing]= useState(null)
  const [edittext , setEditingText] = useState('')

  const InputHandler = (e)=>{
    setInput(e.target.value)
  }

  const SubmitHandler = ()=>{
    setDesc([...desc, {text:input, id: Math.random()*1000}])
    setInput('')
  }
  const EditHandler = (e)=>{
    setEditingText(e.target.value)
    console.log(e.target.value)
  }

  const SubmitEdit = (id)=>{
    setDesc([...desc].map((descs)=>{
      if(descs.id === id){
        descs.text = edittext
      }
      return descs
    }))
    setEditing(null)
    setEditingText("")
  }



  useEffect(() => {
   
    const fetchPrice = async () => {
      try {
        const response = await fetch("https://magshopify.goaideme.com/card/pricing-listing");
        if (!response.ok) {
          throw new Error("Failed to fetch price");
        }
        const result = await response.json(); 
        if (Array.isArray(result?.data)) {
            const prices = result.data.map((res) => 
        
                {
                    if(res.card_type === "Single Card"){
                        return res?.card_price
                    }
                }
            
                 );
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
        console.log(err)
      } 
    };

    fetchPrice(); 
  }, []); 


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

const handlePriceChange = (e)=>{
      setPrice(e.target.value);
  }


  
  const [description,setDescription]=useState([])
  const handleChange1=(e)=>{
    console.log(e.target.value,"khkhkh");
    
    setCard_bundle_description([e.target.value]);
  }

  console.log(card_bundle_description,"description");
  
 
//   const handleFileChange = (e) => {
//     const { files } = e.target;
//     if (files) {
//       const selectedFiles = Array.from(files);

    
//       setValues((prev) => ({
//         ...prev,
//         collectionImage: selectedFiles,
//       }));


//       const newImagePreviews = selectedFiles.map((file) =>
//         URL.createObjectURL(file)
//       );
//       setImagePreviews(newImagePreviews);
//     }
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...values.collectionImage];
//     updatedImages.splice(index, 1); 

//     const updatedPreviews = [...imagePreviews];
//     updatedPreviews.splice(index, 1); 

  
//     setValues((prev) => ({
//       ...prev,
//       collectionImage: updatedImages,
//     }));
//     setImagePreviews(updatedPreviews);
//   };

  const validateForm = () => {
    const newErrors = {
        number_of_cards: values.number_of_cards? "" : "number_of_cards is required.",
        discount: values.discount ? "" : "discount are required.",
        card_bundle_description: card_bundle_description? "" : "description is required.",
        currency_type: values.currency_type? "" : "currency_type is required.",
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
    formData.append("card_bundle_description", JSON.stringify(card_bundle_description));
    formData.append("discount", values.discount);
    formData.append("currency_type", values.currency_type);


    
    // console.log(typeof(card_bundle_description));
    // console.log(card_bundle_description);
    

    for (const value of formData.values()) {
        console.log(value,"oksdhfkdhfg");

      }
// return     for the stop code
return
    try {
      const response = await axios.post(
        "https://magshopify.goaideme.com/card/add-card-bundle",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      
      if (response) {
        toast.success("Card Added successfully");
        router.push('/admin/dashboard/bundle')
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div>
          <label htmlFor="number_of_cards" className="block text-sm font-semibold">
            Number of Card
          </label>
          <input
            type="number"
            id="number_of_cards"
            name="number_of_cards"
            value={values.number_of_cards || ""}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          {errors.number_of_cards && (
            <p className="text-red-500 text-sm">{errors.number_of_cards}</p>
          )}
        </div>
          
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-semibold"
          >
            Select Price
          </label>
          <select
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            className="w-full p-2 border"
          >
            <option value="">Select a collection</option>
              <option  value={state}>
                {state} 
              </option>
          </select>
          {errors.selectedCollection && (
            <p className="text-red-500 text-sm">{errors.selectedCollection}</p>
          )}
        </div>


        <div>
          <label htmlFor="discount" className="block text-sm font-semibold">
             Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={values.discount || ""}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount}</p>
          )}
        </div>
        <div>
          <label htmlFor="currency_type" className="block text-sm font-semibold">
             Currency Type
          </label>
          <input
            type="text"
            id="currency_type"
            name="currency_type"
            value={values.currency_type || ""}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          {errors.currency_type && (
            <p className="text-red-500 text-sm">{errors.currency_type}</p>
          )}
        </div>

        <div>
          <label htmlFor="card_bundle_description" className="block text-sm font-semibold">
             Description
          </label>

          <div className="">
                <input value={input} onChange={InputHandler}/>
                <button onClick={SubmitHandler}>Add</button>  
                {desc.map(descs =>
                <div key={descs.id}>
                    {edit === descs.id ? 
                (<><input type="text" value={edittext} onChange={EditHandler}/>
                <button onClick={()=>SubmitEdit(descs.id)}>Edit</button></>)
                    : (<p onDoubleClick={()=>setEditing(descs.id)}>{descs.text}</p>)
                    }
                </div>
                )}  
            </div>






          {/* <textarea
            type="text"
            id="card_bundle_description"
            name="card_bundle_description"
            value={card_bundle_description}
            onChange={handleChange1}
            className="w-full p-2 border"
          /> */}

          {/* {errors.card_bundle_description && (
            <p className="text-red-500 text-sm">{errors.card_bundle_description}</p>
          )} */}
        </div>
        
        

        <div className="flex gap-4">
          <Button
            type="button"
            className="bg-gray-500 text-white"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-500 text-white">
            Save
          </Button>
        </div>
      </form>

      

    </>
  );
};

export default Page;
