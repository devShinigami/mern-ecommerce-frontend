import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import MetaData from "../utils/metaData";
import { useDispatch, useSelector } from "react-redux";
import { ParallaxProvider } from "react-scroll-parallax";
import ParallaxEffect from "../components/ParallaxEffect";
import NewProductList from "../components/NewProductList";
import { useCookies } from "react-cookie";
import successAndFailure from "../utils/successAndFail";
import { ToastContainer, toast } from "react-toastify";
import { setAuthenticated, setUser } from "../context/userSlice";
import CategoriesGrid from "../components/CategoriesGrid";
const Home = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [cookies, setCookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  useEffect(() => {
    const checker = () => {
      if (!cookies.token) {
        successAndFailure(
          false,
          "login to purshase or to add to bag products!!"
        );
        dispatch(setUser(null));
        dispatch(setAuthenticated(false));
      }
    };
    checker();
  }, []);
  console.log(cookies.token);
  return (
    <>
      <section className="bg-black min-h-screen lg:h-auto">
        <ParallaxProvider>
          <MetaData title={"Home"} />
          <section className="hidden lg:flex">
            <ParallaxEffect />
          </section>
          {cart && <Cart />}
          <NewProductList />
          <CategoriesGrid />
          <ProductList />
        </ParallaxProvider>
      </section>
    </>
  );
};

export default Home;
