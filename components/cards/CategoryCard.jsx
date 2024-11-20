"use client"
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {toast} from "react-hot-toast";
import axios from "axios";

const CategoryCard = ({ item }) => {

  const handleDelete = async (id) => {
    
    const data = {
      collection_uuid: id
    }

   
    try {
      const response = await axios.delete(
        "https://magshopify.goaideme.com/card/delete-collection",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast.success("Card deleted successfully");
       
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };
  

  return (
    <Card className="relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors group hover:bg-emerald-600">
      <CardHeader className="flex flex-row justify-between">
        <Image
          src={`https://magshopify.goaideme.com/${item?.collection_image[0]}`}
          alt="test"
          width={32}
          height={32}
        />
        <div>

        <Link href={`/admin/dashboard/category/edit/${item?.uuid}`}>
          <Button className="mr-3">Edit</Button>
        </Link>
        
          <button onClick={() => handleDelete(item?.uuid)}>Delete</button>
          
        </div>
      </CardHeader>
      <CardContent className="space-y-1.5">
        <CardTitle className="capitalize text-emerald-600 group-hover:text-white">
          {item?.collection_title}
        </CardTitle>
        <CardDescription className="group-hover:text-white">
          {item?.collection_description}
        </CardDescription>
      </CardContent>
    </Card>
  
  );
};

export default CategoryCard;
