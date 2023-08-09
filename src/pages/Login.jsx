import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated, setUser } from "../context/userSlice";
import handleRequest from "../utils/handleRequest";
import { useCookies } from "react-cookie";
import { setLoading } from "../context/LoadingSlice";
import successAndFailure from "../utils/successAndFail";
import LoginSignupLoading from "../components/LoginSignupLoading";

const Login = () => {
  const [cookies, setCookies] = useCookies(["token"]);

  const { authenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await handleRequest("POST", "/auth/login", {
        password: form.password,
        email: form.email,
      });
      console.log(response);

      if (response?.token && response.user._id) {
        setCookies("token", response.token);
        console.log(cookies.token);
        const {
          user: { name, email, profilePic, _id, role, createdAt },
        } = response;
        dispatch(setUser({ name, email, profilePic, role, _id, createdAt }));
        console.log(_id);
        dispatch(setAuthenticated(true));
        successAndFailure(true, response.message);
        setTimeout(() => {
          dispatch(setLoading(false));
          navigate("/");
        }, 3000);
      } else {
        dispatch(setLoading(false));
        successAndFailure(false, response.message);
      }
    } catch (error) {
      successAndFailure(false, "oops! internal server error!");
    }
  };

  const handleShow = (e) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const checker = () => {
      if (authenticated) navigate("/");
    };
    checker();
  }, []);

  return (
    <>
      <section className="bg-black h-screen">
        <div className="p-8 lg:w-1/2 mx-auto">
          <div className="bg-black/30 rounded-t-lg p-8">
            <p className="text-gray-300 text-2xl font-semibold tracking-widest text-center">
              Welcome Back!
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl py-12 px-4 lg:px-24">
            <form className="mt-6" onSubmit={handleLogin}>
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
                  type="button"
                  className="absolute right-0 inset-y-0 flex items-center"
                >
                  {show ? (
                    <AiFillEye className="h-6 w-6 m-4" />
                  ) : (
                    <AiFillEyeInvisible className="h-6 w-6 m-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-black-500 cursor-pointer hover:text-gray-400">
                  <Link to={"/auth/signup"}>New User?</Link>
                </p>
                <p className="text-black-500 cursor-pointer hover:text-gray-400">
                  forgot password?
                </p>
              </div>
              <div className="flex items-center justify-center mt-8">
                {loading ? (
                  <LoginSignupLoading />
                ) : (
                  <button
                    type="submit"
                    className="text-gray-300 py-2 px-4 uppercase rounded bg-black hover:bg-black shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
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

export default Login;
