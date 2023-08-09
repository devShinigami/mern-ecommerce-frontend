import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setUser } from "../context/userSlice";
import { setCart } from "../context/Cart";

import handleRequest from "../utils/handleRequest";
import { HiMenu } from "react-icons/hi";
import { useCookies } from "react-cookie";
import { AiOutlineArrowRight, AiOutlineLogout } from "react-icons/ai";
import { BiCart } from "react-icons/bi";
import successAndFailure from "../utils/successAndFail";
export default function Navbar() {
  const { user, authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(5);
  const location = useLocation();
  const [cookies, setCookies] = useCookies(["token"]);
  const handleLogout = async () => {
    try {
      const response = await handleRequest("GET", "/auth/logout");
      setCookies("token", "");
      dispatch(setAuthenticated(false));
      dispatch(setUser(null));
      successAndFailure(false, response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const navOptions = [
    {
      name: "My Profile",
      to: "/account/user",
      func: () => {},
    },

    {
      name: "Contact us",
      to: "/EmailforBecomingAnAdmin",
      func: () => {},
    },
    {
      name: (
        <span>
          <BiCart className="w-8 h-8" />
        </span>
      ),
      func: () => {
        dispatch(setCart(true));
      },
    },
  ];

  if (user) {
    if (user.role === "admin") {
      navOptions.unshift({
        name: "DashBoard",
        to: "/account/user/dashboard",
        func: () => {},
      });
    }
  }

  const handleChange = (index) => {
    setSelected(index);
  };
  const path = location.pathname;
  const paramsPath = location.pathname.split("/");
  const filterPath = paramsPath.filter((param) => param === "product");
  useEffect(() => {
    if (path === "/") {
      setSelected(null);
    }
    if (path === "/EmailforBecomingAnAdmin") {
      setSelected(2);
    }
    if (path === "/account/user") {
      setSelected(1);
    }
    if (filterPath.includes("dashboard")) {
      setSelected(0);
    }
  }, [location.pathname, filterPath]);
  console.log(cookies.token);

  return (
    <>
      <header className="bg-black text-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link to={"/"}>
                <p className="font-bold tracking-widest text-3xl cursor-pointer">
                  Shop.
                </p>
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  {navOptions.map((option, indx) => (
                    <li
                      className={`${
                        selected === indx
                          ? "border-b-2 border-white font-bold "
                          : "hover:-translate-y-1 transition-all  duration-150"
                      }`}
                      onClick={() => {
                        handleChange(indx);
                        option.func();
                      }}
                      key={indx}
                    >
                      <Link to={option.to}>{option.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="hidden sm:gap-4  md:flex">
                  {authenticated ? (
                    <>
                      <aside className="flex space-x-2 items-center">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={user.profilePic.url}
                          alt=""
                        />
                        <p className="font-medium text-gray-300 tracking-widest">
                          {user.name}
                        </p>
                      </aside>
                      <button
                        onClick={handleLogout}
                        className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-gray-300 shadow flex items-center space-x-2 hover:-translate-y-1 transition-all  duration-150"
                      >
                        <span>
                          <AiOutlineLogout className="w-6 h-6" />
                        </span>
                        Logout
                      </button>
                    </>
                  ) : (
                    <button className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white shadow flex items-center space-x-2 hover:-translate-y-1 transition-all  duration-150">
                      <Link to={"/auth/login"}>Login</Link>
                      <span>
                        <AiOutlineArrowRight />
                      </span>
                    </button>
                  )}
                </div>

                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <HiMenu />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
