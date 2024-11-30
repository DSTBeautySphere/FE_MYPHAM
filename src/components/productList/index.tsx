import productsService from "@/services/products.service";
import { Heading } from "@/components/heading";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product.type";
import { ProductItem } from "@/components/productItem";
import { useState } from "react";

export default function ProductList({ groupCode, title }: { groupCode: number; title: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    const response = await productsService.getByGroupId(groupCode, currentPage);
    console.log(groupCode + " -" + response.data);
    return response.data;
  };

  const { data, isSuccess } = useQuery({
    queryKey: [`products-${groupCode}`, currentPage],
    queryFn: fetchProducts,
  });

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='container mt-20'>
      <Heading text={title} />

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-10'>
        {isSuccess &&
          data.data.map((product: Product) => (
            <ProductItem key={product.ma_san_pham} product={product} />
          ))}
      </div>

      {/* Phân trang */}
      <div className='flex justify-center mt-10'>
        {isSuccess && (
          <div className='flex items-center space-x-2'>
            {/* Nút Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={data.current_page === 1}
              className='px-4 py-2 border rounded-lg'
            >
              Previous
            </button>

            {/* Hiển thị số trang */}
            {Array.from({ length: data.last_page }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-4 py-2 border rounded-lg ${
                  page === data.current_page ? "bg-blue-500 text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}

            {/* Nút Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < data.last_page ? prev + 1 : prev))
              }
              disabled={data.current_page === data.last_page}
              className='px-4 py-2 border rounded-lg'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
