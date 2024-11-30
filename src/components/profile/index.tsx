import { selectIsAuthenticated, selectUser } from "@/redux/features/auth/auth.selector";
import { logout } from "@/redux/features/auth/auth.slice";
import tokenUtil from "@/utils/token.util";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Profile = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    tokenUtil.removeToken("user");
    dispatch(logout());
    navigate("/account/login");
  };

  if (isAuthenticated) {
    return (
      <div className='relative pr-5 border-r cursor-pointer group border-slate-600'>
        <div className='flex items-center gap-x-1'>
          <User />
          <span>{user?.ho_ten}</span>
        </div>
        <div className='absolute z-10 invisible w-full duration-300 ease-in-out bg-white shadow group-hover:visible group-hover:top-8 top-14'>
          <ul>
            <li className='px-3 py-2' onClick={handleLogout}>
              Đăng xuất
            </li>
            <li className='px-3 py-2' >
              <Link to={'/reset-password'}>Đổi Mật Khẩu</Link>
             
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link to={"/account/login"} className='flex items-center pr-5 border-r cursor-pointer gap-x-1 border-slate-600'>
        <User />
        <span>Tài khoản</span>
      </Link>
    </>
  );
};
