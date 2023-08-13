import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOutsideClick from "../utils/ClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  setCart,
} from "../context/Cart";
import { AiFillCloseSquare } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";
export default function Cart() {
  const [open, setOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const cartRef = useRef(null);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const { authenticated } = useSelector((state) => state.user);

  console.log(products);
  useOutsideClick(cartRef, () => {
    setOpen(!open);
    dispatch(setCart(false));
  });

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));

    return total;
  };
  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
    console.log(quantity);
  };
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity({ id }));
    console.log(quantity);
  };
  const handleRemoveFromCart = (id) => {
    dispatch(deleteFromCart({ id }));
  };

  return (
    <>
      <div
        ref={cartRef}
        className="flex h-screen flex-col justify-between border-e z-40  top-0 right-0 fixed bg-black  text-gray-300 w-1/3"
      >
        <div className="px-4 py-6 space-y-2">
          <AiFillCloseSquare
            className="w-6 h-6 cursor-pointer"
            onClick={() => dispatch(setCart(false))}
          />
          <div className="border-t border-gray-300 m-2 "></div>
          {authenticated ? (
            <>
              {products?.map((product) => (
                <div className="w-full flex border border-black items-center justify-between p-2 relative">
                  <img
                    src={product.image}
                    alt=""
                    className="h-16 w-16 object-cover rounded-lg"
                  />

                  <p className="text-xl tracking-widest font-light">
                    {String(product.title).substring(0, 14)}
                  </p>
                  <section className="flex justify-evenly m-2 space-x-2 text-lg">
                    <p>${product.price * product.quantity}</p>
                    <button
                      onClick={() => handleDecrease(product.id)}
                      className="bg-gray-300 px-2 cursor-pointer text-black"
                    >
                      -
                    </button>
                    <p>{product.quantity}</p>
                    <button
                      onClick={() => handleIncrease(product.id)}
                      className="bg-gray-300 px-2 cursor-pointer text-black"
                    >
                      +
                    </button>
                  </section>
                  <button onClick={() => handleRemoveFromCart(product.id)}>
                    <CiCircleRemove className="h-6 w-6 hover:text-red-500 hover:scale-105 cursor-pointer" />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="flex justify-center items-center h-full tracking-widest font-light text-center">
                You are not logged In!!
              </p>
            </>
          )}
        </div>
        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <div className="p-4 flex items-center justify-between">
            <p className="tracking-widest font-bold">
              Order Total: {totalPrice()}
            </p>
            {products.length > 0 && (
              <Link to={"/checkout"}>
                <button className="bg-black p-4 hover:bg-gray-900 rounded-xl border border-gray-300 text-gray-300 tracking-widest">
                  Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
