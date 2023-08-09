import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setUser } from "../context/userSlice";
import handleRequest from "../utils/handleRequest";
import { useCookies } from "react-cookie";
import { setLoading } from "../context/LoadingSlice";
import successAndFailure from "../utils/successAndFail";
import LoginSignupLoading from "../components/LoginSignupLoading";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["token"]);
  const { authenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dp: "",
  });
  const [dpPreview, setDpPreview] = useState();

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dp") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setDpPreview(reader.result);
          setForm({ ...form, dp: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      console.log(form.dp);
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await handleRequest("POST", "/auth/registration", {
        name: form.name,
        password: form.password,
        email: form.email,
        dp: form.dp,
      });
      console.log(response);
      if (response) {
        setCookies("token", response.token);
        const {
          newUser: { name, email, profilePic, _id, role, createdAt },
        } = response;
        dispatch(setUser({ createdAt, name, email, profilePic, role, _id }));
        dispatch(setAuthenticated(true));
        dispatch(setLoading(false));
        successAndFailure(true, response.message);
        navigate("/");
      } else {
        dispatch(setLoading(false));
        successAndFailure(false, response.message);
      }
    } catch (error) {
      successAndFailure(false, "oops! Server Busy! ");
      dispatch(setLoading(false));
      console.log(error);
    }
  };
  const handleShow = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  useEffect(() => {
    const checker = () => {
      if (authenticated) navigate("/");
    };
    checker();
  }, []);

  return (
    <>
      <section className="bg-black h-screen ">
        <div className="p-8 lg:w-1/2 mx-auto ">
          <div className="bg-black/30 rounded-t-lg p-8">
            <p className="text-gray-300 text-2xl font-semibold tracking-widest text-center">
              Welcome
            </p>
          </div>
          <div className="bg-gray-300 rounded-b-lg py-12 px-4 lg:px-24 rounded-xl">
            <form className="mt-6" onSubmit={handleSignup}>
              <div className="relative mt-3 ">
                <input
                  className="file:bg-black file:cursor-pointer file:text-white file:rounded-xl file:p-2 appearance-none pl-12  shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md py-3 text-gray-600 leading-tight focus:outline-none  focus:shadow-outline ml-9"
                  id="avatar"
                  type="file"
                  name="dp"
                  placeholder="Choose an image"
                  title="Choose an image"
                  onChange={(e) => handleChange(e)}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  {form.dp ? (
                    <img
                      className="w-16 h-16 object-cover rounded-full"
                      src={dpPreview}
                      alt="avatar"
                    />
                  ) : (
                    <BiSolidUser className="h-10 w-10 m-4" />
                  )}
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  onChange={(e) => handleChange(e)}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <AiOutlineUserAdd className="h-6 w-6 m-4" />
                </div>{" "}
              </div>{" "}
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                  required
                  name="email"
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <HiOutlineMail className="h-6 w-6 m-4" />
                </div>{" "}
              </div>{" "}
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="username"
                  value={form.password}
                  type={`${show ? "text" : "password"}`}
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <RiLockPasswordFill className="h-6 w-6 m-4" />
                </div>{" "}
                <button
                  onClick={(e) => handleShow(e)}
                  className="absolute right-0 inset-y-0 flex items-center"
                >
                  {show ? (
                    <AiFillEye className="h-6 w-6 m-4" />
                  ) : (
                    <AiFillEyeInvisible className="h-6 w-6 m-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-between mt-2 items-center">
                <p className="mt-4 italic text-gray-500 font-light text-xs">
                  Password strength:
                  <span className="font-bold text-green-400">strong</span>
                </p>
                <p className="text-black cursor-pointer hover:text-gray-400">
                  <Link to={"/auth/login"}>Already a User?</Link>
                </p>
              </div>
              <div className="flex items-center justify-center mt-8">
                {loading ? (
                  <LoginSignupLoading />
                ) : (
                  <button
                    type="sumbit"
                    className="text-white py-2 px-4 uppercase rounded bg-black hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    Sign up !!
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
