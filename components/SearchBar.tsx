import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [keyword, setKeyword] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setInputError("키워드를 입력해주세요.");
      return;
    }
    setInputError("");
    onSearch(keyword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch sm:items-center my-6 sm:my-8 gap-3 w-full max-w-xl"
    >
      <div className="flex-grow w-full">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            if (inputError) setInputError("");
          }}
          placeholder="예: 광희 종이인형, 노홍철 사기꾼"
          className={`p-3.5 border ${
            inputError ? "border-red-500" : "border-gray-700"
          } rounded-lg shadow-sm focus:ring-2 ${
            inputError ? "focus:ring-red-500" : "focus:ring-purple-500"
          } focus:border-transparent outline-none w-full text-lg transition-colors duration-150 bg-gray-800 text-gray-200 placeholder-gray-500`}
          aria-label="검색 키워드"
          aria-describedby={inputError ? "keyword-error" : undefined}
        />
        {inputError && (
          <p id="keyword-error" className="text-red-400 text-sm mt-1.5 px-1">
            {inputError}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="p-3.5 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 disabled:bg-gray-600 disabled:cursor-not-allowed text-lg transition-colors duration-150 w-full sm:w-auto whitespace-nowrap transform active:scale-95"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            검색 중...
          </>
        ) : (
          "짤 찾기!"
        )}
      </button>
    </form>
  );
};

export default SearchBar;
