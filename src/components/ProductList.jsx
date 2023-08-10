import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import handleRequest from "../utils/handleRequest";
import { setLoading } from "../context/LoadingSlice";
import NewProductCard from "./NewProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
const ProductList = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [filteredCategory, setFilteredCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const [selected, setSelected] = useState({
    rating: null,
    category: null,
  });

  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await handleRequest(
        "GET",
        `/products?page=${page}&category=${category}&sort=${sort}`
      );
      if (response) {
        setProducts(response.products);
        setFilteredCategory([...response.categories, "All"]);
        dispatch(setLoading(false));
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [keyword, category, sort]);

  useEffect(() => {
    window.localStorage.setItem("page", page);
  }, [page]);
  useEffect(() => {
    setPage(JSON.parse(window.localStorage.getItem("page")));
  }, []);

  const handleSelected = (option, indx) => {
    setCategory(option);
    setSelected({ ...selected, category: indx });
  };
  const handleSort = (option, indx) => {
    setSort(option);
    setSelected({ ...selected, rating: indx });
    console.log(sort);
  };
  return (
    <>
      <section className=" bg-black">
        <p className="text-5xl text-center font-light tracking-widest m-8 text-gray-300">
          Browse all the products!
        </p>
        <main className="lg:flex w-full px-8">
          <aside className="w-1/6 lg:min-h-screen">
            <section className="text-gray-300">
              <p className="uppercase font-bold text-xl">categories</p>
              {filteredCategory.map((category, indx) => (
                <p
                  onClick={() => handleSelected(category, indx)}
                  className={`cursor-pointer hover:text-gray-500 font-medium text-lg tracking-widest max-w-fit ${
                    selected.category === indx ? "border-b border-gray-300" : ""
                  }`}
                >
                  {category}
                </p>
              ))}
            </section>
            <section className="text-gray-300">
              <p className="uppercase font-bold text-xl">Sort By</p>
              {["price", "rating", "createdAt"].map((item, indx) => (
                <p
                  onClick={() => handleSort(item, indx)}
                  className={`cursor-pointer hover:text-gray-500 font-medium text-lg tracking-widest max-w-fit ${
                    selected.rating === indx ? "border-b border-gray-300" : ""
                  }`}
                >
                  {item}
                </p>
              ))}
            </section>
          </aside>
          <aside className="lg:flex flex-wrap justify-center ">
            {products?.map((product) => (
              <>
                <NewProductCard product={product} />
              </>
            ))}
          </aside>
        </main>
      </section>
    </>
  );
};

export default ProductList;
