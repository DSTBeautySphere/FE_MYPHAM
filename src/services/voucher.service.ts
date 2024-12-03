import http from "@/libs/http";

// Định nghĩa kiểu cho tham số
class VoucherService {
  // Phương thức lấy tất cả vouchers
  async getAllVouchers(userId: number) {
    try {
      // Kiểm tra nếu userId không tồn tại
      if (!userId) {
        throw new Error("User không hợp lệ");
      }
      const response = await http.get(`/getvoucher?ma_user=${userId}`);
      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching vouchers:", error);
      throw error;
    }
  }

  // Phương thức lưu voucher
  async saveVoucher(userId: number, voucherId: number): Promise<void> {
    try {
      // Kiểm tra nếu userId hoặc voucherId không hợp lệ
      if (!userId || !voucherId) {
        throw new Error("Thông tin người dùng hoặc voucher không hợp lệ");
      }
      const response = await http.post('/storevoucher', {
        ma_user: userId,
        ma_voucher: voucherId
      });
      console.log(response.data.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error saving voucher:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

  async showVoucherUser(userId: number) {
    try {
      // Kiểm tra nếu userId không hợp lệ
      if (!userId) {
        throw new Error("User không hợp lệ");
      }

      // Gửi yêu cầu đến API
      const response = await http.get(`/showvoucheruser?ma_user=${userId}`);
      return response.data; // Trả về dữ liệu voucher đã lưu
    } catch (error: unknown) {
      console.error("Error fetching saved vouchers:", error);
      throw error; // Ném lỗi để xử lý bên ngoài
    }
  }

  async deleteVoucherUser(userId: number, voucherId: number): Promise<void> {
    try {
      if (!userId || !voucherId) {
        throw new Error("Thông tin người dùng hoặc voucher không hợp lệ");
      }

      // Gửi yêu cầu xóa voucher
      const response = await http.post('/deletevoucheruser', {
          ma_user: userId,
          ma_voucher: voucherId
      });
      console.log(response.data.message); // In thông báo thành công từ API
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting voucher:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  }

}

export default new VoucherService();
