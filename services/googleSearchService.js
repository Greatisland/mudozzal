// 윈도우 객체에서 환경 변수 가져오기
const GOOGLE_API_KEY = window.env?.GOOGLE_API_KEY;
const GOOGLE_CX_ID = window.env?.GOOGLE_CX_ID;

const NUM_RESULTS = 9; // Fetch 9 images for a 3x3 grid, API supports up to 10

export const fetchImages = async (keyword) => {
  if (!GOOGLE_API_KEY || !GOOGLE_CX_ID) {
    console.error(
      "Google API Key or CX ID is not configured in environment variables."
    );
    // 실제 사용자에게는 좀 더 친절한 메시지를 보여주는 것이 좋습니다.
    throw new Error(
      "API 키 또는 CX ID가 설정되지 않았습니다. 애플리케이션 관리자에게 문의하거나 환경 변수 설정을 확인해주세요."
    );
  }

  if (!keyword.trim()) {
    throw new Error("검색할 키워드를 입력해주세요.");
  }

  const searchQuery = `무도 짤 ${keyword.trim()}`; // Updated search query
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX_ID}&q=${encodeURIComponent(
    searchQuery
  )}&searchType=image&num=${NUM_RESULTS}&imgSize=xlarge&safe=active`;
  // Added imgSize=xlarge and safe=active

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      const apiError = data.error || { message: "Unknown API error" };
      console.error("Google API Error:", apiError);
      const errorCode = "code" in apiError ? apiError.code : undefined;
      const errorMessage = `Google API 오류: ${apiError.message}${
        errorCode !== undefined ? ` (코드: ${errorCode})` : ""
      }`;
      throw new Error(errorMessage);
    }

    if (data.items && data.items.length > 0) {
      return data.items
        .filter((item) => item.link && item.image?.contextLink) // Ensure essential links are present
        .map((item) => ({
          id: item.link,
          title: item.title, // Keep for potential future use or download name, but not displayed
          url: item.link,
          sourcePageUrl: item.image.contextLink, // Keep for potential future use, but not displayed
          snippet: item.snippet, // Keep for potential future use, but not displayed
        }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching images from Google Search:", error);
    if (error instanceof Error) {
      throw new Error(`이미지 검색 중 오류 발생: ${error.message}`);
    }
    throw new Error("알 수 없는 오류로 이미지 검색에 실패했습니다.");
  }
};
