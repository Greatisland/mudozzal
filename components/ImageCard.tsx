import React from "react";
import { DisplayImage } from "../types";

interface ImageCardProps {
  image: DisplayImage;
  onDownload: (imageUrl: string, imageName: string) => void;
  searchKeyword: string;
  index: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onDownload,
  searchKeyword,
  index,
}) => {
  // Sanitize keyword for filename, ensuring it's not too long and handles various characters
  const sanitizedKeyword = searchKeyword.replace(/\s+/g, "_").substring(0, 30);
  const downloadImageName = `무도짤_${sanitizedKeyword}_${index + 1}.jpg`;

  const handleDownloadClick = () => {
    onDownload(image.url, downloadImageName);
  };

  return (
    <div className="group bg-gray-800 rounded-lg shadow-xl p-3 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-in-out hover:shadow-purple-500/50 transform hover:-translate-y-1 relative">
      <div className="aspect-square w-full overflow-hidden rounded-md mb-3 bg-gray-700 flex items-center justify-center">
        <img
          src={image.url}
          alt={`무도짤 ${searchKeyword} ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.alt = "이미지 로드 실패";
            // Simple fallback icon or color
            target.parentElement?.classList.add("bg-gray-600");
            target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239CA3AF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E`;
          }}
        />
      </div>
      <button
        onClick={handleDownloadClick}
        className="w-full whitespace-nowrap py-2.5 px-4 text-sm font-semibold rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 transform active:scale-95"
        aria-label={`'${image.title}' 이미지 다운로드`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline-block mr-2 -mt-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        다운로드
      </button>
    </div>
  );
};

export default ImageCard;
