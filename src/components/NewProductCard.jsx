import React from "react";
import { Link } from "react-router-dom";

const NewProductCard = ({ product }) => {
  return (
    <>
      <Link to={`/product/${product?._id}`}>
        <div className="p-4 bg-black antialiased text-gray-300 cursor-pointer">
          <div>
            <img
              src={product?.images[1]?.image_url}
              alt=" random imgee"
              className="hover:-translate-y-4 lg:w-64 w-52 mx-auto object-contain object-center rounded-lg shadow-md transition-all duration-150"
            />

            <div className="relative px-4 -mt-16  ">
              <div className="bg-black mt-4 lg:p-6 p-4 rounded-lg shadow-lg">
                <div className="flex items-baseline">
                  <span className="bg-white text-black text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                    New
                  </span>
                </div>

                <h4 className="mt-1 w-56 text-xl font-semibold uppercase leading-tight truncate">
                  {product?.name}
                </h4>

                <div className="mt-1">${product?.price}</div>
                <div className="mt-4">
                  <span className="text-gray-300 text-md font-semibold"></span>
                  <span className="text-sm text-gray-600">
                    (based on 234 ratings)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NewProductCard;
