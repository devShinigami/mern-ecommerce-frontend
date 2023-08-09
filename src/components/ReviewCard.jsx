import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <>
      <section className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
        <div className="w-full flex mb-4 items-center">
          <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
            <img src="https://i.pravatar.cc/100?img=1" alt="" />
          </div>
          <div className="flex-grow pl-3">
            <h6 className="font-bold text-sm uppercase text-gray-600">
              {review.name}
            </h6>
          </div>
        </div>
        <div className="w-full">
          <p className="text-sm leading-tight">
            <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
              "
            </span>
            {review.comment}
            <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
              "
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default ReviewCard;
