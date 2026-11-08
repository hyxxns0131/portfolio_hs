/*
  .env 의 값을 읽어 js/env.js 를 만듭니다.
  실행: node build-env.js
  - 로컬: .env 파일을 읽음
  - Vercel: 프로젝트 Settings → Environment Variables 에 PHONE 을 넣으면 그 값을 읽음
*/
const fs = require("fs");
const path = require("path");

const env = {};
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const PHONE = process.env.PHONE || env.PHONE || "";

const out = "window.ENV = " + JSON.stringify({ PHONE }) + ";\n";
fs.writeFileSync(path.join(__dirname, "js", "env.js"), out);
console.log(PHONE ? "js/env.js 생성 완료 (PHONE 포함)" : "js/env.js 생성 완료 (PHONE 없음 → 번호 버튼 숨김)");
