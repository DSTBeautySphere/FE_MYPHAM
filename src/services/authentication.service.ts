import http from "@/libs/http";

class AuthenticationService {
  async login(payload: any) {
    return await http.post("/login", payload);
  }

  async register(payload: any) {
    return await http.post("/register", payload);
  }

  async checkUsername(username: string) {
    return await http.post("/username/check", { username });
  }

  async changePassword(payload: any) {
    return await http.post("/password/change", payload);
  }

  async changePasswordByEmail(ten_dang_nhap: string) {
    return await http.post("/sendemailupdatepassword", { ten_dang_nhap });
  }
  
}

export default new AuthenticationService();
