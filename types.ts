export interface GoogleSearchImageItem {
  title: string;
  link: string; // Original image URL
  snippet: string;
  image: {
    contextLink: string; // Page URL where the image is found
    thumbnailLink?: string;
    height?: number;
    width?: number;
  };
}

export interface GoogleSearchResponse {
  items?: GoogleSearchImageItem[];
  error?: {
    code: number;
    message: string;
  };
  searchInformation?: {
    totalResults: string;
  };
}

export interface DisplayImage {
  id: string; // Using image link as a unique ID for React key
  title: string;
  url: string;
  sourcePageUrl: string;
  snippet: string;
}

export interface ApiError {
  message: string;
  details?: unknown;
}
