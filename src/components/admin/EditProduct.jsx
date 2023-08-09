import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AdminLoading from "./AdminLoading";
import { useDispatch, useSelector } from "react-redux";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CiSquareRemove } from "react-icons/ci";
import { setLoading } from "../../context/LoadingSlice";
import handleRequest from "../../utils/handleRequest";
import successAndFailure from "../../utils/successAndFail";

const EditProduct = ({ product, brandsName }) => {
  const { loading } = useSelector((state) => state.loading);
  const { user } = useSelector((state) => state.user);
  const [cookies, setCookies] = useCookies(["token"]);
  const [imagesPreview, setImagesPreview] = useState(product.images);
  const [deletedImageId, setDeletedImageId] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    category: product.category,
    brandName: product.brandName,
    price: product.price,
    stock: product.stock,
    images: product.images,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview([...imagesPreview, reader.result]);
          setNewImages([...newImages, reader.result]);

          // setForm({ ...form, images: [...form.images, reader.result] });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(cookies.token);
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await handleRequest(
        "PUT",
        `/updateProduct/${product._id}`,
        {
          name: form.name,
          description: form.description,
          category: form.category,
          brandName: form.brandName,
          stock: form.stock,
          price: form.price,
          images: newImages,
          deletedImageId,
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

  const handleRemove = (indx, img) => {
    const dlete = imagesPreview.filter((image, index) => index !== indx);
    setImagesPreview(dlete);
    let filteredImages = [];
    newImages.forEach((image) => {
      const filter = dlete.filter((item, index) => item === image);
      filteredImages = filteredImages.concat(filter);
    });
    setNewImages(filteredImages);
    if (img.public_id) {
      setDeletedImageId([...deletedImageId, img.public_id]);
    }
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
  return (
    <>
      <main>
        <p className="text-gray-300 text-center tracking-widest font-light text-2xl">
          Update Your Product
        </p>

        <div className=" text-gray-300 p-8 bg-black md:w-1/2 md:mx-auto min-h-screen">
          {loading ? (
            <AdminLoading />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex-col justify-between space-y-3 md:mr-4"
            >
              <main className="md:flex  w-full  justify-between space-y-4 items-center">
                <p className="text-gray-300 text-2xl font-bold">Name:</p>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  className=" bg-black"
                  placeholder="Write a name of a product..."
                />
                <p className="text-gray-300 text-2xl font-bold">price:</p>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  className="outline-none bg-black"
                />
              </main>
              <main className="md:flex w-full mt-4 space-y-4">
                <p className="text-gray-300 text-2xl font-bold">
                  specifications:
                </p>
                <textarea
                  onChange={handleChange}
                  value={form.description}
                  placeholder="Write a brief description"
                  name="description"
                  type="text"
                  className="outline-none m-1 bg-black w-full h-48"
                />
              </main>
              <main>
                <p className="text-gray-300 text-2xl font-bold">category:</p>
                <select
                  onChange={handleChange}
                  value={form.category}
                  name="category"
                  className="bg-black  text-gray-300"
                >
                  {categories.map((category) => (
                    <option className="text-lg p-2 ">{category}</option>
                  ))}
                </select>
              </main>

              <aside className="md:w-1/2 p-4 font-medium flex  tracking-widest items-center relative">
                <InformationCircleIcon className="h-8 w-8 absolute  -left-2 top-4  self-start" />
                <p className="ml-2">
                  You can select from existing Brands or create a new one in
                  case it never exists! available Brands: {brandsName.length}
                </p>
              </aside>
              <main className="md:flex justify-between space-y-4 items-center">
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
                  onChange={handleChange}
                  type="text"
                  className=" bg-black"
                />
                <p className="text-gray-300 text-2xl font-bold">Stock:</p>
                <input
                  name="stock"
                  onChange={handleChange}
                  type="number"
                  value={form.stock}
                  className="outline-none bg-black"
                />
              </main>
              <main className="flex space-x-2 w-full m-4 ">
                {form.images &&
                  imagesPreview.map((img, index) => (
                    <>
                      <section className="relative">
                        <img
                          className="w-24 h-24 object-cover"
                          src={img.image_url || img}
                        />
                        <CiSquareRemove
                          onClick={() => handleRemove(index, img)}
                          className="w-8 h-8 absolute top-0 right-1 cursor-pointer hover:scale-110"
                        />
                      </section>
                    </>
                  ))}
              </main>
              {imagesPreview.length < 4 ? (
                <>
                  <input
                    name="images"
                    onChange={handleChange}
                    type="file"
                    className="file:bg-black file:text-gray-300 "
                  />
                  <p className="text-gray-300 text-2xl my-4 font-bold">
                    upload images:
                  </p>
                </>
              ) : (
                <p className="font-light tracking-widest">
                  You can only add 4 images for now!
                </p>
              )}
              <button
                className="bg-black block mt-4 border-gray-300 border-2 text-gray-300 py-2 px-4"
                type="submit"
              >
                Update product
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default EditProduct;
