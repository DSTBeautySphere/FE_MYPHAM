import { selectIsAuthenticated, selectUser } from "@/redux/features/auth/auth.selector";
import orderService from "@/services/order.service";
import { Order } from "@/types/order.type";
import stringUtil from "@/utils/string.util";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { HttpStatusCode } from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
export default function History() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchData = async () => {
    if (isAuthenticated && user) {
      const response = await orderService.getOrder(user.ma_user);

      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      }

      return [];
    }
  };

  const { data, isSuccess } = useQuery<Order[]>({
    queryKey: ["orders", user],
    queryFn: fetchData,
    enabled: isAuthenticated && user ? true : false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCancelOrder = async (orderId: number) => {
    if (window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      try {
        const response = await orderService.huyDon(orderId);
        if (response.status === HttpStatusCode.Ok) {
          toast.success("Hủy đơn hàng thành công!");
          // Gọi lại dữ liệu để cập nhật danh sách đơn
          queryClient.invalidateQueries({ queryKey: ["orders"] });  
        } else {
          toast.error("Không thể hủy đơn hàng. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng:", error);
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    }
  };
  

  return (
    <div className='container min-h-[50vh] mt-20'>
      <div className='relative overflow-x-auto border'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Mã đơn
              </th>
              <th scope='col' className='px-6 py-3'>
                Ngày đặt
              </th>
              <th scope='col' className='px-6 py-3'>
                Tổng tiền
              </th>
              <th scope='col' className='px-6 py-3'>
                Địa chỉ
              </th>
              <th scope='col' className='px-6 py-3'>
                Số điện thoại
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái thanh toán
              </th>
              <th scope='col' className='px-6 py-3'>
                Trạng thái
              </th>
              <th scope='col' className='px-6 py-3'>
                Chi tiết
              </th>
              <th scope='col' className='px-6 py-3'>
                Hủy đơn
              </th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              data.map((order) => (
                <tr key={order.ma_don_dat} className='bg-white border-b'>
                  <td className='px-6 py-4'>{order.ma_don_dat}</td>
                  <td className='px-6 py-4'>{order.ngay_dat}</td>
                  <td className='px-6 py-4'>{stringUtil.formatPrice(+order.tong_tien_cuoi_cung)}</td>
                  <td className='px-6 py-4'>{order.dia_chi_giao_hang}</td>
                  <td className='px-6 py-4'>{order.so_dien_thoai}</td>
                  <td className='px-6 py-4'>{order.trang_thai_thanh_toan}</td>
                  <td className='px-6 py-4'>{order.trang_thai_don_dat}</td>
                  <td className='px-6 py-4'>
                    <Link to={`/order/history/${order.ma_don_dat}`}>Xem chi tiết</Link>
                  </td>
                  <td className='px-6 py-4'>
                    
                    {order.trang_thai_don_dat === "Chờ xác nhận" && (
                      <button
                        className='text-red-500 hover:underline'
                        onClick={() => handleCancelOrder(order.ma_don_dat)}
                      >
                        Hủy đơn
                      </button>
                    )}
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
