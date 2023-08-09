import React, { useState } from "react";
import ProductsManipulations from "../components/admin/ProductsManipulations";
import AllBrands from "../components/admin/AllBrands";
import AllRegisteredUsers from "../components/admin/AllRegisteredUsers";

const MyDashBoard = () => {
  const [open, setOpen] = useState({
    productManipulations: false,
    allRegisteredUsers: false,
    allBrands: false,
  });
  const [selected, setSelected] = useState();
  const menuOptions = [
    {
      name: "All Products",
      func: (indx) => {
        setOpen({ productManipulations: true });
        setSelected(indx);
      },
    },
    {
      name: "All Registered Users",
      func: (indx) => {
        setOpen({ allRegisteredUsers: true });
        setSelected(indx);
      },
    },

    {
      name: "All Brands",
      func: (indx) => {
        setOpen({ allBrands: true });
        setSelected(indx);
      },
    },
  ];
  return (
    <section className="bg-black min-h-screen ">
      <main className="flex p-6 relative">
        <aside className="w-1/6  min-h-screen p-4">
          {menuOptions.map(({ name, func }, index) => (
            <>
              <p
                onClick={() => func(index)}
                className={`text-xl font-thin mb-3 tracking-widest text-gray-300 hover:scale-110 transition-all border-b-2 duration-150 cursor-pointer ${
                  selected === index ? "border-b-gray-500" : ""
                }`}
              >
                {name}
              </p>
            </>
          ))}
        </aside>
        <aside className="w-full h-full bg-white overflow-y-auto ">
          {open.productManipulations && <ProductsManipulations />}
          {open.allBrands && <AllBrands />}
          {open.allRegisteredUsers && <AllRegisteredUsers />}
        </aside>
      </main>
    </section>
  );
};

export default MyDashBoard;
