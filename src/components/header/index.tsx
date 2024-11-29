import { Logo } from "@/components/logo";
import { Profile } from "@/components/profile";
import { MenuItems } from "@/data/menu";
import { openModal } from "@/redux/features/cart/cart.slice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <div className='w-full h-[41px] bg-slate-100'>
          <div className='container flex justify-between items-center h-full'>
            <div>
              <p>It's so good to see you today :)</p>
            </div>
            <div className='flex items-center gap-x-5'>
              <Profile />
              <div className='flex items-center gap-x-1 cursor-pointer' onClick={() => dispatch(openModal(true))}>
                <ShoppingCart />
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full pb-5'>
          <div className='container w-full flex flex-col items-center'>
            <div className='mb-3 py-5'>
              <Logo />
            </div>
            <nav>
              <ul className='flex items-center gap-x-5'>
                {MenuItems.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className='uppercase hover:underline text-slate-900' title={item.title}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
