import { useDispatch, useSelector } from "react-redux";
import MetaData from "../utils/metaData";
import { Link } from "react-router-dom";
import MyOrders from "../components/MyOrders";
import MyWishList from "../components/MyWishList";
import Cart from "../components/Cart";
import { AiFillMail, AiFillMessage } from "react-icons/ai";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import handleRequest from "../utils/handleRequest";
import { setUser } from "../context/userSlice";
const UserProfile = () => {
  const { user, authenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.loading);

  const [cookies, setCookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authenticated) {
      const fetchDetails = async () => {
        const response = await handleRequest(
          "GET",
          `/userdetails/${user._id}`,
          {},
          cookies.token
        );
        if (response) {
          const { name, profilePic, email, role, _id, createdAt } =
            response.user;
          dispatch(setUser({ name, profilePic, email, role, _id, createdAt }));
        }
      };
      fetchDetails();
    }
  }, []);
  return (
    <>
      {cart && <Cart />}
      {!loading && authenticated ? (
        <section className="pt-6 bg-black text-gray-300 font-medium items-center justify-center h-screen scrollbar-track-slate-950 scrollbar overflow-auto">
          <section className="max-w-7xl mx-auto bg-black rounded-2xl px-4 py-6 shadow-lg">
            <MetaData title={user.name} />
            <div className="flex items-center justify-between">
              <p className="text-gray-300">{user.email}</p>
            </div>
            <main className="flex items-center space-x-4 justify-between">
              <aside className="flex items-center space-x-4 ">
                <div className="mt-6 ">
                  <img
                    src={user.profilePic.url}
                    className="rounded-full object-cover w-28 h-28 "
                    alt="profile picture"
                  />
                </div>
                <div className="mt-8 ">
                  <h2 className=" font-bold text-2xl tracking-wide text-gray-300">
                    {user.name}
                  </h2>
                  <span>({user.role})</span>
                </div>
              </aside>
              <aside className="space-y-4">
                <p className="text-6xl font-bold">SHOP.</p>
                <p>
                  You can also Start a bussiness with us for more inquiry
                  <span className="text-gray-300"> contact us</span>.
                </p>
                <Link to={"/EmailforBecomingAnAdmin"}>
                  <button className="px-4 py-2 hover:-translate-y-1 transition-all duration-150 bg-black m-2 text-gray-300 rounded-lg ">
                    <AiFillMessage className="w-6 h-6" />
                  </button>
                </Link>
              </aside>
            </main>
            <p className="text-gray-300 font-semibold mt-2.5">
              you joined Shop on {String(user.createdAt).substring(0, 10)}
            </p>

            <div className="h-1 w-1/2 bg-gray-300 mt-8 rounded-full"></div>
            <MyOrders userId={user._id} />
            <div className="h-1 w-1/2 bg-gray-300 mt-8 rounded-full"></div>
            <MyWishList userId={user._id} />
          </section>
        </section>
      ) : (
        <>
          <main className="bg-black min-h-screen flex items-center justify-center">
            <p className="tracking-widest text-xl text-gray-300">
              Login To buy or add to wishlist!
            </p>
          </main>
        </>
      )}
    </>
  );
};

export default UserProfile;
