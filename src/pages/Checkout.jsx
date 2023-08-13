import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { setPaymentInfo, setShippingInfo } from "../context/ShippingInfoSlice";
import successAndFailure from "../utils/successAndFail";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.shippingInfo);
  const dispatch = useDispatch();
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    address: shippingInfo.address,
    city: shippingInfo.city,
    pinCode: shippingInfo.pinCode,
    phoneNumber: shippingInfo.phoneNumber,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInfo({ ...info, [name]: value });
  };

  let subtotal = 0;
  products.forEach((item) => {
    Number((subtotal += item.price * item.quantity));
  });

  const shippingCharges = Number(
    Math.floor(subtotal > 1000 ? 0 : subtotal * 0.1)
  );

  const tax = Number(subtotal * 0.11).toFixed(2);
  const totalPrice = (
    Number(tax) +
    Number(subtotal) +
    Number(shippingCharges)
  ).toFixed(2);

  const submitShippingInfo = (e) => {
    e.preventDefault();
    dispatch(setShippingInfo({ ...info, country, state }));
    dispatch(setPaymentInfo({ tax, shippingCharges, totalPrice, subtotal }));
    successAndFailure(true, "Submit Successfully!");
    navigate("/confirm/order");
  };

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto bg-black text-gray-300">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <aside>
            <p className="text-light leading-normal sm:leading-4">
              Home {">"} Cart {">"} <span className="font-bold">Checkout</span>
            </p>
          </aside>
          <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5">
            {user.name}'s Cart
          </p>

          {products.map((product) => (
            <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                <div className="pb-4 md:pb-8 w-full md:w-40">
                  <img
                    className="w-full hidden md:block"
                    src={product.image}
                    alt="dress"
                  />
                </div>
                <div className="border-b  md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                  <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 ">
                      {product.title}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-2">
                      {product.description}
                    </div>
                  </div>
                  <div className="flex justify-between space-x-8 items-start w-full">
                    <p className="text-base xl:text-lg leading-6">
                      ${product.price}
                    </p>
                    <p className="text-base xl:text-lg leading-6">
                      x{product.quantity}
                    </p>
                    <p className="text-base xl:text-lg font-semibold leading-6">
                      ${product.quantity * product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full  space-y-6   ">
              <h3 className="text-xl font-light tracking-widest leading-5">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between  w-full">
                  <p className="text-base leading-4 ">Subtotal</p>
                  <p className="text-base leading-4 ">${subtotal}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 ">Tax</p>
                  <p className="text-base leading-4 ">${tax}</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base leading-4 ">Shipping</p>
                  <p className="text-base leading-4 ">${shippingCharges}</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-semibold leading-4 ">Total</p>
                <p className="text-base font-semibold leading-4 ">
                  ${totalPrice}
                </p>
              </div>
            </div>
            <div className="flex bg-black text-gray-300  flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full space-y-6   ">
              <h3 className="text-xl tracking-widest font-light leading-5 ">
                Customer Details
              </h3>
              <div className="flex justify-between items-start w-full">
                <div className="flex justify-center items-center space-x-4">
                  <div class="w-8 h-8">
                    <img
                      class="w-full h-full"
                      alt="logo"
                      src={user.profilePic}
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center">
                    <p className="text-sm leading-6 font-semibold ">
                      {user.email}
                      <br />
                      <span className="font-normal">{user.name}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="bg-black mx-8 text-gray-300  border border-gray-300 py-2 px-4 hover:-translate-y-2 transition-all duration-150 hover:bg-gray-300 hover:text-black text-lg font-light tracking-widest">
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={submitShippingInfo}
          className="p-8 bg-black  flex flex-col h-1/2 lg:w-full xl:w-3/5"
        >
          <section>
            <p className="tracking-widest text-lg font-light">
              Enter your Details
            </p>
          </section>
          <label className="text-md mt-8 gap-2 leading-4 flex items-center">
            <BiWorld />
            Select Country
          </label>
          <div className="mt-2 flex-col">
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="text-left border rounded-tr rounded-tl p-4 w-full text-base leading-4 text-gray-300 bg-black"
                type="email"
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {country && (
            <>
              <label className="mt-8 text-base leading-4">Select State</label>
              <div className="mt-2 flex-col">
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="text-left border rounded-tr rounded-tl p-4 w-full text-base leading-4 text-gray-300 bg-black"
                    type="email"
                  >
                    <option value="">State</option>
                    {State.getStatesOfCountry(country).map((item) => (
                      <option value={item.name} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
          {state && (
            <div className="mt-8">
              <label className="mt-8 text-base leading-4">City</label>

              <input
                className="p-4 rounded w-full text-base leading-4 bg-black"
                type="text"
                value={info.city}
                onChange={(e) => handleChange(e)}
                placeholder="City"
                name="city"
              />
            </div>
          )}
          <div className="mt-8">
            <label className="mt-8 text-base leading-4">Pin Code</label>

            <input
              className="p-4 rounded w-full text-base leading-4 bg-black"
              type="text"
              value={info.pinCode}
              onChange={(e) => handleChange(e)}
              placeholder="Pin Code"
              name="pinCode"
            />
          </div>
          <div className="mt-8">
            <label className="text-md gap-2 leading-4 flex items-center">
              <AiOutlineHome />
              Address
            </label>

            <textarea
              className="p-4 rounded w-full text-base leading-4 bg-black"
              type="text"
              value={info.address}
              onChange={(e) => handleChange(e)}
              name="address"
              placeholder="Address"
            />
          </div>

          <div className="mt-8">
            <label className="text-md gap-2 leading-4 flex items-center">
              <BsTelephone />
              Phone Number
            </label>

            <input
              className=" p-4 rounded w-full text-base leading-4 bg-black"
              type="number"
              value={info.phoneNumber}
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            className="bg-black text-gray-300  border border-gray-300 py-2 px-4 hover:-translate-y-2 transition-all duration-150 hover:bg-gray-300 hover:text-black text-lg font-light mt-4 tracking-widest"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
