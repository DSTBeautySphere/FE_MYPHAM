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
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Drawer, Radio, Space } from 'antd';
import voucherService from "@/services/voucher.service";
import logo from '@/assets/logo.svg';

interface Voucher {
  ma_voucher: number;
  code_voucher: string;
  ten_voucher: string;
  muc_giam_gia: number;
  loai_giam_gia:string;
  gia_tri_dieu_kien:number;
  giam_gia_toi_da:number;
  ngay_bat_dau: string;
  ngay_ket_thuc: string;
  dieu_kien_ap_dung: string;
  logo_voucher: string;
}

export default function Checkout() {
  const [formValue, setFormValue] = useState({
    phone: "",
    address: "",
    note: "",
    
  });
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const [discountAmount , setDiscountAmount] = useState(0);
  const [amountAfterDiscount, setAmountAfterDiscount] = useState(0);

  const handleApplyVoucher = async (voucher: Voucher) => {
    if (!user) {
      alert('Thông tin người dùng không hợp lệ.');
      return;
    }
  
    // Kiểm tra điều kiện để áp dụng voucher
    if (voucher.loai_giam_gia === "Phần trăm") {
      if (total < voucher.gia_tri_dieu_kien) {
        alert(`Đơn hàng phải đạt tối thiểu ${stringUtil.formatPrice(voucher.gia_tri_dieu_kien)} để áp dụng voucher này.`);
        return;
      }
  
      // Lưu mã voucher và giá trị giảm giá vào state
      setVoucherCode(voucher.code_voucher);
      setDiscountVoucher(voucher.muc_giam_gia);
  
      // Tính số tiền giảm giá và tổng tiền sau giảm
      const discountAmount = Math.min(
        (total * voucher.muc_giam_gia) / 100, // Số tiền giảm giá theo %
        voucher.giam_gia_toi_da // Giảm giá tối đa (nếu có)
      );
  
      const amountAfterDiscount = total - discountAmount;
  
      // Cập nhật các state
      setDiscountAmount(discountAmount);
      setAmountAfterDiscount(amountAfterDiscount);
    } else {
      if (total < voucher.gia_tri_dieu_kien) {
        alert(`Đơn hàng phải đạt tối thiểu ${stringUtil.formatPrice(voucher.gia_tri_dieu_kien)} để áp dụng voucher này.`);
        return;
      }
  
      setVoucherCode(voucher.code_voucher);
      setDiscountVoucher(voucher.muc_giam_gia);
  
      // Tính số tiền giảm giá và tổng tiền sau giảm
      const discountAmount = Math.min(
        voucher.muc_giam_gia, // Số tiền giảm giá theo %
        voucher.giam_gia_toi_da // Giảm giá tối đa (nếu có)
      );
  
      const amountAfterDiscount = total - discountAmount;
  
      // Cập nhật các state
      setDiscountAmount(discountAmount);
      setAmountAfterDiscount(amountAfterDiscount);
    }
  
    // Xóa voucher khỏi hệ thống sau khi áp dụng
    try {
      console.log("Đang áp dụng voucher: ", user.ma_user, voucher.ma_voucher);
      await voucherService.deleteVoucherUser(user.ma_user, voucher.ma_voucher);
  
      // Cập nhật danh sách vouchers sau khi xóa voucher đã áp dụng
      setVouchers(prevVouchers => prevVouchers.filter(v => v.ma_voucher !== voucher.ma_voucher));
  
      // Đóng drawer sau khi áp dụng voucher
      setOpen(false);
      alert(`Đã áp dụng voucher: ${voucher.code_voucher}`);
    } catch (error) {
      console.error('Lỗi khi xóa voucher:', error);
    }
  };
  
  const handleDeleteApply = async () => {
    // Xóa mã voucher đã áp dụng và reset các state liên quan
    setVoucherCode("");
    setDiscountVoucher(0);
  
    const discountAmount = (total * 0) / 100; // Số tiền giảm giá = 0
    const amountAfterDiscount = total - discountAmount; // Tổng tiền sau khi giảm
  
    // Cập nhật các state
    setDiscountAmount(discountAmount);
    setAmountAfterDiscount(amountAfterDiscount);
  };
  
  useEffect(() => {
    const fetchVouchers = async () => {
      if (!user?.ma_user) {
        setError("Vui lòng đăng nhập để xem các voucher.");
        setLoading(false);
        return;
      }
  
      try {
        const data = await voucherService.showVoucherUser(user?.ma_user);
        if (Array.isArray(data) && data.length > 0) {
          setVouchers(data);
          console.log("Danh sách voucher: ", data);
        } else {
          setError("Không có dữ liệu khuyến mãi.");
        }
      } catch (err) {
        setError("Không thể tải dữ liệu khuyến mãi. Vui lòng thử lại.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVouchers();
  }, [user]);
  


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


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
        amountbf:total,
        discount:discountAmount,
        amount: total-discountAmount,
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
                  <p className='text-xl font-medium text-gray-900'>Tạm tính</p>
                  <p className='text-2xl font-bold'>{stringUtil.formatPrice(total)}</p>
                </div>
                <div className='flex items-center justify-between text-gray-900'>
                  <p className='text-xl font-medium text-gray-900'>Voucher: </p>
                  <p className='text-2xl font-bold'>{voucherCode}</p>
                </div>
                <div className='flex items-center justify-between text-gray-900'>
                  <p className='text-xl font-medium text-gray-900'>Tiền giảm</p>
                  <p className='text-2xl font-bold'>{stringUtil.formatPrice(discountAmount)}</p>
                </div>
                <div className='flex items-center justify-between text-gray-900'>
                  <p className='text-xl font-medium text-gray-900'>Tổng tiền phải thanh toán</p>
                  <p className='text-2xl font-bold'>{stringUtil.formatPrice(amountAfterDiscount)}</p>
                </div>
                <div>
                  <Button className='w-full' size={"lg"} tabIndex={-1} onClick={showDrawer} disabled={data?.length === 0}>
                    Áp dụng voucher
                  </Button>
                </div>            
                <div>
                  <Button className='w-full' size={"lg"} tabIndex={-1} onClick={handleDeleteApply} disabled={data?.length === 0}>
                    xóa áp dụng
                  </Button>
                </div>
                <div>
                  <Button className='w-full' size={"lg"} tabIndex={-1} onClick={handleCheckout} disabled={data?.length === 0}>
                    Thanh toán
                  </Button>
                </div>
                <Drawer
                    title="Khuyến Mãi Hiện Tại"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={open}
                  >
                    <div className="container mx-auto px-4 py-8">
                      <h2 className="text-2xl font-bold mb-6 text-gray-800">Khuyến Mãi Hiện Tại</h2>
                      <div className="flex flex-col gap-6">
                      {vouchers.map((voucher) => (
                        <div key={voucher.ma_voucher} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                          <div className="flex justify-between items-center mb-4">
                            <img src={logo} alt={voucher.ten_voucher} className="w-16 h-16 object-cover rounded-md" />
                            <div className="text-center">
                              {/* Hiển thị phần trăm giảm giá hoặc giá trị tiền */}
                              {voucher.loai_giam_gia === "Phần trăm" ? (
                                <p className="text-xl font-semibold text-red-600">{voucher.muc_giam_gia}%</p>
                              ) : (
                                <p className="text-xl font-semibold text-red-600">
                                  {stringUtil.formatPrice(+voucher.muc_giam_gia)}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">Giảm giá</p>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{voucher.ten_voucher}</h3>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{voucher.code_voucher}</h3>
                          <p className="text-sm text-gray-500"><strong>Ngày bắt đầu:</strong> {voucher.ngay_bat_dau}</p>
                          <p className="text-sm text-gray-500"><strong>Ngày kết thúc:</strong> {voucher.ngay_ket_thuc}</p>

                          <p className="text-sm text-gray-500">
                            <strong>Tối đa:</strong> 
                            {stringUtil.formatPrice(+voucher.giam_gia_toi_da)} 
                            <strong>Cho đơn từ:</strong> 
                            {stringUtil.formatPrice(+voucher.gia_tri_dieu_kien)} 
                          </p>
                          <div className="mt-4">
                            <button
                              onClick={() => handleApplyVoucher(voucher)} 
                              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 w-full"
                            >
                              Áp dụng voucher
                            </button>
                          </div>
                        </div>
                      ))}

                      </div>
                    </div>
                  </Drawer>


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
