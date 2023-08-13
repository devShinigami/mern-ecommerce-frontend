import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/productDetails";
import UserProfile from "./pages/Userprofile";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import MyDashBoard from "./pages/MyDashBoard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AllBrandProducts from "./pages/AllBrandProducts";
import Search from "./pages/Search";
import ConfirmOrder from "./pages/ConfirmOrder";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import handleRequest from "./utils/handleRequest";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookies] = useCookies(["token"]);
  const location = useLocation();
  const showNavbar = ["/auth/login", "/auth/signup"].includes(
    location.pathname
  );
  const [stripeKey, setStripeKey] = useState("");
  useEffect(() => {
    const getApiKey = async () => {
      const response = await handleRequest(
        "GET",
        "/stripeApiKey",
        {},
        cookies.token
      );

      setStripeKey(response.stripeApiKey);
    };
    console.log(stripeKey);
    getApiKey();
  }, []);

  return (
    <>
      {!showNavbar && <Navbar />}
      <Routes>
        <Route path="/auth/login" Component={Login} />
        <Route path="/auth/signup" Component={Signup} />
        <Route path="/" Component={Home} />
        <Route path="/checkout" Component={Checkout} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route path="/account/user" Component={UserProfile} />
        <Route path="/account/user/dashboard" Component={MyDashBoard} />
        <Route path="/EmailforBecomingAnAdmin" Component={ContactUs} />
        <Route path="/searchproducts" Component={Search} />

        {stripeKey && (
          <Route
            path="/confirm/order"
            element={
              <Elements stripe={loadStripe(stripeKey)}>
                <ConfirmOrder />
              </Elements>
            }
          />
        )}
        <Route path="/allproducts/:name/:id" Component={AllBrandProducts} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </>
  );
}

export default App;
