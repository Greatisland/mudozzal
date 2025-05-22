# 무한도전 짤 파인더

키워드를 입력하여 관련된 '무한도전' 이미지를 검색하고 다운로드할 수 있는 웹 애플리케이션입니다. Google Custom Search API를 사용합니다.

## 프로젝트 설정

### 로컬 개발 환경

1. `index.html` 파일의 환경 변수 부분을 실제 API 키로 수정합니다:

```javascript
window.env = {
  GOOGLE_API_KEY: "실제_구글_API_키",
  GOOGLE_CX_ID: "실제_구글_CX_ID",
};
```

2. 로컬 웹 서버를 사용하여 실행합니다:
   - VS Code의 경우 Live Server 확장 프로그램을 사용할 수 있습니다.
   - 또는 `npx serve` 등의 명령어를 사용할 수 있습니다.

### Vercel 배포

1. Vercel에서 환경 변수를 설정합니다:

   - `GOOGLE_API_KEY`: Google API 키
   - `GOOGLE_CX_ID`: Google Custom Search Engine ID

2. 프로젝트를 Vercel에 연결하고 배포합니다:
   - `vercel.json` 파일이 프로젝트 루트에 있는지 확인합니다.
   - `build.js` 파일이 프로젝트 루트에 있는지 확인합니다.
   - Vercel 대시보드에서 새 프로젝트를 생성하고 GitHub 저장소를 연결합니다.
   - 배포 설정에서 프레임워크 프리셋을 "Other"로 선택합니다.

## 주의사항

### API 키 보안

현재 이 프로젝트는 클라이언트 측에서 Google API 키를 직접 사용합니다. 이는 키가 노출될 수 있는 보안 위험이 있습니다. 다음과 같은 추가 보호 조치를 고려하세요:

1. Google Cloud Console에서 API 키 제한 설정:

   - HTTP 리퍼러 제한: 여러분의 도메인으로 제한
   - API 사용 제한: Custom Search API로만 제한

2. 더 안전한 방법:
   - 서버리스 함수(예: Vercel Serverless Functions)를 사용하여 API 키를 서버 측에 보관
   - 클라이언트는 서버리스 함수 엔드포인트를 호출하도록 수정

### 사용량 제한

Google Custom Search API는 무료 티어에서 일일 100쿼리로 제한됩니다. 이를 초과하면 요금이 부과될 수 있습니다. 적절한 사용량 모니터링과 제한을 설정하세요.
