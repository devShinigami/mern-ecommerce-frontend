import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useOutsideClick from "../utils/ClickOutside";
import { useDispatch } from "react-redux";
import { setCart } from "../context/Cart";
import { BiCart, BiCross } from "react-icons/bi";
import { AiFillCloseSquare } from "react-icons/ai";
export default function Cart() {
  const [open, setOpen] = useState(true);
  const cartRef = useRef(null);
  const dispatch = useDispatch();

  useOutsideClick(cartRef, () => {
    setOpen(!open);
    dispatch(setCart(false));
  });

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

          <div className="w-full flex border border-black items-center justify-between p-2">
            <img
              src="https://i5.walmartimages.com/asr/d9cf072d-e243-451e-8a52-5087c2d88aae.0be1996d6850418ca27636d2393bb5d4.jpeg"
              alt=""
              className="h-16 w-16 object-cover rounded-lg"
            />

            <p className="text-xl">{String("Headphones").substring(0, 14)}</p>
            <section className="flex justify-evenly m-2 space-x-2 text-lg">
              <p>123$</p>
              <button className="bg-black px-2 cursor-pointer text-gray-300">
                -
              </button>
              <p>1</p>
              <button className="bg-black px-2 cursor-pointer text-gray-300">
                +
              </button>
            </section>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <div className="p-4 flex items-center justify-center">
            <button className="bg-black p-4 hover:bg-gray-900 rounded-xl border border-gray-300 text-gray-300">
              <Link to={"/checkout"}>Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
