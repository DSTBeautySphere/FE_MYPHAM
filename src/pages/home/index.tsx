import { Banner } from "@/components/banner";
import { Contact } from "@/components/contact";
import Voucher from "@/components/voucher";
import { FeaturedBox } from "@/components/featuredBox";
import ProductList from "@/components/productList";
import RecommenderListID3 from "@/components/recommenderListID3";

export const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedBox />
      <ProductList groupCode={-1} title='Sản phẩm' />
      <Voucher/>
      <RecommenderListID3 groupCode={0} title="Gợi Ý Sản Phẩm" />
      <ProductList groupCode={1} title='Sản phẩm Son thỏi' />
      <ProductList groupCode={3} title='Sản phẩm Phấn mắt ' />
      <ProductList groupCode={5} title='Sản phẩm Kem dưỡng da' />
      
      <Contact />
    </>
  );
};
