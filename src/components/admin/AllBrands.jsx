import React, { useEffect } from "react";
import handleRequest from "../../utils/handleRequest";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useState } from "react";
import successAndFailure from "../../utils/successAndFail";
import { ToastContainer } from "react-toastify";
const AllBrands = () => {
  const [cookies, _] = useCookies("token");
  const { user } = useSelector((state) => state.user);
  const [names, setNames] = useState([]);
  useEffect(() => {
    try {
      const fetchBrandsName = async () => {
        const response = await handleRequest(
          "GET",
          "/getBrandsName",
          {},
          cookies.token,
          user.role
        );
        successAndFailure(response.status, response.message);
        setNames(response.brandsName);
        console.log(response);
      };
      fetchBrandsName();
    } catch (error) {
      successAndFailure(error.status, error.message);
    }
  }, []);
  return (
    <div>
      <main className="bg-black text-gray-300">
        {names.map((name) => (
          <aside className="p-4 border-gray-300 border-b-2 max-w-max ">
            <p className="font-bold text-xl text-gray-300">{name}</p>
          </aside>
        ))}
      </main>
      <ToastContainer autoClose={3000} draggable closeOnClick />
    </div>
  );
};

export default AllBrands;
