import React from "react";

const AdminLoading = () => {
  return (
    <section className="mx-auto flex justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-white align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "
        role="status"
      >
        <span className="text-gray-300 !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </section>
  );
};

export default AdminLoading;
