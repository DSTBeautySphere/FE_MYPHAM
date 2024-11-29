import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { selectShowCartModal } from "@/redux/features/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";
import stringUtil from "@/utils/string.util";
import { openModal } from "@/redux/features/cart/cart.slice";
import toast from "react-hot-toast";
import { selectIsAuthenticated, selectUser } from "@/redux/features/auth/auth.selector";
import cartService from "@/services/cart.service";
import { HttpStatusCode } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Cart } from "@/types/cart.type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ShoppingCartModal = () => {
  const isOpenModal = useSelector(selectShowCartModal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const handleRemoveItemFromCart = async (id: number) => {
    try {
      const response = await cartService.removeFromCart(id);

      if (response.status === HttpStatusCode.Ok) {
        toast.success("Xóa sản phẩm thành công");
        refetch();
      }
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
    }
  };

  const navigateToProductDetail = (id: number) => {
    dispatch(openModal(false));
    navigate(`/product/${id}`);
  };

  const fetchData = async () => {
    if (isAuthenticated && user) {
      const response = await cartService.getCart({ userId: user.ma_user });

      if (response.status === HttpStatusCode.Ok) {
        console.log("Cart", response.data);

        return response.data;
      }

      return [];
    }
  };

  const { data, refetch, isSuccess } = useQuery<Cart[]>({
    queryKey: ["cart", user],
    queryFn: fetchData,
    enabled: false,
  });

  useEffect(() => {
    if (isOpenModal) {
      refetch();
      const totalAmount = data?.reduce((pre, curr) => pre + +curr.gia_ban * curr.so_luong, 0) ?? 0;
      setTotal(totalAmount);
    }
  }, [isOpenModal, refetch, data]);

  const handleNavigateToCheckout = () => {
    dispatch(openModal(false));
    navigate("/checkout");
  };

  return (
    <div>
      <Sheet open={isOpenModal} onOpenChange={(open) => dispatch(openModal(open))}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <p className='font-bold uppercase'>Giỏ hàng</p>
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-col justify-between w-full h-full mt-8'>
            <div className='flex-1 pt-4 overflow-y-auto border-t'>
              <ul role='list' className='-my-6 divide-y divide-gray-200'>
                {isSuccess &&
                  data &&
                  data.map((item) => (
                    <li key={item.ma_gio_hang} className='flex py-6'>
                      <div className='flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                        <img
                          alt=''
                          src={item.bien_the_san_pham.san_pham.anh_san_pham[0].url_anh}
                          className='object-cover object-center w-full h-full'
                        />
                      </div>
                      <div className='flex flex-col flex-1 ml-4'>
                        <div>
                          <div className='text-base font-medium text-gray-900 line-clamp-1'>
                            <h3
                              className='cursor-pointer hover:underline'
                              onClick={() => navigateToProductDetail(item.bien_the_san_pham.san_pham.ma_san_pham)}>
                              {item.bien_the_san_pham.san_pham.ten_san_pham}
                            </h3>
                          </div>
                          <p className='mt-1 text-sm'>{stringUtil.formatPrice(+item.gia_ban)}</p>
                        </div>
                        <div className='flex items-end justify-between flex-1 text-sm'>
                          <p className='text-gray-500'>SL: {item.so_luong}</p>

                          <div className='flex'>
                            <button
                              type='button'
                              tabIndex={-1}
                              onClick={() => handleRemoveItemFromCart(item.ma_gio_hang)}
                              className='font-medium text-red-600 hover:text-red-500'>
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <div className='px-4 pt-6 pb-16 border-t border-gray-200 sm:px-6'>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Thành tiền</p>
                <p>{stringUtil.formatPrice(total)}</p>
              </div>
              <div className='mt-6'>
                <Button className='w-full' size={"lg"} onClick={handleNavigateToCheckout} tabIndex={-1} disabled={data?.length === 0}>
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
