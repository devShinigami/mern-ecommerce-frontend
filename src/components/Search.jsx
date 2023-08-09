import React, { useEffect, useState } from "react";
import handleRequest from "../utils/handleRequest";
import { useDispatch } from "react-redux";
import { setSearch } from "../context/productSlice";
const Search = ({ keyword }) => {
  const [name, setName] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProductsName = async () => {
      const response = await handleRequest(
        "GET",
        `/products?keyword=${keyword}`
      );
      let allNames = [];
      await response.products.forEach((product) => [
        allNames.push(product.name),
      ]);
      setName(allNames);
    };

    getAllProductsName();
  }, [keyword]);

  return (
    <>
      {name && keyword && (
        <figure className="w-full bg-white z-40 absolute">
          {name.map((search) => (
            <p
              onClick={() => dispatch(setSearch(search))}
              className="m-2 p-1 rounded-lg text-bold uppercase bg-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              {search}
            </p>
          ))}
        </figure>
      )}
    </>
  );
};

export default Search;
