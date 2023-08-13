import React, { useRef, useState } from "react";
import {
  useElements,
  useStripe,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import handleRequest from "../utils/handleRequest";
import { useCookies } from "react-cookie";
import successAndFailure from "../utils/successAndFail";
import { useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);
  const { shippingInfo, paymentInfo } = useSelector(
    (state) => state.shippingInfo
  );
  const { user, authenticated } = useSelector((state) => state.user);
  const { order } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.cart);

  const elements = useElements();
  const stripe = useStripe();
  const payBtnRef = useRef(null);
  const navigate = useNavigate();
  const paymentData = {
    amount: Math.round(Number(paymentInfo.totalPrice * 100)),
  };
  const [orderInfo, setOrderInfo] = useState({
    shippingInfo,
    paymentInfo,
    orderItems: products,
    user: user._id,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtnRef.current.disabled = true;
    try {
      const response = await handleRequest(
        "POST",
        "/payment/process",
        paymentData,
        cookies.token
      );
      console.log(response);
      const clientSecret = response.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtnRef.current.disabled = false;
        successAndFailure(false, result.error.message);
        f;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setOrderInfo({
            ...orderInfo,
            paidPaymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
          });
          const response = await handleRequest(
            "POST",
            `/create/order/${user._id}`,
            orderInfo,
            cookies.token
          );
          // console.log(response);
          navigate("/success/payment");
          successAndFailure(true, "Payment was successfull!");
        } else {
          successAndFailure(false, "there was an error");
        }
      }
    } catch (error) {
      payBtnRef.current.disabled = false;
    }
  };

  return (
    <div className="bg-black">
      {authenticated && (
        <>
          <div className="w-1/4 mx-auto min-h-screen flex items-center justify-center px-5 pb-10 pt-16">
            <form
              onSubmit={handleSubmit}
              className="w-full mx-auto rounded-lg shadow-lg bg-white p-5 text-gray-700"
            >
              <div className="w-full pt-1 pb-5">
                <div className="bg-gray-300 text-black tracking-widest overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                  <h1>SHOP</h1>
                </div>
              </div>
              <div className="mb-10">
                <h1 className="text-center font-bold text-xl uppercase ">
                  Secure payment info
                </h1>
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1 text-gray-200">
                  Card number
                </label>
                <div>
                  <CardNumberElement />
                </div>
              </div>
              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-full">
                  <div>
                    <label className="font-bold text-sm mb-2 ml-1 text-gray-200">
                      Expiration date
                    </label>
                    <CardExpiryElement />
                  </div>
                  <label className="font-bold text-sm mb-2 ml-1 text-gray-200">
                    CVC
                  </label>
                  <CardCvcElement />
                </div>
              </div>

              <div className="w-full flex justify-center items-center">
                <button
                  ref={payBtnRef}
                  type="submit"
                  className="bg-black text-gray-300  border border-gray-300 py-2 px-4 hover:-translate-y-2 transition-all mx-auto   duration-150 hover:bg-gray-300 hover:text-black text-lg font-light tracking-widest"
                >
                  PAY NOW- ${paymentInfo && paymentInfo.totalPrice}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmOrder;
