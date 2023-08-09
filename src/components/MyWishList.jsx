import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import handleRequest from "../utils/handleRequest";
import { Link } from "react-router-dom";

const MyWishList = ({ userId }) => {
  const [wishList, setWishList] = useState([]);
  const [cookies, _] = useCookies(["token"]);
  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await handleRequest(
          "GET",
          `/wishList/${userId}`,
          {},
          cookies.token
        );
        console.log(response);
        if (response.success) {
          setWishList(response.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishList();
  }, []);
  return (
    <section>
      <p className="text-2xl text-gray-300 font-bold m-4">My Wishlist</p>
      <main>
        {wishList?.length > 0 ? (
          <>
            <section>orders</section>
          </>
        ) : (
          <>
            <p className=" tracking-widest m-4">
              You havent liked any product!
            </p>
            <button className="px-4 py-2 bg-black  m-2 text-gray-300 border border-gray-300 rounded-lg hover:-translate-y-1 transition-all duration-150 ">
              <Link to={"/"}>Lets add some products!!</Link>
            </button>
          </>
        )}
      </main>
    </section>
  );
};

export default MyWishList;
