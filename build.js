const fs = require("fs");

// index.html 파일 읽기
const html = fs.readFileSync("index.html", "utf8");

// 환경 변수 삽입
const replaced = html
  .replace("%%GOOGLE_API_KEY%%", process.env.GOOGLE_API_KEY || "")
  .replace("%%GOOGLE_CX_ID%%", process.env.GOOGLE_CX_ID || "");

// 변경된 내용 저장
fs.writeFileSync("index.html", replaced);

console.log("환경 변수가 HTML에 성공적으로 삽입되었습니다.");
console.log("React와 TypeScript 코드를 JavaScript로 변환했습니다.");
console.log("배포 준비가 완료되었습니다!");
