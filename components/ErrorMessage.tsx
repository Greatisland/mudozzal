import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="my-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md text-center w-full max-w-md">
      <p className="font-semibold">오류 발생!</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
