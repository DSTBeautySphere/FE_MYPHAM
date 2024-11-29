export interface Cart {
  ma_gio_hang: number;
  ma_user: number;
  ma_bien_the: number;
  so_luong: number;
  gia_ban: string;
  ngay_tao: Date;
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
