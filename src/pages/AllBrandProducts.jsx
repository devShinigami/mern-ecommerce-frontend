import React, { useEffect, useState } from "react";
import handleRequest from "../utils/handleRequest";
import { useParams } from "react-router-dom";
import successAndFailure from "../utils/successAndFail";
import { useDispatch } from "react-redux";
import { setLoading } from "../context/LoadingSlice";
import NewProductCard from "../components/NewProductCard";
const AllBrandProducts = () => {
  const params = useParams();
  const [prodcuts, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(setLoading(true));
      const fetchProducts = async () => {
        const response = await handleRequest(
          "GET",
          `/getBrandsDetails/${params.id}`
        );
        setProducts(response.products);
        console.log(response);
        dispatch(setLoading(false));
      };
      fetchProducts();
    } catch (error) {
      dispatch(setLoading(false));
      successAndFailure(false, error.message);
    }
  }, [params.id]);

  return (
    <section className="min-h-screen bg-black">
      <main className="p-8">
        <p className="text-gray-300 text-5xl tracking-widest  text-center">
          By <span className="uppercase">{params.name}</span>
        </p>
        <section className="flex flex-wrap justify-center space-x-4 p-8">
          {prodcuts.map((product) => (
            <NewProductCard product={product} />
          ))}
        </section>
      </main>
    </section>
  );
};

export default AllBrandProducts;
