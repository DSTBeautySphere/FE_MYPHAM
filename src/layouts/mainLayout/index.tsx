import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
