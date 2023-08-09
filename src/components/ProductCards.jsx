import { StarIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const ProductCards = () => {
  const { products } = useSelector((state) => state.products);

  return (
    <>
      <section className=" bg-[#E8E9ED] mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 lg:min-h-screen">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              <Link to={`/product/${product._id}`}>
                <div key={product._id + Date.now()} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-[#E8E9ED] lg:aspect-none group-hover:opacity-75 lg:h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.imageAlt}
                      className="h-80 w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700 line-clamp-1">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 "
                        />
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <StarIcon fill="1" className="h-4 w-4 " />
                        <p className="text-sm font-md text-gray-500">
                          {product.ratings} ({product.numberOfReviews})
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default ProductCards;
