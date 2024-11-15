import ProductCard from "@/components/cards/ProductCard";
import { fetchData } from "@/lib/actions";

const PopularProducts = async () => {
  const data = await fetchData(
    "https://magshopify.goaideme.com/card/card-listing"
  );
  const products = data?.listing;

  console.log(products, 'products')

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default PopularProducts;
