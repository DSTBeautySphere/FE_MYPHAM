import http from "@/libs/http";

class CartService {
  async addToCart(payload: any) {
    return await http.post("/cart/addToCart", payload);
  }

  async getCart(payload: any) {
    return await http.post("/cart", payload);
  }

  async removeFromCart(id: number) {
    return await http.get(`/cart/${id}/delete`);
  }
}

export default new CartService();
