/* =========================================================
   강현서 포트폴리오 · 인터랙션
   - 지원 회사 전환: 주소 끝 #bstudio · #noricare 또는 ?for=bstudio
   - 스크롤 등장 · 숫자 카운트업 · 진행 막대 · 갤러리 · 필터 · 복사
   ========================================================= */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- 회사별 내용 ---------------- */
  var COMPANIES = {
    all: {
      heroSub: '온라인 MD 인턴으로 상품별 매출과 할인율을 다뤘고, 무역 AX 과정에서는 한국 브랜드의 미국 진출 플랫폼 <b>REBOOT</b>의 PM을 맡아 팀 프로젝트 <b>1위</b>를 했습니다.',
      fitTitle: "공고가 찾는 사람과, 제가 해 본 일",
      fitLead: "위의 지원 회사 버튼을 누르면, 그 회사 공고의 업무와 우대 사항에 맞춰 근거가 바뀝니다.",
      closing: "숫자로 판단하고,<br>AI로 반복 업무를 줄이겠습니다.",
      fit: [
        { q: "커머스 실무", title: "상품을 숫자로 관리해 봤습니다", ev: [
          ["me", "신성통상 E-MD 인턴: 상품별 매출 · 할인율 분석, 딜 운영, 원가 · 판매가로 수익성 관리"],
          ["me", "자사몰 · 네이버 · 무신사 채널에서 상품 등록 · 가격 설정 · 프로모션 세팅"]] },
        { q: "AI 실행력", title: "AI로 운영 업무를 직접 줄여 봤습니다", ev: [
          ["me", "REBOOT 홈페이지 PM · 개발: 상품 · 팝업 · 크리에이터 링크를 대화로 만드는 AI 작업실"],
          ["team", "대시보드로 카드뉴스 제작 64.7%, 광고 문구 1차 검토 77.8% 단축(실측)"]] },
        { q: "글로벌", title: "해외 시장과 규제를 기준으로 설계했습니다", ev: [
          ["me", "FDA 경고장의 문제 표현으로 만든 규칙으로 홈페이지 문구 · 챗봇 답변 자동 점검"],
          ["me", "영국 케임브리지 어학연수 6개월 · OPIc IH"]] },
        { q: "무역 지식", title: "무역 실무 위에 데이터와 AI를 쌓았습니다", ev: [
          ["me", "국제통상 · 회계 복수전공, 무역 AX 과정에서 계약 · 인코텀즈 · 통관 · 바이어 응대 이수"],
          ["team", "ForwardUs: Offer Sheet를 읽어 C/I · P/L을 자동 작성하는 서비스, 메인 챗봇 기획"]] }
      ],
      day1Title: "입사하면 바로 할 수 있는 일",
      day1: [
        "채널 · 상품별 판매 데이터를 주간 표로 정리해 할인과 프로모션 판단 근거를 만듭니다.",
        "반복되는 상품 등록 문구 · 제안서 초안은 AI로 만들고, 표현과 숫자는 직접 검수합니다.",
        "해외 판매 문구는 국가별 규제 표현 기준으로 먼저 점검합니다."
      ],
      order: null
    },

    bstudio: {
      heroSub: '크리에이터마다 전용 링크와 할인코드를 주고, <b>클릭 · 주문 · 전환율 · 수수료</b>를 한 화면에 모으는 구조를 직접 만들었습니다. 인플루언서 커머스의 매출 관리, 이미 해 봤습니다.',
      fitTitle: "비스튜디오컴퍼니 영업 직무와 제 경험",
      fitLead: "공고의 담당 업무 3가지와 우대 사항에 맞춰 근거를 정리했습니다. 「내 담당」과 「팀 결과」를 나눠 표시했습니다.",
      closing: "크리에이터 성과를 숫자로 보고,<br>다음 제안을 빠르게 만들겠습니다.",
      fit: [
        { q: "담당 업무 · 인플루언서 발굴 · 제안 영업", title: "크리에이터 후보를 숫자로 고르고, 제안서까지 준비하는 흐름을 만들었습니다", ev: [
          ["team", "REBOOT 대시보드 파트너 탭: YouTube 크리에이터의 최근 영상 평균 조회수 · 구독자 수를 비교해 후보 선정"],
          ["team", "영문 제안 메일과 광고 표기(FTC) 가이드 초안을 만들고 광고 심의 규칙으로 검토"],
          ["me", "홈페이지에서 크리에이터별 전용 링크 = 전용 할인코드 발급, 할인율 · 수수료율 · 도착 페이지 설정"]] },
        { q: "담당 업무 · 담당 브랜드 · 제품 매출 관리", title: "링크별 매출과 정산 예정액을 자동으로 집계합니다", ev: [
          ["me", "링크별 클릭 · 주문 · 전환율 · 판매량 · 매출 · 수수료, Instagram / TikTok 플랫폼별 매출 표"],
          ["me", "크리에이터 실적 · 플랫폼별 매출 · 직접 유입 매출 등 CSV 14종 다운로드"],
          ["me", "신성통상 인턴: 상품별 매출 · 할인율 분석과 딜 운영"]] },
        { q: "담당 업무 · 브랜드사 커뮤니케이션 · 신제품 소싱", title: "가격만이 아니라 원가와 판매 비용까지 보고 판단합니다", ev: [
          ["me", "원가 · 판매가 · 시장 최저가를 비교해 예상 수익률 산출(신성통상)"],
          ["me", "경쟁 플랫폼 상품 구성 · 프로모션을 비교해 '굿웨어몰' 성장 방향 제안 발표"],
          ["me", "국제통상 · 회계 복수전공, 자기소개서에서도 소싱 · 구매를 희망 업무로 정리"]] },
        { q: "우대 · 뷰티 · 패션잡화 MD 경험 / 자격 · 설득력", title: "패션 온라인 MD 인턴, 그리고 1위 한 발표", ev: [
          ["me", "신성통상(패션) E-MD2팀 온라인 MD 인턴 4개월"],
          ["me", "REBOOT PM으로 최종 발표 1위, 굿웨어몰 제안 발표"],
          ["me", "Canva K-뷰티 포스터 · Higgsfield 모델 워킹 영상 등 뷰티 · 패션 콘텐츠 제작"]] }
      ],
      day1Title: "입사하면 바로 할 수 있는 일",
      day1: [
        "담당 브랜드의 크리에이터별 코드 · 링크 성과를 한 표로 묶어 전환율과 정산을 같이 봅니다.",
        "크리에이터 후보를 조회수 · 구독자 · 카테고리로 비교한 리스트와 제안 메일 초안을 준비합니다.",
        "브랜드사 신제품은 원가 · 판매가 · 경쟁가를 먼저 계산해 KPI에 맞는 제안 가격을 잡습니다."
      ],
      order: "bstudio"
    },

    noricare: {
      heroSub: '한국 제품을 <b>처음부터 미국 소비자와 규제에 맞춰</b> 리브랜딩하고, 팔 수 있는 홈페이지까지 만들어 봤습니다. CARETIN처럼 글로벌을 전제로 한 브랜드에서 그 경험을 쓰겠습니다.',
      fitTitle: "노리케어(CARETIN) 영업 직무와 제 경험",
      fitLead: "공고의 주요 업무와 자격 요건에 맞춰 근거를 정리했습니다. 「내 담당」과 「팀 결과」를 나눠 표시했습니다.",
      closing: "국내 채널부터 해외 바이어까지,<br>브랜드의 다음 장을 같이 만들겠습니다.",
      fit: [
        { q: "주요 업무 · 네이버 등 온라인 채널 운영 · 프로모션", title: "온라인 채널 상품 운영을 실무로 해 봤습니다", ev: [
          ["me", "신성통상 인턴: 자사몰 · 네이버 · 무신사 상품 등록, 가격 설정, 프로모션 세팅, 판매 실적 관리"],
          ["me", "REBOOT 자사몰을 직접 구축: 장바구니 · 주문 · 할인코드 · 팝업 · 재고 관리"]] },
        { q: "주요 업무 · 해외 바이어 커뮤니케이션 · 수출 자료 · 제안서", title: "수출 실무를 배우고, 서류 자동화로 만들어 봤습니다", ev: [
          ["me", "무역 AX 과정: 바이어 발굴 · 응대 · 사후 관리, 수출원가 계산, 무역서류 작성, 인코텀즈 2020"],
          ["team", "ForwardUs: Offer Sheet를 읽어 C/I · P/L을 자동 작성, 메인 챗봇 기획 담당"],
          ["me", "영국 케임브리지 어학연수 6개월 · OPIc IH"]] },
        { q: "현황 · 글로벌 규제 대응 · 외부 파트너 협업", title: "해외 광고 규제를 근거와 함께 걸러 냈습니다", ev: [
          ["me", "FDA 경고장의 문제 표현으로 만든 규칙으로 홈페이지 상세페이지 · 챗봇 답변 자동 점검"],
          ["team", "위험 문구를 근거 조항과 함께 정리해 법무 · 품질팀에 검토 요청을 보내는 흐름 설계"]] },
        { q: "자격 · 스스로 자료를 찾고 빠르게 배우는 사람", title: "8일 만에 기획부터 배포까지 해냈습니다", ev: [
          ["me", "REBOOT 홈페이지를 10.21–10.28 사이 기획 · 개발 · Render 배포, 구축 보고서 작성"],
          ["me", "학술대회: 러시아-우크라이나 전쟁의 공급망 영향을 스스로 분석해 발표"],
          ["me", "Excel 함수 · 피벗, PowerPoint 활용 능력 상"]] }
      ],
      day1Title: "입사하면 바로 할 수 있는 일",
      day1: [
        "네이버 등 국내 채널 상품 페이지와 프로모션을 운영하고, 판매 데이터를 주간 표로 정리합니다.",
        "진출 국가별로 피해야 할 광고 표현을 정리해, 해외용 상세페이지 · 제안서 문구를 먼저 점검합니다.",
        "바이어 제안서 · 후속 메일 초안과 바이어 관리표를 만들어 커뮤니케이션 누락을 줄입니다."
      ],
      order: "noricare"
    }
  };

  var body = document.body;
  var fitGrid = document.getElementById("fitGrid");
  var fitDay1 = document.getElementById("fitDay1");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function renderFit(c, animate) {
    fitGrid.innerHTML = c.fit.map(function (f, i) {
      return '<article class="fit-card' + (animate ? " stagger" : "") + '" style="animation-delay:' + (i * 70) + 'ms">' +
        '<div class="fit-q"><span class="tag-q">공고</span><p>' + esc(f.q) + '</p></div>' +
        '<h3>' + esc(f.title) + '</h3>' +
        '<ul class="fit-ev">' + f.ev.map(function (e) {
          return '<li><span class="who' + (e[0] === "me" ? " me" : "") + '">' + (e[0] === "me" ? "내 담당" : "팀 결과") + '</span><span>' + esc(e[1]) + '</span></li>';
        }).join("") + '</ul></article>';
    }).join("");
    fitDay1.innerHTML = '<h3><small>DAY 1</small>' + esc(c.day1Title) + '</h3><ol>' +
      c.day1.map(function (d) { return "<li><span>" + esc(d) + "</span></li>"; }).join("") + "</ol>";
  }

  function orderWorks(key) {
    var items = Array.prototype.slice.call(document.querySelectorAll("#works .work"));
    items.forEach(function (el, i) {
      var r = key ? parseInt(el.getAttribute("data-rank-" + key), 10) : i + 1;
      el.style.order = r;
      el.classList.toggle("top", !!key && r <= 3);
    });
  }

  function applyCompany(key, animate) {
    if (!COMPANIES[key]) key = "all";
    var c = COMPANIES[key];
    body.setAttribute("data-company", key);
    document.querySelectorAll("[data-company-btn]").forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-company-btn") === key ? "true" : "false");
    });
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var k = el.getAttribute("data-bind");
      if (c[k] == null) return;
      el.innerHTML = c[k];
      if (animate && !reduce) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }
    });
    renderFit(c, animate && !reduce);
    orderWorks(c.order);
  }

  function companyFromUrl() {
    var h = (location.hash || "").replace("#", "");
    if (COMPANIES[h]) return h;
    var m = /[?&]for=([a-z]+)/.exec(location.search);
    if (m && COMPANIES[m[1]]) return m[1];
    return "all";
  }

  document.querySelectorAll("[data-company-btn]").forEach(function (b) {
    b.addEventListener("click", function () {
      var key = b.getAttribute("data-company-btn");
      applyCompany(key, true);
      try { history.replaceState(null, "", key === "all" ? location.pathname + location.search : "#" + key); } catch (e) {}
    });
  });
  window.addEventListener("hashchange", function () {
    var h = (location.hash || "").replace("#", "");
    if (COMPANIES[h] || h === "") applyCompany(companyFromUrl(), true);
  });
  applyCompany(companyFromUrl(), false);

  /* ---------------- 섹션 이동 (주소의 회사 표시는 유지) ---------------- */
  document.querySelectorAll("a[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href").slice(1);
      var t = id === "top" ? document.body : document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      var y = id === "top" ? 0 : t.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------------- 스크롤: 진행 막대 · 내비 · 현재 섹션 ---------------- */
  var bar = document.getElementById("progressBar");
  var nav = document.getElementById("nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navLinks.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.pageYOffset;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    nav.classList.toggle("scrolled", y > 10);
    var cur = -1;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < 140) cur = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle("active", i === cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- 등장 애니메이션 · 카운트업 ---------------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var to = parseFloat(el.getAttribute("data-to"));
    var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
    var fmt = function (v) { return v.toLocaleString("ko-KR", { minimumFractionDigits: dec, maximumFractionDigits: dec }); };
    if (reduce) { el.textContent = fmt(to); return; }
    var start = null, dur = 1300;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(to);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        t.classList.add("in");
        t.querySelectorAll && t.querySelectorAll(".count").forEach(countUp);
        if (t.classList.contains("count")) countUp(t);
        io.unobserve(t);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal, .stats .count, .ring").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal, .ring").forEach(function (el) { el.classList.add("in"); });
  }
  // 안전장치: 1.6초 뒤에도 화면에 있는 요소는 모두 보이게
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add("in"); el.querySelectorAll(".count").forEach(countUp); }
    });
  }, 1600);

  /* ---------------- 프로필 이미지 기울기 ---------------- */
  var portrait = document.querySelector(".portrait");
  if (portrait && !reduce && window.matchMedia("(pointer:fine)").matches) {
    var vis = document.querySelector(".hero-visual");
    vis.addEventListener("mousemove", function (e) {
      var r = vis.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      portrait.style.transform = "perspective(900px) rotateY(" + ((x - 0.5) * 10) + "deg) rotateX(" + ((0.5 - y) * 10) + "deg)";
      portrait.style.setProperty("--mx", x * 100 + "%");
      portrait.style.setProperty("--my", y * 100 + "%");
    });
    vis.addEventListener("mouseleave", function () { portrait.style.transform = ""; });
  }

  /* ---------------- 버튼 자석 효과 ---------------- */
  if (!reduce && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(function (m) {
      m.addEventListener("mousemove", function (e) {
        var r = m.getBoundingClientRect();
        m.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.18 + "px," + (e.clientY - r.top - r.height / 2) * 0.3 + "px)";
      });
      m.addEventListener("mouseleave", function () { m.style.transform = ""; });
    });
  }

  /* ---------------- REBOOT 섹션 빛 따라오기 ---------------- */
  var rb = document.getElementById("reboot");
  if (rb && !reduce) {
    rb.addEventListener("mousemove", function (e) {
      var r = rb.getBoundingClientRect();
      rb.style.setProperty("--gx", ((e.clientX - r.left) / r.width) * 100 + "%");
      rb.style.setProperty("--gy", e.clientY - r.top + "px");
    });
  }

  /* ---------------- 화면 탭 · 라이트박스 ---------------- */
  var tabs = document.querySelectorAll(".tabs button");
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      var g = t.getAttribute("data-tab");
      tabs.forEach(function (x) { var on = x === t; x.classList.toggle("on", on); x.setAttribute("aria-selected", on ? "true" : "false"); });
      document.querySelectorAll("#gallery figure").forEach(function (f) { f.hidden = f.getAttribute("data-group") !== g; });
    });
  });
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img"), lbCap = lb.querySelector(".lb-cap");
  document.querySelectorAll(".zoom").forEach(function (z) {
    z.addEventListener("click", function () {
      var img = z.querySelector("img");
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = z.parentNode.querySelector("figcaption").textContent;
      lb.hidden = false;
      lb.querySelector(".lb-close").focus();
    });
  });
  function closeLb() { lb.hidden = true; }
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-close")) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeLb(); });

  /* ---------------- 개인 작업 필터 ---------------- */
  var filters = document.querySelectorAll(".filters button");
  filters.forEach(function (f) {
    f.addEventListener("click", function () {
      var cat = f.getAttribute("data-filter");
      filters.forEach(function (x) { x.classList.toggle("on", x === f); });
      document.querySelectorAll("#works .work").forEach(function (w) {
        w.classList.toggle("hide", cat !== "all" && w.getAttribute("data-cat") !== cat);
      });
    });
  });

  /* ---------------- 복사 ---------------- */
  var toast = document.getElementById("toast"), toastT;
  function showToast(msg) {
    toast.textContent = msg; toast.classList.add("on");
    clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove("on"); }, 1800);
  }
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var txt = b.getAttribute("data-copy");
      var done = function () { showToast("이메일을 복사했어요 · " + txt); };
      var fail = function () { showToast("복사가 막혀 있어요 · " + txt); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, function () {
          try { var t = document.createElement("textarea"); t.value = txt; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); var ok = document.execCommand("copy"); t.remove(); ok ? done() : fail(); } catch (e) { fail(); }
        });
      } else { fail(); }
    });
  });
})();
