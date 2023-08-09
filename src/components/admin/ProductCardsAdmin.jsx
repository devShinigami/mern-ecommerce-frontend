import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setDeleteProductId } from "../../context/productSlice";
import { Link } from "react-router-dom";
const ProductCardsAdmin = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <>
      <section className="flex bg-black items-center justify-around border-b-white border-b-2  transition-all duration-150 p-4">
        <img
          className="rounded-lg object-cover  w-12 h-12"
          src={data?.images[1]?.image_url}
          alt="product image"
        />
        <div className="px-5 flex w-1/4">
          <Link to={`/product/${data?._id}`}>
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-gray-300 hover:border-b ">
              {data?.name}
            </h3>
          </Link>
        </div>
        <aside className="w-1/4">
          <p className="text-gray-300">({data?.category})</p>
        </aside>
        <div className="flex items-center justify-between  w-1/4">
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-300">
            {data?.price}
            <span className="text-red-500">$</span>
          </span>
        </div>
        <aside className="w-20">
          <p className="text-gray-300">{data?.stock} in stock</p>
        </aside>
        <AiFillDelete
          onClick={() => {
            dispatch(setDeleteProductId(data?._id));
          }}
          className="h-6 w-6 text-gray-300 hover:text-red-500 cursor-pointer"
        />
      </section>
    </>
  );
};

export default ProductCardsAdmin;
