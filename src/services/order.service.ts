import http from "@/libs/http";

class OrderService {
  async updateStatus(id: number | string) {
    return await http.post(`/order/${id}/status`);
  }

  async getOrder(id: number | string) {
    return await http.get(`/order/user/${id}`);
  }

  async getOrderDetail(id: number | string) {
    return await http.get(`/order/${id}`);
  }

  async huyDon(ma_don_dat: number | string) {
    return await http.post(`/huydon`,{ma_don_dat:ma_don_dat});
  }

  async layTinh() {
    return await http.get(`/laytinh`);
  }

  async layHuyen(id:Number|string) {
    return await http.post(`/layhuyen`,{provinceId:id});
  }

  async layXa(id:Number|string) {
    return await http.post(`/layxa`,{districtId:id});
  }

  
  
  async tinhPhiVanChuyen(id: Number|string, ward: Number|string) {
    try {
      // Bước 1: Lấy dịch vụ vận chuyển từ API
      const serviceResponse = await http.post('/laydanhsachdichvu', { to_district: id }); // Lấy danh sách dịch vụ
  
      console.log('Dữ liệu dịch vụ trả về:', serviceResponse.data); // Log toàn bộ dữ liệu trả về
  
      // Kiểm tra nếu dữ liệu dịch vụ có sẵn
      if (serviceResponse.data.success && serviceResponse.data.data.length > 0) {
        const service = serviceResponse.data.data[0]; // Chọn dịch vụ đầu tiên từ danh sách
        const serviceId = service.service_id;
  
        // Bước 2: Gửi yêu cầu tính phí vận chuyển
        const feeResponse = await http.post('/tinhphivanchuyen', {
          service_id: serviceId, // Sử dụng service_id đã lấy từ API
          to_district: id,       // Quận đến
          to_ward_code: ward,    // Mã phường
        });
  
        console.log('Phí vận chuyển trả về:', feeResponse.data); // Log phản hồi tính phí
  
        // Kiểm tra kết quả tính phí
        if (feeResponse.data.success) {
          // Trả về dữ liệu cần thiết để hàm gọi có thể sử dụng
          return {
            success: true,
            data: feeResponse.data.data,
          };
        } else {
          return {
            success: false,
            message: feeResponse.data.message || 'Lỗi tính phí vận chuyển',
          };
        }
      } else {
        return {
          success: false,
          message: 'Không có dịch vụ vận chuyển',
        };
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      return {
        success: false,
        message: 'Có lỗi xảy ra khi gọi API tính phí vận chuyển',
      };
    }
  }
  
  

  
}

export default new OrderService();
