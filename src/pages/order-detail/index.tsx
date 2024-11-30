import { selectIsAuthenticated, selectUser } from "@/redux/features/auth/auth.selector";
import orderService from "@/services/order.service";
import { OrderDetail as OrderDetailType } from "@/types/order.type";
import stringUtil from "@/utils/string.util";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function OrderDetail() {
  const { id } = useParams();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const fetchData = async () => {
    if (isAuthenticated && user) {
      const response = await orderService.getOrderDetail(id!);

      if (response.status === HttpStatusCode.Ok) {
        return response.data;
      }

      return [];
    }
  };

  const { data, isSuccess } = useQuery<OrderDetailType>({
    queryKey: ["order", user],
    queryFn: fetchData,
    enabled: isAuthenticated && user ? true : false,
  });

  return (
    <div className='container min-h-[50vh] mt-20'>
      <div className='relative overflow-x-auto border'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Tên sản phẩm
              </th>
              <th scope='col' className='px-6 py-3'>
                Biến thể sản phẩm
              </th>
              <th scope='col' className='px-6 py-3'>
                Số lượng
              </th>
              <th scope='col' className='px-6 py-3'>
                Thành tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              data.chi_tiet_don_dat.map((order) => (
                <tr key={order.ma_chi_tiet_don_dat} className='bg-white border-b'>
                <td className='px-6 py-4'>{order.bien_the_san_pham.san_pham.ten_san_pham}</td>
                <td className='px-6 py-4'>
                  {order.bien_the_san_pham.mau_sac || order.bien_the_san_pham.loai_da || order.bien_the_san_pham.dung_tich}
                </td>
                <td className='px-6 py-4'>{order.so_luong}</td>
                <td className='px-6 py-4'>{stringUtil.formatPrice(+order.gia_ban)}</td>
                <td><Link to={`/product/${order.bien_the_san_pham.san_pham.ma_san_pham}`}>Chi Tiết</Link></td>
              </tr>
                // <Link to={`/product/${order.bien_the_san_pham.san_pham.ma_san_pham}`}></Link>
                
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
