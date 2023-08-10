import React from "react";

const CategoriesGrid = () => {
  return (
    <section className="bg-black text-gray-300 px-8">
      <main className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="mb-20 items-center mx-auto ">
          <p className="text-5xl tracking-widest uppercase">Categories</p>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2 relative cursor-pointer">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://res.cloudinary.com/dfxdj6jcd/image/upload/v1690628119/samples/two-ladies.jpg"
              />
              <aside className="absolute inset-0 text-center flex justify-center items-center hover:bg-inherit transition-all duration-200 bg-transparent/30">
                <p className="tracking-widest font-light uppercase text-5xl">
                  Women
                </p>
              </aside>
            </div>
            <div className="md:p-2 p-1 w-1/2 relative">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://res.cloudinary.com/dfxdj6jcd/image/upload/v1690628106/samples/ecommerce/leather-bag-gray.jpg"
              />
              <aside className="absolute inset-0 text-center flex justify-center items-center bg-transparent/30 hover:bg-inherit transition-all duration-200">
                <p className="tracking-widest font-light uppercase text-5xl">
                  Bags
                </p>
              </aside>
            </div>
            <div className="md:p-2 p-1 w-full relative">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://res.cloudinary.com/dfxdj6jcd/image/upload/v1690628097/samples/ecommerce/analog-classic.jpg"
              />
              <aside className="absolute inset-0 text-center flex justify-center items-center bg-transparent/30 hover:bg-inherit transition-all duration-200">
                <p className="tracking-widest font-light uppercase text-5xl">
                  watches
                </p>
              </aside>
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full relative">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://res.cloudinary.com/dfxdj6jcd/image/upload/v1690628102/samples/bike.jpg"
              />
              <aside className="absolute inset-0 text-center flex justify-center items-center bg-transparent/30 hover:bg-inherit transition-all duration-200">
                <p className="tracking-widest font-light uppercase text-5xl">
                  winter
                </p>
              </aside>
            </div>
            <div className="md:p-2 p-1 w-1/2 relative">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://res.cloudinary.com/dfxdj6jcd/image/upload/v1690628119/samples/shoe.jpg"
              />
              <aside className="absolute inset-0 text-center flex justify-center items-center bg-transparent/30 hover:bg-inherit transition-all duration-200">
                <p className="tracking-widest font-light uppercase text-5xl">
                  sneekers
                </p>
              </aside>
            </div>
            <div className="md:p-2 p-1 w-1/2 relative">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://res.cloudinary.com/dfxdj6jcd/image/upload/v1690628121/samples/look-up.jpg"
              />
              <aside className="absolute inset-0 text-center flex justify-center items-center bg-transparent/30 hover:bg-inherit transition-all duration-200">
                <p className="tracking-widest font-light uppercase text-5xl">
                  mens
                </p>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default CategoriesGrid;
