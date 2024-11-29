import orderService from "@/services/order.service";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function VnPayReturn() {
  const location = useLocation();
  const [messasge, setMessasge] = useState<string | null>(null);

  const updateStatus = async (id: number | string) => {
    try {
      await orderService.updateStatus(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("vnp_ResponseCode");
    const orderId = query.get("vnp_TxnRef");
    if (status === "00") {
      if (orderId) {
        updateStatus(orderId);
      }
      setMessasge("Thanh toán thành công!");
    } else {
      setMessasge("Thanh toán thất bại!");
    }
  }, [location]);

  return (
    <div className='container min-h-[50vh] flex flex-col items-center justify-center'>
      <h1 className='text-center text-5xl text-green-600 font-bold'>{messasge}</h1>
      <Link to='/' className='mt-5 text-2xl'>
        Về trang chủ
      </Link>
    </div>
  );
}
