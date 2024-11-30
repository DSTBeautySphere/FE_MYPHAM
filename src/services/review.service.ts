import http from "@/libs/http";

class ReviewService {
  async getReviews(id: number) {
    return await http.get(`/review/${id}`);
  }

  async create(payload: any) {
    return await http.post("review/create", payload);
  }

  async checkUserBoughtProduct(formData:any)
  {
    const response=  await http.post("checkboughtproduct",formData);
    return response.data;
  }
}

export default new ReviewService();
