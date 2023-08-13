import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { Link } from "react-router-dom";
import successAndFailure from "../utils/successAndFail";
import handleRequest from "../utils/handleRequest";
const WishlishCard = ({ product, cookies, user, setWishList, wishList }) => {
  const handleRemoveFromWishList = async () => {
    try {
      const response = await handleRequest(
        "PUT",
        `/removeFromWishList/${user}`,
        {
          productId: product._id,
        },
        cookies.token
      );
      const filter = await wishList.filter(
        (item) => item._id.toString() !== product._id.toString()
      );
      await setWishList(filter);
      successAndFailure(true, response.message);
    } catch (error) {
      successAndFailure(false, "failed to remove");
    }
  };

  return (
    <main className="">
      <section className="bg-black border-gray-300 bg-opacity-95 border-opacity-60 | p-4 border-solid rounded-3xl border-2 | flex justify-between cursor-pointer | hover:bg-gray-300 hover:text-black hover:border-transparent | transition-colors duration-500 items-center space-x-4">
        <img
          className="w-16 h-16 object-cover rounded-xl"
          src={product.images[0].image_url}
          alt=""
        />
        <Link to={`/product/${product._id}`}>
          <div className="flex flex-col justify-center ">
            <p className="font-semibold hover:border-b border-black">
              {product.name}
            </p>
            <p>Remaining Items: {product.stock}</p>
          </div>
        </Link>
        <p className="text-justify font-semibold">${product.price}</p>
        <CiCircleRemove
          onClick={handleRemoveFromWishList}
          className="w-8 h-8 hover:text-red-500 "
        />
      </section>
    </main>
  );
};

export default WishlishCard;
