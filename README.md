# portfolio_hs

강현서 포트폴리오 (HTML · CSS · JavaScript, 빌드 없음)
지원 방향: 뷰티 · 패션 회사 온라인 MD · 이커머스 운영 신입

## 구조
- index.html : 섹션 순서
  ① 첫 화면 → ② 신성통상 인턴 → ③ REBOOT → ④ 뷰티·패션 결과물 → ⑤ ForwardUs·기타 → ⑥ 이력·도구 → ⑦ 연락처
- css/style.css : 맨 위 :root 에 색 (--blue 가 로즈 포인트 색)
- js/main.js : 별 배경, 화면 표시 효과, 모바일 메뉴, 이미지 뷰어, 주소 복사, 3D 캐릭터
- js/vendor/model-viewer-umd.min.js : 3D 캐릭터 표시 (gsap · ScrollTrigger · lenis 파일은 현재 쓰지 않음)
- assets/img/ : 화면 캡처 · 포스터, assets/3d/ : 3D 캐릭터

## 이미지 뷰어
- `.g-btn` 버튼 안에 `<img>` 를 넣고 `data-title`(무슨 화면) · `data-desc`(무엇을 확인할 수 있는지)를 적으면 자동으로 크게 보기가 됨
- 같은 `data-gallery` 묶음 안에서 이전 · 다음 이동 (← → 키, 스와이프), + − 확대, Esc 닫기

## 확인
VS Code Live Server 로 index.html 열기 (더블클릭으로 열어도 동작)

## 배포 (Vercel)
GitHub에 푸시하면 Vercel이 배포함

## 휴대폰 번호 (.env)
- `.env` 에 `PHONE=010-xxxx-xxxx` 를 적고 `node build-env.js` 실행 → `js/env.js` 생성 → 연락처에 "전화 걸기" 버튼이 나타남
- `.env` 와 `js/env.js` 는 `.gitignore` 에 있어서 GitHub에 올라가지 않음
- 번호를 빼고 싶으면 `.env` 의 PHONE 을 비우고 다시 실행
