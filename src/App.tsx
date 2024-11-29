import { ShoppingCartModal } from "@/components/shoppingCartModal";
import publicRoutes from "@/routes";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {publicRoutes.children.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <publicRoutes.layout>
                <route.component />
              </publicRoutes.layout>
            }
          />
        ))}
      </Routes>
      <ShoppingCartModal />
    </>
  );
}

export default App;
