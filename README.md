# portfolio_hs

강현서 포트폴리오 사이트 (HTML · CSS · JavaScript, 빌드 없음)

## 회사별 버전 링크
- 공통: `index.html`
- 비스튜디오컴퍼니: `index.html#bstudio` 또는 `index.html?for=bstudio`
- 노리케어(CARETIN): `index.html#noricare` 또는 `index.html?for=noricare`

## 배포 (Vercel)
1. GitHub에 이 폴더 **안의 파일들**(index.html, css, js, assets)을 올립니다.
2. Vercel → Add New → Project → 저장소 Import → Framework: Other → Deploy

## 고칠 곳
- 문구 · 회사별 내용: `js/main.js` 맨 위 `COMPANIES`
- 색: `css/style.css` 맨 위 `:root` (회사별 색은 `body[data-company=...]`)
