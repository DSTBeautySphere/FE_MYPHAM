export interface IMenuItem {
  title: string;
  path: string;
}

export const MenuItems: IMenuItem[] = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Hàng mới về",
    path: "/new-arrival",
  },
  {
    title: "Tra cứu đơn hàng",
    path: "/order/history",
  },
];
