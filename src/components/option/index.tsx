import { BienTheSANPham } from "@/types/product.type";

interface IOption {
  data: BienTheSANPham[];
  option: string | number | null;
  setOption: (opt: string) => void;
}

export const Option = ({ data, option, setOption }: IOption) => {
  // Lọc các biến thể có số lượng lớn hơn 0 và trạng thái bằng 1
  const availableOptions = data?.filter((item) => item.so_luong_ton_kho > 0 && item.trang_thai === "1");

  return (
    <>
      <div className='flex items-center gap-x-3'>
        {availableOptions?.length === 0 ? ( // Kiểm tra nếu không có biến thể nào còn hàng
          <span className="text-red-500">Đã hết hàng</span>
        ) : (
          availableOptions?.map((item) => (
            <label
              key={item.ma_bien_the}
              htmlFor={`option-${item.ma_bien_the}`}
              className={`${
                option == item.ma_bien_the ? "bg-slate-900 text-white" : " bg-white text-slate-900"
              } py-2 px-4 rounded-md flex items-center justify-center border border-slate-300 cursor-pointer`}>
              <input
                type='radio'
                hidden
                id={`option-${item.ma_bien_the}`}
                name='option'
                value={item.ma_bien_the}
                onChange={(e) => setOption(e.target.value)}
              />
              <span>
                {
                  item.mau_sac && item.dung_tich
                    ? item.mau_sac + " - " + item.dung_tich + " ml"
                    : item.mau_sac
                    ? item.mau_sac
                    : item.loai_da
                    ? item.loai_da
                    : item.dung_tich + " ml"
                }
              </span>
            </label>
          ))
        )}
      </div>
    </>
  );
};
