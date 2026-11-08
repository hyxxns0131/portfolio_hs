# portfolio_hs

강현서 포트폴리오 (HTML · CSS · JavaScript, 빌드 없음)

## 구조
- index.html : 섹션 순서대로 (HERO → 문장 강조 → 결과물 활용 → REBOOT → 인턴 → AX → 다른 결과물 → 이력 → 연락)
- css/style.css : 맨 위 :root 에 색 (--blue 가 포인트 색)
- js/main.js : 모션 (GSAP ScrollTrigger + Lenis 부드러운 스크롤)
- js/vendor/ : gsap · ScrollTrigger · lenis 라이브러리 (인터넷 없이도 동작)
- assets/img/ : face.jpg(첫 화면 얼굴), 화면 캡처

## 모션 위치 (main.js)
- HERO 목업이 스크롤에 맞춰 세워짐 : "HERO 목업"
- 형광펜 강조 : <mark class="sweep">글자</mark> 로 감싸면 자동 적용
- 결과물 카드 활성화 + 왼쪽 목차 : "USE"
- REBOOT 단계 선 채우기 · 체크 : "REBOOT 단계"
- 인턴 문장 한 줄씩 또렷해짐(섹션 고정) : "INTERN"

## 확인
VS Code Live Server 로 index.html 열기

## 배포 (Vercel)
GitHub에 이 폴더 안의 파일을 올리고 Vercel → Import → Framework: Other → Deploy

## 휴대폰 번호 (.env)
- `.env` 에 `PHONE=010-xxxx-xxxx` 를 적고 `node build-env.js` 실행 → `js/env.js` 생성 → 연락처에 번호 버튼이 나타남
- `.env` 와 `js/env.js` 는 `.gitignore` 에 있어서 GitHub에 올라가지 않음
- Vercel 배포 시: Settings → Environment Variables 에 `PHONE` 추가, Build Command 를 `node build-env.js` 로 설정
- 번호를 빼고 싶으면 `.env` 의 PHONE 을 비우고 다시 실행
