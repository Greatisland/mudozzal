import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return React.createElement(
    "div",
    {
      className:
        "my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md text-center w-full max-w-md",
    },
    React.createElement("p", { className: "font-semibold" }, "오류 발생!"),
    React.createElement("p", null, message)
  );
};

export default ErrorMessage;
