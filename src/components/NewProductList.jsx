import React, { useEffect, useState } from "react";
import NewProductCard from "./NewProductCard";
import handleRequest from "../utils/handleRequest";
import ScrollContainer from "react-scroll-horizontal";
import { Link } from "react-router-dom";
const NewProductList = () => {
  const [page, setPage] = useState(1);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await handleRequest("GET", `/getBrandsDisplay`);
      if (response) {
        setBrands(response.limitedBrands);
      }
      console.log(response);
    };

    fetchBrands();
  }, []);
  console.log();
  return (
    <>
      <section className="bg-black  text-gray-300">
        <p className="text-center lg:text-5xl p-12 uppercase tracking-widest">
          Our Collaborators!
        </p>
        <main>
          <aside className="lg:block space-y-4 items-center hidden  ">
            {brands.map((brand) => (
              <>
                <section className="w-1/4 text-5xl text-center font-bold uppercase">
                  {brand.brandName}
                </section>
                <ScrollContainer
                  style={{ width: "100%", height: "400px" }}
                  vertical={false}
                  reverseScroll
                >
                  <section className="flex">
                    {brand.products.map((product) => (
                      <NewProductCard product={product} />
                    ))}

                    <aside className="bg-black text-gray-300 p-2 w-56 text-center flex items-center justify-center mr-4">
                      <Link to={`/allproducts/${brand.brandName}/${brand._id}`}>
                        <h1 className="cursor-pointer hover:text-gray-600">
                          Browse more about this Brand!
                        </h1>
                      </Link>
                    </aside>
                  </section>
                </ScrollContainer>
              </>
            ))}
          </aside>
        </main>

        {/*  for mobile view */}
        <main>
          <aside className="lg:hidden items-center flex-col  ">
            <section className="flex">
              <p className=" text-5xl m-4  font-medium">NIKE</p>
              <aside className="bg-black text-gray-300 hover:text-gray-600 p-2 text-center flex items-center justify-center mr-4">
                <h1>Browse more about this Brand!</h1>
              </aside>
            </section>

            <section className="flex overflow-auto scrollbar-hide">
              <NewProductCard />
              <NewProductCard />

              <NewProductCard />
              <NewProductCard />
              <NewProductCard />
              <NewProductCard />
              <NewProductCard />
            </section>
          </aside>
        </main>
      </section>
    </>
  );
};

export default NewProductList;
