export interface Order {
  ma_don_dat: number;
  ma_user: number;
  ngay_dat: string;
  ma_voucher: string;
  giam_gia: string;
  tong_tien_ban_dau: string;
  phi_van_chuyen: string;
  tong_tien_cuoi_cung: string;
  so_dien_thoai: string;
  dia_chi_giao_hang: string;
  ngay_du_kien_giao: string;
  ngay_thanh_toan: string;
  trang_thai_giao_hang: string;
  ghi_chu: string;
  phuong_thuc_thanh_toan: string;
  trang_thai_thanh_toan: string;
  trang_thai_don_dat: string;
}

export interface OrderDetail {
  ma_don_dat: number;
  ma_user: number;
  ngay_dat: Date;
  ma_voucher: null;
  giam_gia: string;
  tong_tien_ban_dau: string;
  phi_van_chuyen: string;
  tong_tien_cuoi_cung: string;
  so_dien_thoai: string;
  dia_chi_giao_hang: string;
  ngay_du_kien_giao: null;
  ngay_thanh_toan: null;
  trang_thai_giao_hang: null;
  ghi_chu: string;
  phuong_thuc_thanh_toan: string;
  trang_thai_thanh_toan: string;
  trang_thai_don_dat: string;
  chi_tiet_don_dat: ChiTietDonDAT[];
}

export interface ChiTietDonDAT {
  ma_chi_tiet_don_dat: number;
  ma_don_dat: number;
  ma_bien_the: number;
  so_luong: number;
  gia_ban: string;
  ten_san_pham: null;
  chi_tiet_tuy_chon: null;
  bien_the_san_pham: BienTheSANPham;
}

export interface BienTheSANPham {
  ma_bien_the: number;
  ma_san_pham: number;
  mau_sac: string;
  loai_da: null;
  dung_tich: null;
  so_luong_ton_kho: number;
  gia_ban: string;
  trang_thai: null;
  san_pham: SANPham;
}

export interface SANPham {
  ma_san_pham: number;
  ma_loai_san_pham: number;
  ma_nha_cung_cap: number;
  ten_san_pham: string;
  trang_thai: null;
  anh_san_pham: AnhSANPham[];
}

export interface AnhSANPham {
  ma_anh_san_pham: number;
  ma_san_pham: number;
  url_anh: string;
  la_anh_chinh: number;
}
