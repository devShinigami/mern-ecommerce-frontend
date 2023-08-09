import React, { useEffect, useRef, useState } from "react";
import ProductCardsAdmin from "./ProductCardsAdmin";
import { MdOutlineAttachMoney } from "react-icons/md";
import handleRequest from "../../utils/handleRequest";
import Loading from "../Loading";
import InfinteScroll from "react-infinite-scroll-component";
import AdminLoading from "./AdminLoading";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import CreateProduct from "./CreateProduct";
const ProductsManipulations = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { deleteProductId } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const [create, setCreate] = useState(false);
  const [cookies, setCookies] = useCookies(["token"]);

  const fetchAllProducts = () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await handleRequest("GET", `/products?page=${page}`);
      if (response) {
        const { success, products, filteredProductsCount, resultPerPage } =
          response;
        if (products.length === 0) {
          setHasMore(false);
        } else {
          setNewProducts([...newProducts, ...products]);
          setPage(page + 1);
          setLoading(false);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  useEffect(() => {
    const deleteProduct = async () => {
      const response = await handleRequest(
        "DELETE",
        `/deleteProduct/${deleteProductId}`,
        {},
        cookies.token,
        user.role
      );
      const dleted = newProducts.filter(
        (product) => product._id.toString() !== deleteProductId.toString()
      );
      setNewProducts(dleted);
    };
    deleteProduct();
  }, [deleteProductId]);

  // const handleSearch = (e) => {
  //   setKeyword(search);
  // };
  return (
    <>
      <div>
        <section className="bg-black text-gray-300 mx-auto flex  items-center">
          <p
            onClick={() => {
              setCreate((prev) => !prev);
            }}
            className="tracking-widest font-semibold w-1/5 mx-auto p-4 text-center border-gray-300 border-b  hover:scale-110 hover:text-gray-600 cursor-pointer transition-all duration-150"
          >
            Create a new Product
          </p>
        </section>
        <section className="bg-black flex text-white pt-8">
          <p className="w-1/3 text-center ">Name</p>
          <section className="flex  justify-start w-1/3 ml-8">
            <p>Brand/Category</p>
          </section>
          <section className="w-1/3">
            <MdOutlineAttachMoney className="text-white h-6 w-6" />
          </section>
        </section>
        {!create && (
          <InfinteScroll
            dataLength={newProducts.length}
            hasMore={hasMore}
            next={fetchAllProducts}
            loader={
              <div className="bg-black w-full h-20 p-6">
                <AdminLoading />
              </div>
            }
            endMessage={
              <div className="bg-black w-full h-20 p-6">
                <h1 className="text-gray-300 text-center text-xl font-bold tracking-widest">
                  You have seen all!
                </h1>
              </div>
            }
          >
            {newProducts?.map((product) => (
              <>
                <ProductCardsAdmin data={product} />
              </>
            ))}
          </InfinteScroll>
        )}
      </div>
      {create && <CreateProduct />}
    </>
  );
};

export default ProductsManipulations;
