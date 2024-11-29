import http from "@/libs/http";

class ProductsService {
  async getByGroupId(groupId: number) {
    return await http.get(`/products/category/${groupId}`);
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
