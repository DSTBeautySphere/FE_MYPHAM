import http from "@/libs/http";

class ProductsService {
  async getByGroupId(groupId: number,page: number = 1) {
    return await http.get(`/products/category/${groupId}?page=${page}`);
  }

  async getById(id: string) {
    return await http.get(`/product/${id}`);
  }

  async getAll(payload: any) {
    return await http.post("/products", payload);
  }

  async getAllCategories() {
    return await http.get("/categories");
  }
}

export default new ProductsService();
