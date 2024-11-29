import { Link } from "react-router-dom";
import LogoImage from "@/assets/logo.svg";

export const Logo = () => {
  return (
    <>
      <Link to={"/"}>
        <img src={LogoImage} className='img-fluid w-[100px]' alt='Logo' />
      </Link>
    </>
  );
};
