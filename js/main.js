/* =========================================================
   강현서 포트폴리오 · 모션
   GSAP + ScrollTrigger + Lenis (CDN). 라이브러리가 없으면 기본 표시로 동작.
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!reduce) document.documentElement.classList.add("js");

  /* ---------- 별 배경 ---------- */
  document.querySelectorAll("canvas.stars").forEach(function (cv) {
    var ctx = cv.getContext("2d"), stars = [], w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      w = cv.offsetWidth; h = cv.offsetHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round((w * h) / 5200);
      stars = [];
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.2, a: Math.random(), s: Math.random() * 0.015 + 0.004 });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        if (!reduce) { s.a += s.s; }
        var alpha = 0.25 + Math.abs(Math.sin(s.a)) * 0.75;
        ctx.fillStyle = "rgba(255,255,255," + alpha.toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) requestAnimationFrame(draw);
    }
    size(); draw();
    window.addEventListener("resize", size);
  });

  /* ---------- 숫자 카운트업 ---------- */
  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    var to = parseFloat(el.dataset.to), dec = parseInt(el.dataset.dec || "0", 10);
    var fmt = function (v) { return v.toLocaleString("ko-KR", { minimumFractionDigits: dec, maximumFractionDigits: dec }); };
    if (reduce) { el.textContent = fmt(to); return; }
    var t0 = null;
    (function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(to);
    })(performance.now());
  }

  /* ---------- 이메일 복사 ---------- */
  var toast = document.getElementById("toast"), tt;
  function showToast(m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("on"); }, 1800); }
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.dataset.copy;
      var ok = function () { showToast("이메일을 복사했어요 · " + v); }, no = function () { showToast(v); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(ok, no); else no();
    });
  });

  /* ---------- 휴대폰 번호 (.env → js/env.js 에서 읽음, 없으면 버튼 숨김) ---------- */
  var phone = window.ENV && window.ENV.PHONE;
  var phoneBtn = document.getElementById("phoneBtn");
  if (phone && phoneBtn) {
    phoneBtn.hidden = false;
    phoneBtn.textContent = phone + " 복사";
    phoneBtn.addEventListener("click", function () {
      var ok = function () { showToast("번호를 복사했어요 · " + phone); }, no = function () { showToast(phone); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(phone).then(ok, no); else no();
    });
  }

  /* ---------- 헤더 · 진행 막대 · 현재 메뉴 ---------- */
  var header = document.getElementById("header"), bar = document.getElementById("progressBar");
  var darks = Array.prototype.slice.call(document.querySelectorAll(".dark"));
  var gnb = Array.prototype.slice.call(document.querySelectorAll(".gnb a"));
  function onScroll() {
    var y = window.pageYOffset, H = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (H > 0 ? (y / H) * 100 : 0) + "%";
    var overDark = darks.some(function (d) { var r = d.getBoundingClientRect(); return r.top <= 36 && r.bottom >= 36; });
    header.classList.toggle("light", !overDark);
    var cur = -1;
    gnb.forEach(function (a, i) { var s = document.querySelector(a.getAttribute("href")); if (s && s.getBoundingClientRect().top < 160) cur = i; });
    gnb.forEach(function (a, i) { a.classList.toggle("on", i === cur); });
  }

  /* ---------- 부드러운 스크롤 (Lenis) ---------- */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll("a[data-scroll]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href"); var t = id === "#top" ? 0 : document.querySelector(id);
      if (t === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(t, { offset: id === "#top" ? 0 : -60, duration: 1.2 });
      else window.scrollTo({ top: t === 0 ? 0 : t.getBoundingClientRect().top + pageYOffset - 60, behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ---------- 라이브러리가 없거나 모션 줄이기일 때 ---------- */
  if (!hasGsap || reduce) {
    document.documentElement.classList.remove("js");
    document.querySelectorAll(".count").forEach(countUp);
    document.querySelectorAll("mark.sweep").forEach(function (m) { m.classList.add("on"); });
    document.querySelectorAll(".ax-row").forEach(function (r) { r.classList.add("in"); });
    var fv = document.querySelector(".fu-visual"); if (fv) fv.classList.add("play");
    document.querySelectorAll(".pain-row").forEach(function (r) { r.classList.add("in"); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* HERO 등장 */
  gsap.from(".hero-name .ln > span", { yPercent: 110, duration: 1.2, ease: "expo.out", delay: 0.1 });
  gsap.from(".hero-title .ln > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.35 });
  gsap.from(".hero-fade", { y: 20, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.05 });

  /* 형광펜 스윕 */
  document.querySelectorAll("mark.sweep").forEach(function (m, i) {
    ScrollTrigger.create({ trigger: m, start: "top 78%", once: true,
      onEnter: function () { setTimeout(function () { m.classList.add("on"); }, (i % 2) * 450); } });
  });

  /* 대시보드: 인턴 → 대시보드 화살표 채우기 */
  gsap.utils.toArray(".dash-row").forEach(function (r) {
    ScrollTrigger.create({ trigger: r, start: "top 80%", once: true, onEnter: function () { r.classList.add("in"); } });
  });

  /* ForwardUs 흐름 · Git 그래프 */
  ScrollTrigger.create({ trigger: ".fu-visual", start: "top 80%", once: true, onEnter: function () { document.querySelector(".fu-visual").classList.add("play"); } });
  ScrollTrigger.create({ trigger: ".git", start: "top 75%", once: true, onEnter: function () { document.querySelector(".git").classList.add("in"); } });

  /* 페인포인트 → 결과물 화살표 */
  gsap.utils.toArray(".pain-row").forEach(function (r) {
    ScrollTrigger.create({ trigger: r, start: "top 80%", once: true, onEnter: function () { r.classList.add("in"); } });
  });

  /* 공통 등장 */
  gsap.utils.toArray(".reveal").forEach(function (el) {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%", once: true,
        onEnter: function () { el.classList.add("in"); } } });
  });

  /* USE: 카드가 화면 가운데를 지날 때 활성화 + 왼쪽 목차 연동 */
  var cards = gsap.utils.toArray(".use-card"), idx = gsap.utils.toArray(".use-index li");
  cards.forEach(function (c, i) {
    gsap.from(c, { y: 60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: c, start: "top 90%", once: true } });
    ScrollTrigger.create({ trigger: c, start: "top 55%", end: "bottom 45%",
      onToggle: function (s) {
        c.classList.toggle("on", s.isActive);
        if (s.isActive) idx.forEach(function (li, k) { li.classList.toggle("on", k === i); });
      } });
  });

  /* REBOOT 단계: 선이 채워지고 체크가 켜짐 */
  gsap.to("#stepsFill", { scaleY: 1, ease: "none",
    scrollTrigger: { trigger: "#steps", start: "top 60%", end: "bottom 60%", scrub: true } });
  gsap.utils.toArray(".step").forEach(function (s) {
    gsap.from(s.querySelector(".step-card"), { x: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: s, start: "top 85%", once: true } });
    ScrollTrigger.create({ trigger: s, start: "top 60%",
      onEnter: function () { s.classList.add("on"); s.querySelectorAll(".count").forEach(countUp); },
      onLeaveBack: function () { s.classList.remove("on"); } });
  });
  gsap.from(".gov li", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, scrollTrigger: { trigger: ".gov ul", start: "top 85%", once: true } });
  gsap.from(".shots figure", { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".shots", start: "top 88%", once: true } });

  /* INTERN: 섹션을 잠깐 고정하고 문장을 한 줄씩 또렷하게 */
  var lines = gsap.utils.toArray(".focus-list li");
  ScrollTrigger.create({
    trigger: ".intern", start: "top top", end: "+=" + (lines.length * 55) + "%", pin: true,
    onUpdate: function (s) {
      var k = Math.min(lines.length - 1, Math.floor(s.progress * lines.length));
      lines.forEach(function (li, i) { li.classList.toggle("on", i <= k); });
    }
  });

  /* AX: 화살표 채우기 */
  gsap.utils.toArray(".ax-row").forEach(function (r, i) {
    gsap.from(r, { x: i % 2 ? 40 : -40, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: r, start: "top 88%", once: true, onEnter: function () { r.classList.add("in"); } } });
  });

  /* 결과물 목록 */
  gsap.from(".work", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.05, scrollTrigger: { trigger: ".works", start: "top 85%", once: true } });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();

/* ===== 3D 캐릭터 (model-viewer) =====
   텍스처 경계에 흰 점이 번지는 현상을 막기 위해 밉맵 대신 LINEAR 필터 사용 */
(function(){
  var mv = document.querySelector('.char3d');
  if(!mv) return;
  mv.addEventListener('load', function(){
    try{
      mv.model.materials.forEach(function(m){
        var t = m.pbrMetallicRoughness.baseColorTexture.texture;
        if(t && t.sampler) t.sampler.setMinFilter(9729);
      });
    }catch(e){}
  });
})();
