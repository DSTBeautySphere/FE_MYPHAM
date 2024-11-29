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
}

export default new OrderService();
