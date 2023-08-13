import React, { useEffect, useState } from "react";
import handleRequest from "../../utils/handleRequest";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { CiSquareRemove } from "react-icons/ci";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { setLoading } from "../../context/LoadingSlice";
import AdminLoading from "../admin/AdminLoading";
import successAndFailure from "../../utils/successAndFail";
const CreateProduct = () => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loading);

  const [cookies, setCookies] = useCookies(["token"]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [brandsName, setBrandsName] = useState([]);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    brandName: "",
    price: 0,
    stock: 0,
    images: [],
  });

  const handleSubmit = async (e) => {
    console.log(cookies.token);
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await handleRequest(
        "POST",
        `/product/new?id=${user._id}`,
        {
          name: form.name,
          description: form.description,
          category: form.category,
          brandName: form.brandName,
          stock: form.stock,
          price: form.price,
          images: form.images,
        },
        cookies.token,
        user.role
      );
      if (response) {
        console.log(response);
        dispatch(setLoading(false));
        successAndFailure(true, response.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      successAndFailure(
        true,
        response.message || "oops! failed to make a product!"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview([...imagesPreview, reader.result]);

          setForm({ ...form, images: [...form.images, reader.result] });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRemove = (indx) => {
    const dlete = imagesPreview.filter((image, index) => index !== indx);
    setImagesPreview(dlete);
    setForm({ ...form, images: dlete });
  };

  const categories = [
    "Mens",
    "Ladies",
    "Kids",
    "Shoes",
    "Pants",
    "Shorts",
    "Featured",
    "NewlyArrived",
  ];

  useEffect(() => {
    const getAllBrandsNames = async () => {
      dispatch(setLoading(true));

      const response = await handleRequest(
        "GET",
        "/getBrandsName",
        {},
        cookies.token,
        user.role
      );
      console.log(response);
      if (response) {
        setBrandsName(response.brandsName);
        dispatch(setLoading(false));
      }
    };
    getAllBrandsNames();
  }, []);

  return (
    <div className="absolute inset-0 top-[20%] w-1/2 text-gray-300 bg-black  h-[500px] mx-auto">
      {loading ? (
        <AdminLoading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex-col flex-wrap  items-center justify-between mr-4"
        >
          <main className="flex justify-between space-y-4 items-center">
            <p className="text-gray-300 text-2xl font-bold">Name:</p>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              required
              className=" bg-black"
              placeholder="Write a name of a product..."
            />
            <p className="text-gray-300 text-2xl font-bold">price:</p>
            <input
              name="price"
              required
              onChange={handleChange}
              type="number"
              className="outline-none bg-black"
            />
          </main>
          <main className="flex justify-between space-y-4 items-center">
            <p className="text-gray-300 text-2xl font-bold">specifications:</p>
            <textarea
              onChange={handleChange}
              placeholder="Write a brief description"
              required
              name="description"
              type="text"
              className="outline-none bg-black"
            />
            <p className="text-gray-300 text-2xl font-bold">category:</p>
            <select
              onChange={handleChange}
              value={form.category}
              required
              name="category"
              className="bg-black  text-gray-300"
            >
              {categories.map((category) => (
                <option className="text-lg p-2 ">{category}</option>
              ))}
            </select>
          </main>

          <aside className="w-1/2 p-4 font-medium flex  tracking-widest items-center relative">
            <InformationCircleIcon className="h-8 w-8 absolute  -left-2 top-4  self-start" />
            <p className="ml-2">
              You can select from existing Brands or create a new one in case it
              never exists! available Brands: {brandsName.length}
            </p>
          </aside>
          <main className="flex justify-between space-y-4 items-center">
            <p className="text-gray-300 text-2xl font-bold">Brand:</p>
            <select
              onChange={handleChange}
              value={form.brandName}
              name="brandName"
              className="bg-black  text-gray-300"
            >
              {brandsName.map((name) => (
                <option className="text-lg p-2 ">{name}</option>
              ))}
            </select>
            <input
              name="brandName"
              placeholder="Create a brand..."
              value={form.brandName}
              required
              onChange={handleChange}
              type="text"
              className=" bg-black"
            />
            <p className="text-gray-300 text-2xl font-bold">Stock:</p>
            <input
              name="stock"
              onChange={handleChange}
              required
              type="number"
              className="outline-none bg-black"
            />
          </main>
          <main className="flex space-x-2 w-full m-4 ">
            {form.images &&
              imagesPreview.map((img, index) => (
                <section className="relative">
                  <img className="w-24 h-24 object-cover" src={img} />
                  <CiSquareRemove
                    onClick={() => handleRemove(index)}
                    className="w-8 h-8 absolute top-0 right-1 cursor-pointer hover:scale-110"
                  />
                </section>
              ))}
          </main>
          {form.images.length < 4 && (
            <>
              <p className="text-gray-300 text-2xl my-4 font-bold">
                upload images:
              </p>
              <input
                name="images"
                onChange={handleChange}
                type="file"
                required
                className="file:bg-black file:text-gray-300 "
              />
            </>
          )}
          <button
            className="bg-black block mt-4 border-gray-300 border-2 text-gray-300 py-2 px-4"
            type="submit"
          >
            Create product
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;
