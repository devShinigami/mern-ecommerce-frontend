import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import handleRequest from "../utils/handleRequest";

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [cookies, _] = useCookies(["token"]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await handleRequest(
          "GET",
          `/myOrders/${userId}`,
          {},
          cookies.token
        );
        console.log(response);
        if (response.success) {
          setOrders(response.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <section>
      <p className="text-2xl text-gray-300 font-bold m-4">My orders</p>
      <main>
        {orders.length > 0 ? (
          <>
            <section>orders</section>
          </>
        ) : (
          <>
            <p className=" tracking-widest m-4">
              You havent placed any order yet!!
            </p>
          </>
        )}
      </main>
    </section>
  );
};

export default MyOrders;
