import productsService from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";
import { redirect, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import stringUtil from "@/utils/string.util";
import { Quantity } from "@/components/quantity";
import { Button } from "@/components/ui/button";
import { ThumbsGallery } from "@/components/thumbsGallery";
import { Product } from "@/types/product.type";
import { Option } from "@/components/option";
import { selectIsAuthenticated, selectUser } from "@/redux/features/auth/auth.selector";
import cartService from "@/services/cart.service";
import { HttpStatusCode } from "axios";
import { useSelector } from "react-redux";
import { Heading } from "@/components/heading";
import reviewService from "@/services/review.service";
import { Review } from "@/types/review.type";
import { Rating } from "@/components/rating";
import StarRating from "@/components/star-rating";
import RecommenderList from "@/components/recommenderList";
import ProductList from "@/components/productList";

export const ProductDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [option, setOption] = useState<string | number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [checkUserBoughtProduct, setcheckUserBoughtProduct] = useState(false);
  const navigate = useNavigate();

  useEffect (()=> {
    const formData={
      ma_user: user?.ma_user,
      ma_san_pham: id
      
  }

  console.log(formData);
      const checkUserBoughtProduct=async()=>{
        const response=await reviewService.checkUserBoughtProduct(formData);
        console.log("đaa",response[0]);
        if(response[0])
        {
          console.log("heloo");
          setcheckUserBoughtProduct(response[0]);
        }else
        {
          console.log("kkkk");
          setcheckUserBoughtProduct(response[0]);
        }
      }

      checkUserBoughtProduct();
  },[])
  const fetchProduct = async () => {
    const response = await productsService.getById(id!);
    return response.data;
  };

  const fetchReview = async () => {
    const response = await reviewService.getReviews(+id!);
    return response.data;
  };

  const { data, isError, isSuccess } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  const {
    data: reviews,
    isSuccess: isReviewSuccess,
    refetch,
  } = useQuery<Review[]>({
    queryKey: ["reviews", id],
    queryFn: fetchReview,
  });

  const handleAddToCart = async () => {
    if (isAuthenticated && user) {
      const selectedOption = data?.bien_the_san_pham.find(item => item.ma_bien_the === option);
      if (selectedOption && quantity > selectedOption.so_luong_ton_kho) {
        // Thông báo nếu số lượng vượt quá tồn kho
        toast.error(`Số lượng không thể vượt quá ${selectedOption.so_luong_ton_kho}`);
        setQuantity(selectedOption.so_luong_ton_kho); // Cập nhật lại số lượng
        return; // Dừng lại không thêm vào giỏ hàng
      }
      setIsLoading(true);
      try {
        const payload = {
          userId: user.ma_user,
          productId: option,
          quantity: quantity,
          price: price,
        };
  
        const response = await cartService.addToCart(payload);
  
        if (response.status === HttpStatusCode.Ok) {
          toast.success("Thêm vào giỏ hàng thành công");
        }
      } catch (error) {
        toast.error("Thêm vào giỏ hàng thất bại");
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate("/account/login");
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSuccess && data) {
      setOption(data.bien_the_san_pham[0].ma_bien_the);
    }
  }, [isSuccess, data]);

  const getPrice = () => {
    if (isSuccess && data) {
      const price = data.bien_the_san_pham.find((item) => item.ma_bien_the == option)?.gia_ban || 0;

      if (data.khuyen_mai_san_pham.length > 0) {
        setPrice(calculateDiscount(+price, +data.khuyen_mai_san_pham[0].muc_giam_gia));
      } else {
        setPrice(+price);
      }
    }
  };

  useEffect(() => {
    getPrice();
  }, [option]);

  const calculateDiscount = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0 || comment === "") {
      toast.error("Vui lòng không để trống thông tin");
      return;
    }

    if(!isAuthenticated){
      return navigate("/account/login");
    }
    let adjustedRating = rating;
    if (rating === 1) {
      adjustedRating = 5;
    } else if (rating === 2) {
      adjustedRating = 4;
    } else if (rating === 3) {
      adjustedRating = 3;
    } else if (rating === 4) {
      adjustedRating = 2;
    } else if (rating === 5) {
      adjustedRating = 1;
    }
  
    try {
      const payload = {
        ma_san_pham: id,
        ma_user: user?.ma_user,
        so_sao: adjustedRating,
        noi_dung: comment,
      };
 console.log("Số Sao Nè:"+rating);
      const response = await reviewService.create(payload);

      if (response.status === HttpStatusCode.Ok) {
        toast.success("Gửi đánh giá thành công");
        setComment("");
        refetch();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isError) return redirect("/");

  return (
    <>
      {isSuccess && (
        <>
          <Breadcrumb subTitle='Sản phẩm' title={data.ten_san_pham} />
          <div className='w-full p-10 bg-white rounded-lg'>
            <div className='container grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <div>
                <ThumbsGallery images={data.anh_san_pham} />
              </div>
              <div className='space-y-5'>
                <h2 className='text-4xl font-bold dark:text-white'>{data.ten_san_pham}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-xl"> {/* Thêm text-xl hoặc thay đổi font-size tùy ý */}
                    {'★'.repeat(Number(data.so_sao_trung_binh))}
                    <span className="text-gray-300 text-xl">
                      {'★'.repeat(5 - Number(data.so_sao_trung_binh))}
                    </span>
                  </span>
                </div>
                {/* Mô Tả */}
                <div>
                  {data.mo_ta.length > 0 && data.mo_ta.map((item, index) => (
                    <div key={index} className='mb-5'>
                      <h4 className='text-md font-semibold pb-2'>{item.ten_mo_ta}:</h4>
                      <ul className='list-disc pl-5'>
                        {item.chi_tiet_mo_ta.map((item, index) => (
                          <li key={index}>{item.noi_dung}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {data.bien_the_san_pham.length > 0 && (
                  <>
                    <div className='space-y-2'>
                      <p className='text-gray-500'>Lựa chọn:</p>
                      <Option data={data.bien_the_san_pham} option={option} setOption={setOption} />
                    </div>
                    <h4 className='text-2xl font-semibold'>
                      {data.khuyen_mai_san_pham.length > 0
                        ? stringUtil.formatPrice(calculateDiscount(+data.bien_the_san_pham[0].gia_ban, +data.khuyen_mai_san_pham[0].muc_giam_gia))
                        : stringUtil.formatPrice(price)}
                      {data.khuyen_mai_san_pham[0] && (
                        <span className='text-sm text-gray-300 ml-2 line-through'>{stringUtil.formatPrice(+data.bien_the_san_pham[0].gia_ban)}</span>
                      )}
                    </h4>
                    <div className='space-y-2'>
                      <p className='text-gray-500'>Số lượng:</p>
                      <Quantity quantity={quantity} setQuantity={setQuantity} />
                    </div>
                    <div className='!mt-8'>
                      <Button size={"lg"} onClick={() => handleAddToCart()} disabled={isLoading} className={"w-[300px]"}>
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
           
              
            <RecommenderList groupCode={data?.ma_san_pham || 0} title="Gợi Ý Sản Phẩm" />
          


{/* hhhhhh */}
                  
            <div className='container mt-10'>
              {checkUserBoughtProduct?<><Heading text='Đánh giá' />
              <form onSubmit={handleSubmitReview} className='mb-4'>
                <div className='grid grid-cols-2'>
                  <div className='space-y-4'>
                    <StarRating setRating={setRating} />
                    <textarea
                      className='w-full h-24 p-2 mt-2 border border-gray-300 rounded resize-none'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder='Nội dung đánh giá'></textarea>
                    <Button type='submit'>Gửi đánh giá</Button>
                  </div>
                </div>
              </form></>:<></>}
              
              {isReviewSuccess && (
                <ul className='space-y-4'>
                  {reviews.map((item) => (
                    <li key={item.ma_danh_gia} className='space-y-1'>
                      <p className='font-bold'>{item.user.ho_ten}</p>
                      <Rating starCount={item.so_sao} />
                      <div>{item.noi_dung}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
