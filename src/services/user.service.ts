import http from "@/libs/http";

class UserService {
  async getUser() {
    return http.get("/users/getProfile");
  }
}

export default new UserService();
