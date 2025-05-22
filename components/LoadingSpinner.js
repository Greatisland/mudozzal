import React from "react";

const LoadingSpinner = () => {
  return React.createElement(
    "div",
    { className: "flex justify-center items-center my-8" },
    React.createElement("div", {
      className:
        "animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500",
    }),
    React.createElement(
      "p",
      { className: "ml-4 text-lg text-gray-700" },
      "검색 중..."
    )
  );
};

export default LoadingSpinner;
