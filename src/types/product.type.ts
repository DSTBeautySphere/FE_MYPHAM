export interface Product {
  ma_san_pham: number;
  ma_loai_san_pham: number;
  ma_nha_cung_cap: number;
  ten_san_pham: string;
  trang_thai: null;
  so_sao_trung_binh:string;
  loai_san_pham: LoaiSANPham;
  anh_san_pham: AnhSANPham[];
  bien_the_san_pham: BienTheSANPham[];
  khuyen_mai_san_pham: KhuyenMaiSANPham[];
  mo_ta: MoTa[];
}

export interface AnhSANPham {
  ma_anh_san_pham: number;
  ma_san_pham: number;
  url_anh: string;
  la_anh_chinh: number;
}

export interface BienTheSANPham {
  ma_bien_the: number;
  ma_san_pham: number;
  mau_sac: string;
  loai_da: null;
  dung_tich: null | string;
  so_luong_ton_kho: number;
  gia_ban: string;
  trang_thai: null;
}

export interface KhuyenMaiSANPham {
  ma_khuyen_mai: number;
  ma_san_pham: number;
  muc_giam_gia: string;
  ngay_bat_dau: Date;
  ngay_ket_thuc: Date;
  dieu_kien_ap_dung: string;
}

export interface LoaiSANPham {
  ma_loai_san_pham: number;
  ma_dong_san_pham: number;
  ten_loai_san_pham: string;
  mo_ta: string;
}

export interface MoTa {
  ma_mo_ta: number;
  ma_san_pham: number;
  ten_mo_ta: string;
  chi_tiet_mo_ta: ChiTietMoTa[];
}

export interface ChiTietMoTa {
  ma_chi_tiet_mo_ta: number;
  ma_mo_ta: number;
  tieu_de: string;
  noi_dung: string;
}
