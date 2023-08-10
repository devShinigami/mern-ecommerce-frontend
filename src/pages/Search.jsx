import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import NewProductCard from "../components/NewProductCard";
import handleRequest from "../utils/handleRequest";

const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const handleSubmit = async () => {
    const response = await handleRequest("GET", `/products?search=${search} `);

    setProducts(response.products);
  };

  return (
    <section className="min-h-screen bg-black">
      <main className="w-full p-8 flex">
        <input
          className="bg-black border-gray-300 text-gray-300 focus:border-gray-300"
          placeholder="Search..."
          type="text"
          required
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit">
          <AiOutlineSearch className="text-gray-300 hover:text-black hover:bg-gray-300 hover:-translate-y-1 transition-all duration-150 h-10 w-10 border border-gray-300" />
        </button>
      </main>
      <section className="flex flex-wrap">
        {products.map((product) => (
          <NewProductCard product={product} />
        ))}
      </section>
    </section>
  );
};

export default Search;
