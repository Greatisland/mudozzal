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

  // 검색 쿼리 최적화: "무도 짤" 대신 "무한도전 짤"을 사용하고 키워드 위치 변경
  const searchQuery = `무한도전 ${keyword.trim()} 짤`;

  // API 파라미터 최적화:
  // - imgSize=xlarge를 imgSize=large로 변경 (더 많은 이미지 포함)
  // - safe=active를 safe=off로 변경 (필터링 감소)
  // - 추가로 gl=kr 파라미터 추가 (한국 결과에 중점)
  // - cr=countryKR 추가 (한국 컨텐츠 우선)
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX_ID}&q=${encodeURIComponent(
    searchQuery
  )}&searchType=image&num=${NUM_RESULTS}&imgSize=large&safe=off&gl=kr&cr=countryKR`;

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
      // 결과가 없을 경우 대체 쿼리로 재시도
      console.log(
        "첫 번째 쿼리로 결과를 찾지 못했습니다. 대체 쿼리로 시도합니다."
      );
      const alternativeQuery = `무도 ${keyword.trim()}`;
      const alternativeUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX_ID}&q=${encodeURIComponent(
        alternativeQuery
      )}&searchType=image&num=${NUM_RESULTS}&imgSize=large&safe=off&gl=kr&cr=countryKR`;

      const alternativeResponse = await fetch(alternativeUrl);
      const alternativeData = await alternativeResponse.json();

      if (!alternativeResponse.ok) {
        throw new Error("대체 쿼리 검색 중 오류가 발생했습니다.");
      }

      if (alternativeData.items && alternativeData.items.length > 0) {
        return alternativeData.items
          .filter((item) => item.link && item.image?.contextLink)
          .map((item) => ({
            id: item.link,
            title: item.title,
            url: item.link,
            sourcePageUrl: item.image.contextLink,
            snippet: item.snippet,
          }));
      }

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
