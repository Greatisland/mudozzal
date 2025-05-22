import React, { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import ImageCard from "./components/ImageCard";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { fetchImages } from "./services/googleSearchService";
import { DisplayImage } from "./types";

const App: React.FC = () => {
  const [images, setImages] = useState<DisplayImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState<string>("");
  const [noResults, setNoResults] = useState<boolean>(false);

  const handleSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setError("키워드를 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");
    setImages([]);
    setNoResults(false);
    setCurrentSearchKeyword(keyword.trim());

    try {
      const fetchedImages = await fetchImages(keyword.trim());
      if (fetchedImages.length > 0) {
        setImages(fetchedImages);
      } else {
        setNoResults(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDownloadImage = useCallback(
    async (imageUrl: string, imageName: string) => {
      const sanitizedImageName =
        imageName
          .replace(/[^a-zA-Z0-9._ㄱ-ㅎㅏ-ㅣ가-힣-]/g, "_")
          .substring(0, 255) || "download.jpg";
      try {
        // Using a proxy is generally better for CORS, but for a client-side app,
        // this is a common approach. The server for this app doesn't exist.
        const response = await fetch(imageUrl); // Direct fetch, relying on image server's CORS policy
        if (!response.ok) {
          console.warn(
            `Direct image download failed (status: ${response.status}). Opening in new tab.`
          );
          throw new Error("DIRECT_DOWNLOAD_FAILED_FALLBACK_TO_NEW_TAB");
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = sanitizedImageName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download error:", err);
        alert(
          "이미지 다운로드에 실패했습니다. 이미지 제공 서버의 정책 또는 네트워크 문제일 수 있습니다. 새 탭에서 이미지를 열어 직접 저장해주세요."
        );
        window.open(imageUrl, "_blank")?.focus();
      }
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-gray-200 p-4 selection:bg-fuchsia-600 selection:text-white">
      <header className="w-full max-w-4xl mx-auto py-8 sm:py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          무도<span className="text-purple-400">짤</span> 파인더
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
          키워드를 입력하고 적절한 짤을 찾아보세요! <br /> (예: 박명수 분노,
          유재석 당황, 정형돈 미소)
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto px-2 sm:px-0">
        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {!loading && !error && images.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-8">
            {images.map((image, index) => (
              <ImageCard
                key={image.id + "-" + index}
                image={image}
                onDownload={handleDownloadImage}
                searchKeyword={currentSearchKeyword}
                index={index}
              />
            ))}
          </div>
        )}

        {!loading && !error && noResults && (
          <div className="text-center my-10 p-6 sm:p-8 bg-gray-800 bg-opacity-70 rounded-xl shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold text-purple-300">
              <span className="text-3xl sm:text-4xl block mb-2">😅</span>'
              {currentSearchKeyword}' 키워드에 대한 무도짤을 찾지 못했어요.
            </p>
            <p className="text-gray-400 mt-3">
              다른 키워드로 다시 시도해보시겠어요?
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          images.length === 0 &&
          !noResults &&
          !currentSearchKeyword && (
            <div className="text-center my-10 p-6 flex flex-col items-center">
              <svg
                className="w-20 h-20 text-purple-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <p className="text-2xl text-purple-300 font-semibold animate-pulse">
                궁금한 무도짤 키워드를 입력해주세요!
              </p>
              <p className="text-gray-500 mt-2">
                예시: "정준하 눈물", "하하 신남"
              </p>
            </div>
          )}
      </main>

      <footer className="w-full max-w-4xl mx-auto py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm"></footer>
    </div>
  );
};

export default App;
