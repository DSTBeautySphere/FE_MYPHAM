import { Banner } from "@/components/banner";
import { Contact } from "@/components/contact";
import { FeaturedBox } from "@/components/featuredBox";
import ProductList from "@/components/productList";

export const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedBox />
      <ProductList groupCode={1} title='Sản phẩm Son thỏi' />
      <ProductList groupCode={3} title='Sản phẩm Phấn mắt ' />
      <ProductList groupCode={5} title='Sản phẩm Kem dưỡng da' />
      <Contact />
    </>
  );
};
