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

const CategoryCard = ({ item }) => {

  return (
    // <Link href={`/products?category=${item}`}>
    <Card className="relative h-full w-full overflow-hidden rounded-lg bg-transparent transition-colors group hover:bg-emerald-600">
      <CardHeader className="flex flex-row justify-between">
        <Image
          src={`https://magshopify.goaideme.com/${item?.collection_image[0]}`}
          alt="test"
          width={32}
          height={32}
        />
        <Link href={`/admin/dashboard/category/edit/${item?.uuid}`}>
          <Button>Edit</Button>
        </Link>
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
    // </Link>
  );
};

export default CategoryCard;
