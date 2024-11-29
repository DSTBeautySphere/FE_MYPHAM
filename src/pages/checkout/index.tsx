import { Heading } from "@/components/heading";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { selectIsAuthenticated, selectUser } from "@/redux/features/auth/auth.selector";
import cartService from "@/services/cart.service";
import { Cart } from "@/types/cart.type";
import stringUtil from "@/utils/string.util";
import { useQuery } from "@tanstack/react-query";
import axios, { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Checkout() {
  const [formValue, setFormValue] = useState({
    phone: "",
    address: "",
    note: "",
  });
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    if (isAuthenticated && user) {
      const response = await cartService.getCart({ userId: user.ma_user });

      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      }

      return [];
    }
  };

  const { data, isSuccess } = useQuery<Cart[]>({
    queryKey: ["cart", user],
    queryFn: fetchData,
    enabled: isAuthenticated && user ? true : false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const totalAmount = data?.reduce((pre, curr) => pre + +curr.gia_ban * curr.so_luong, 0) ?? 0;
    setTotal(totalAmount);
  }, [isSuccess, data]);

  const handleCheckout = async () => {
    try {
      const payload = {
        amount: total,
        backCode: "NCB",
        userId: user?.ma_user,
        ...formValue,
      };

      const response = await axios.post("http://127.0.0.1:8000/create-payment", payload);
      if (response.data.status === "success") {
        window.location.href = response.data.url;
      }
    } catch (error) {
      toast.error("Thanh toán thất bại");
    }
  };

  return (
    <>
      {isSuccess && (
        <div className='container pt-20 min-h-[60vh]'>
          <div className='grid grid-cols-12 gap-x-20'>
            <div className='col-span-8'>
              <Heading text='Thông tin đơn hàng' />
              <form>
                <div className='grid grid-cols-2 gap-4 mb-3'>
                  <div>
                    <Input
                      label='Số điện thoại'
                      id='phone-input'
                      type='text'
                      name='phone'
                      value={formValue.phone}
                      onChange={handleChange}
                      isRequired={true}
                    />
                  </div>
                  <div>
                    <Input
                      label='Địa chỉ nhận hàng'
                      id='address-input'
                      type='text'
                      name='address'
                      value={formValue.address}
                      onChange={handleChange}
                      isRequired={true}
                    />
                  </div>
                </div>
                <div className='mb-3'>
                  <Input label='Ghi chú đơn hàng' id='note-input' type='text' name='note' value={formValue.note} onChange={handleChange} />
                </div>
              </form>
            </div>

            <div className='col-span-4 border-l pl-20'>
              <ul role='list' className='-my-6 divide-y divide-gray-200'>
                {data &&
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
                            <h3 className='cursor-pointer hover:underline'>{item.bien_the_san_pham.san_pham.ten_san_pham}</h3>
                          </div>
                          <p className='mt-1 text-sm'>{stringUtil.formatPrice(+item.gia_ban)}</p>
                        </div>
                        <div className='flex items-end justify-between flex-1 text-sm'>
                          <p className='text-gray-500'>SL: {item.so_luong}</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>

              <div className='mt-10 border-t border-gray-200 py-6 space-y-4'>
                <div className='flex items-center justify-between text-gray-900'>
                  <p className='text-xl font-medium text-gray-900'>Tổng tiền</p>
                  <p className='text-2xl font-bold'>{stringUtil.formatPrice(total)}</p>
                </div>
                <div>
                  <Button className='w-full' size={"lg"} tabIndex={-1} onClick={handleCheckout} disabled={data?.length === 0}>
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
