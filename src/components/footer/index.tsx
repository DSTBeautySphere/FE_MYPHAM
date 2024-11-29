import { Logo } from "@/components/logo";
import { MenuItems } from "@/data/menu";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className='m-4 bg-white rounded-lg shadow dark:bg-gray-900'>
        <div className='container py-5 mx-auto'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <Logo />
            <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
              {MenuItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className='hover:underline me-4 md:me-6'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
          <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2024{" "}
            <a href='https://flowbite.com/' className='hover:underline'>
              Shop Mỹ Phẩm™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};
