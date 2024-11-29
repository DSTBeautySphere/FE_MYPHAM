import { Product } from "@/types/product.type";
import stringUtil from "@/utils/string.util";
import { Link } from "react-router-dom";

export interface IProduct {
  product: Product;
}

export const ProductItem = ({ product }: IProduct) => {
  const calculateDiscount = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };

  const formatToInteger = (number: number) => {
    return Math.round(number);
  };

  return (
    <>
      <div className='relative group'>
        <div className='absolute top-0 right-0'>
          {product.khuyen_mai_san_pham.length > 0 && (
            <span className='absolute top-0 right-0 px-2 py-1 text-md font-medium leading-tight text-red-700 bg-red-100'>
              {formatToInteger(+product.khuyen_mai_san_pham[0].muc_giam_gia)}%
            </span>
          )}
        </div>
        <div className='w-full overflow-hidden bg-gray-200 rounded-md aspect-square group-hover:opacity-75 lg:h-80'>
          <Link to={`/product/${product.ma_san_pham}`}>
            <img
              src={product.anh_san_pham[0]?.url_anh}
              alt=''
              className='object-cover object-center w-full h-full'
              loading='lazy'
              width={300}
              height={300}
            />
          </Link>
        </div>
  {/* Hiển thị số sao trung bình */}
       <div className="flex items-center mt-2">
          <span className="text-yellow-500">
            {'★'.repeat(Number(product.so_sao_trung_binh))}
            <span className="text-gray-300">
              {'★'.repeat(5 - Number(product.so_sao_trung_binh))}
            </span>
          </span>
          {/* <span className="ml-2 text-sm text-gray-600">
            {product?.so_sao_trung_binh} / 5
          </span> */}
        </div>

        <div className='mt-4'>
          <div>
            <h3 className='text-sm text-gray-700'>
              <Link to={`/product/${product.ma_san_pham}`}>{product.ten_san_pham}</Link>
            </h3>
          </div>
          <p className='text-sm font-medium text-gray-900'>
            {stringUtil.formatPrice(+product.bien_the_san_pham[0]?.gia_ban)}
            <span className='text-xs text-gray-300 ml-2 line-through'>
           
              {product.khuyen_mai_san_pham.length > 0 &&
                stringUtil.formatPrice(calculateDiscount(+product.bien_the_san_pham[0]?.gia_ban, +product.khuyen_mai_san_pham[0].muc_giam_gia))}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
