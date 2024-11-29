export interface Review {
  ma_danh_gia: number;
  ma_san_pham: number;
  ma_user: number;
  so_sao: number;
  noi_dung: string;
  ngay_danh_gia: Date;
  user: User;
}

export interface User {
  ma_user: number;
  ten_dang_nhap: string;
  ho_ten: string;
  gioi_tinh: null;
  so_dien_thoai: null;
  dia_chi: null;
  email: string;
  ngay_sinh: null;
  anh_dai_dien: null;
  xac_thuc: null;
  kich_hoat: null;
  trang_thai: null;
}
