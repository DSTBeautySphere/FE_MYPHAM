import productsService from "@/services/products.service";
import { Heading } from "@/components/heading";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product.type";
import { ProductItem } from "@/components/productItem";
import { useState } from "react";

export default function ProductList({ groupCode, title }: { groupCode: number; title: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    const response = await productsService.getRecommenderProduct(groupCode, 4);
    console.log(groupCode + " -" + response);
    return response;
  };

  const { data, isSuccess } = useQuery({
    queryKey: [`products-${groupCode}`, currentPage],
    queryFn: fetchProducts,
  });


  return (
    <div className='container mt-20'>
      <Heading text={title} />

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-10'>
        {isSuccess &&
          data.data.map((product: Product) => (
            <ProductItem key={product.ma_san_pham} product={product} />
          ))}
      </div>

     
    </div>
  );
}
