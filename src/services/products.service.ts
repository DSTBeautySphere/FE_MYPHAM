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

  async getRecommenderProduct(ma_san_pham:number, so_goi_y:number) {
    return await http.get(`/timsanphamtuongtu?ma_san_pham=${ma_san_pham}&so_goi_y=${so_goi_y}`);
  }

  async getRecommenderProductID3(ma_san_pham:number, so_goi_y:number) {
    return await http.get(`/goiysanphamdt`);
  }
}

export default new ProductsService();
