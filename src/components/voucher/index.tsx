import { useEffect, useState } from "react";
import VoucherService from "@/services/voucher.service";
import logo from '@/assets/logo.svg';
import { selectUser } from "@/redux/features/auth/auth.selector";
import { useSelector } from "react-redux";

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

export default function Voucher() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector(selectUser);

  // Hàm gọi API để lấy danh sách voucher
  useEffect(() => {
    const fetchVouchers = async () => {
      if (!user?.ma_user) {  // Kiểm tra nếu không có userId
        setError("Vui lòng đăng nhập để xem các voucher.");
        setLoading(false);
        return;
      }

      try {
        const data = await VoucherService.getAllVouchers(user?.ma_user);
        if (Array.isArray(data) && data.length > 0) {
          setVouchers(data);
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
  const formatToInteger = (number: number) => {
    return Math.round(number);
  };
  // Hàm lưu voucher và xóa ngay khi lưu thành công
  const handleSaveVoucher = async (voucherId: number) => {
    if (!user?.ma_user) {  // Kiểm tra lại nếu người dùng chưa đăng nhập
      alert('Vui lòng đăng nhập để lưu voucher!');
      return;
    }

    try {
      // Lưu voucher
      await VoucherService.saveVoucher(user?.ma_user, voucherId);

      // Xóa voucher khỏi danh sách trong state ngay lập tức
      setVouchers((prevVouchers) => prevVouchers.filter(voucher => voucher.ma_voucher !== voucherId));

      alert('Voucher đã được lưu thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu voucher.');
    }
  };

  // Kiểm tra trạng thái loading và lỗi
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Voucher Hiện Tại</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vouchers.map((voucher) => (
          <div key={voucher.ma_voucher} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <img src={logo} alt={voucher.ten_voucher} className="w-16 h-16 object-cover rounded-md" />
              {voucher.loai_giam_gia === "Phần trăm" ? (
                    <p className="text-xl font-semibold text-red-600">{voucher.muc_giam_gia}%</p>
                  ) : (
                    <p className="text-xl font-semibold text-red-600">
                      {formatToInteger(voucher.muc_giam_gia)} VNĐ
                    </p>
                  )}
                  <p className="text-xs text-gray-500">Giảm giá</p>
            </div>
            <h3 className="text-lg font-semibold mb-2">{voucher.ten_voucher}</h3>
            <p className="text-sm text-gray-500"><strong>Ngày bắt đầu:</strong> {voucher.ngay_bat_dau}</p>
            <p className="text-sm text-gray-500"><strong>Ngày kết thúc:</strong> {voucher.ngay_ket_thuc}</p>
            <p className="text-sm text-gray-500"><strong>Điều kiện:</strong> {voucher.dieu_kien_ap_dung}</p>
            <div className="mt-4">
              <button
                onClick={() => handleSaveVoucher(voucher.ma_voucher)}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300"
              >
                Lưu Voucher
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
