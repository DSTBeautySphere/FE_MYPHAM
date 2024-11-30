import { Breadcrumb } from "@/components/breadcrumb";
import { ProductItem } from "@/components/productItem";
import productsService from "@/services/products.service";
import { Category } from "@/types/category.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Products() {
  const [categoriesId, setCategoriesId] = useState<string[]>([]);

  const fetchProducts = async () => {
    const response = await productsService.getAll({
      categories: categoriesId,
    });
    return response.data;
  };

  const fetchCategories = async () => {
    const response = await productsService.getAllCategories();
    return response.data;
  };

  const { data: products, isSuccess: isProductSuccess } = useQuery<Product[]>({
    queryKey: ["products", categoriesId],
    queryFn: fetchProducts,
  });

  const { data: categories, isSuccess: isCategorySuccess } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleCategoryChange = (categoryId: string) => {
    setCategoriesId((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]));
  };

  return (
    <div className='container'>
      <Breadcrumb subTitle='Sản phẩm' title='Danh sách sản phẩm' />
      <div className='grid grid-cols-12 gap-x-10 pt-10'>
        <div className='col-span-2'>
          <h1 className='text-lg font-bold pb-4'>Danh mục sản phẩm</h1>
          {isCategorySuccess &&
            categories.map((category) => (
              <div key={category.ma_loai_san_pham} className='flex items-center gap-x-2'>
                <input
                  type='checkbox'
                  id={category.ma_loai_san_pham.toString()}
                  onChange={() => handleCategoryChange(category.ma_loai_san_pham.toString())}
                />
                <label htmlFor={category.ma_loai_san_pham.toString()}>{category.ten_loai_san_pham}</label>
              </div>
            ))}
        </div>
      
        <div className='col-span-10 min-h-[50vh]'>
          <div className='grid grid-cols-3 gap-x-10'>
            {isProductSuccess && products.map((product) => <ProductItem key={product.ma_san_pham} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
