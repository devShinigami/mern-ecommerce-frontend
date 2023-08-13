import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import handleRequest from "../utils/handleRequest";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../context/LoadingSlice";
import Loading from "../components/Loading";
import { HiOutlineMinus, HiPlus, HiStar } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Navbar from "../components/Navbar";
import ReviewCard from "../components/ReviewCard";
import MetaData from "../utils/metaData";
import Cart from "../components/Cart";
import EditProduct from "../components/admin/EditProduct";
import { useCookies } from "react-cookie";
import successAndFailure from "../utils/successAndFail";
import { addToCart } from "../context/Cart";
export default function ProductDetails() {
  const { cart, products } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.loading);
  const { user } = useSelector((state) => state.user);

  const params = useParams();
  const dispatch = useDispatch();
  const [openSpec, setOpenSpec] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openAvail, setOpenAvail] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [image, setImage] = useState("");
  const [like, setLike] = useState(false);
  const [likedByUser, setLikedByUser] = useState([]);
  const [selected, setSelected] = useState(0);
  const [product, setProduct] = useState({});
  const [brandsName, setBrandsName] = useState([]);
  const [cookies, setCookies] = useCookies(["token"]);
  const [alreadyInBag, setAlreadyInBag] = useState(false);
  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(setLoading(true));
      const details = await handleRequest("GET", `/oneProduct/${params.id}`);
      setLikedByUser(details?.product?.liked);
      setProduct(details?.product);
      setImage(details?.product?.images[0]?.image_url);

      dispatch(setLoading(false));
    };
    fetchDetails();
  }, [params]);

  useEffect(() => {
    if (likedByUser.length > 0 && likedByUser.includes(user._id)) {
      setLike(true);
    }
  }, [likedByUser]);

  const handleChange = (index, item) => {
    setSelected(index);
    setImage(item.image_url);
  };

  useEffect(() => {
    if (edit) {
      const getAllBrandsNames = async () => {
        dispatch(setLoading(true));
        const response = await handleRequest(
          "GET",
          "/getBrandsName",
          {},
          cookies.token,
          user.role
        );
        if (response) {
          setBrandsName(response.brandsName);
          dispatch(setLoading(false));
        }
      };
      getAllBrandsNames();
    }
  }, [edit]);

  const handleAddToWishList = async () => {
    try {
      setLike(true);
      const response = await handleRequest(
        "PUT",
        `/addToWishList/${user._id}`,
        {
          productId: product._id,
        },
        cookies.token
      );
      successAndFailure(true, response.message);
    } catch (error) {
      successAndFailure(false, error.message || "failed to add");
    }
  };

  const handleRemoveFromWishList = async () => {
    try {
      setLike(false);
      const response = await handleRequest(
        "PUT",
        `/removeFromWishList/${user._id}`,
        {
          productId: product._id,
        },
        cookies.token
      );
      successAndFailure(true, response.message);
    } catch (error) {
      successAndFailure(false, error.message || "failed to remove");
    }
  };

  const handleAddToBag = () => {
    dispatch(
      addToCart({
        id: product._id,
        title: product.name,
        price: product.price,
        description: product.description,
        image: product.images[0].image_url,
        quantity: 1,
        brand: product.category,
      })
    );
    successAndFailure(true, "Added to bag successfully!");
  };

  useEffect(() => {
    const checkAlreadyInBag = () => {
      const item = products.find((item) => item.id === product._id);
      if (item) {
        setAlreadyInBag(true);
      }
    };
    checkAlreadyInBag();
  }, [products]);

  return (
    <>
      {cart && <Cart />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="bg-black select-none">
            {user?._id === product.user && (
              <button
                onClick={() => setEdit((prev) => !prev)}
                className="bg-black mx-8 text-gray-300  border border-gray-300 py-2 px-4 hover:-translate-y-2 transition-all duration-150 hover:bg-gray-300 hover:text-black text-lg font-light tracking-widest"
              >
                {edit ? "Back" : "Edit"}
              </button>
            )}
            <MetaData title={`${product.name} --- Shop `} />
            {edit && <EditProduct brandsName={brandsName} product={product} />}
            {!edit && (
              <main className="min-h-screen px-8 lg:flex bg-black text-gray-300">
                <section className="lg:min-h-full  lg:w-2/3 lg:pt-4">
                  <div className="object-cover ">
                    <img src={image} className="  " />
                  </div>
                  <aside className="flex lg:mx-auto scrollbar-hide overflow-auto  m-2 p-4">
                    {product?.images?.map((item, indx) => (
                      <img
                        src={item.image_url}
                        alt="img"
                        key={indx}
                        className={`w-32 h-32 cursor-pointer m-1 p-1 object-cover ${
                          selected === indx
                            ? "border-2 rounded-lg border-gray-300 "
                            : ""
                        }  `}
                        onClick={(e) => handleChange(indx, item)}
                      />
                    ))}
                  </aside>
                </section>
                <figure className="w-full mt-8 px-4">
                  <aside className="space-y-3">
                    <h1 className="text-3xl tracking-wider font-bold">
                      {product.name}
                    </h1>
                    <p className="text-2xl">${product.price}</p>
                    <div className="w-14 h-14">
                      <HiStar className="h-6 w-6" />
                    </div>
                  </aside>
                  <div className="flex items-center my-4">
                    {!alreadyInBag ? (
                      <button
                        onClick={handleAddToBag}
                        className="py-4 px-8 bg-black text-gray-300 border border-gray-300 rounded-lg mr-4 hover:-translate-y-2 duration-150 transition-all"
                      >
                        Add to Bag
                      </button>
                    ) : (
                      <>
                        <p className="text-gray-200">Already Added to Bag!</p>
                      </>
                    )}

                    {like ? (
                      <>
                        <AiFillHeart
                          className="w-10 h-10 cursor-pointer"
                          onClick={() => handleRemoveFromWishList()}
                        />
                        <p className="font-light tracking-widest text-gray-300">
                          Remove from WISHLIST
                        </p>
                      </>
                    ) : (
                      <>
                        <AiOutlineHeart
                          className="w-10 h-10 cursor-pointer"
                          onClick={() => handleAddToWishList()}
                        />
                        <p className="font-medium text-gray-300">
                          Add to wishlist
                        </p>
                      </>
                    )}
                  </div>
                  <br />
                  <aside className="space-y-2 text-gray-300">
                    <figure
                      onClick={() => setOpenSpec((prev) => !prev)}
                      className="bg-black rounded-lg w-full flex p-4 justify-between items-center hover:bg-gray-800 cursor-pointer "
                    >
                      <p className="text-lg font-semibold">Specifications </p>
                      {openSpec ? <HiOutlineMinus /> : <HiPlus />}
                    </figure>
                    {openSpec && (
                      <article className="bg-black tracking-wider text-lg p-4 rounded-lg">
                        {product.description}
                      </article>
                    )}
                    <figure
                      onClick={() => setOpenAvail((prev) => !prev)}
                      className="bg-black rounded-lg w-full flex p-4 justify-between items-center hover:bg-gray-800 cursor-pointer"
                    >
                      {product.stock === 0 ? (
                        <p className="text-lg font-semibold line-through">
                          Availability
                        </p>
                      ) : (
                        <p className="text-lg font-semibold ">Availability</p>
                      )}
                      {openAvail ? <HiOutlineMinus /> : <HiPlus />}
                    </figure>
                    {openAvail && (
                      <article className="bg-black tracking-wider text-lg p-4 rounded-lg ">
                        {product.stock <= 5 && product.stock > 1
                          ? `only ${product.stock} items are left buy yours now!!`
                          : ` ${product.stock} items are left!`}
                      </article>
                    )}
                    <figure className="bg-black text-lg font-semibold rounded-lg w-full flex p-4 justify-between items-center">
                      <p>Delivery</p>
                      <HiPlus />
                    </figure>
                    <figure
                      onClick={() => setOpenReview((prev) => !prev)}
                      className="bg-black rounded-lg w-full flex p-4 justify-between items-center hover:bg-gray-800 cursor-pointer"
                    >
                      <p className="text-lg font-semibold">
                        Reviews ({product.numberOfReviews})
                      </p>
                      {openReview ? <HiOutlineMinus /> : <HiPlus />}
                    </figure>
                    {product.numberOfReviews > 0 ? (
                      <figure>
                        {product.reviews &&
                          openReview &&
                          product.reviews.map((review, indx) => (
                            <ReviewCard review={review} key={indx} />
                          ))}
                      </figure>
                    ) : (
                      <>
                        {openReview && (
                          <section className="bg-black text-center rounded-lg p-4">
                            <p>No Reviews yet!!</p>
                          </section>
                        )}
                      </>
                    )}
                  </aside>
                </figure>
              </main>
            )}
          </section>
        </>
      )}
    </>
  );
}
