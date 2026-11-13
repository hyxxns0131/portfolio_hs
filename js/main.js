/* =========================================================
   강현서 포트폴리오 · 동작
   - 외부 라이브러리 없이 동작 (3D 캐릭터만 model-viewer 사용)
   - "동작 줄이기" 설정이면 애니메이션 없이 바로 표시
   ========================================================= */
(function () {
  "use strict";
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduce = reduceMQ.matches;
  if (!reduce && "IntersectionObserver" in window) document.documentElement.classList.add("js");

  /* ---------- 화면에 들어오면 표시 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (document.documentElement.classList.contains("js")) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
    reveals.forEach(function (el) { io.observe(el); });
    /* 메뉴로 이동한 섹션은 바로 표시 (애니메이션이 내용 확인을 막지 않도록) */
    window.addEventListener("hashchange", function () {
      var t = document.querySelector(location.hash);
      if (t) t.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    });
  }

  /* ---------- 토스트 · 복사 ---------- */
  var toast = document.getElementById("toast"), tt;
  function showToast(m) { toast.textContent = m; toast.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("on"); }, 2200); }
  function copyText(v, label) {
    var ok = function () { showToast(label + "를 복사했어요 · " + v); };
    var fallback = function () {
      var t = document.createElement("textarea");
      t.value = v; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      var done = false;
      try { done = document.execCommand("copy"); } catch (e) {}
      t.remove();
      if (done) ok(); else showToast("복사하지 못했어요. 직접 선택해 주세요 · " + v);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(ok, fallback); else fallback();
  }
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () { copyText(b.dataset.copy, b.dataset.copyLabel || "내용"); });
  });

  /* ---------- 휴대폰 번호 (.env → js/env.js, 없으면 버튼을 만들지 않음) ---------- */
  var phone = window.ENV && window.ENV.PHONE;
  var btns = document.getElementById("contactBtns");
  if (phone && btns) {
    var a = document.createElement("a");
    a.className = "btn small line-l"; a.href = "tel:" + phone.replace(/[^0-9+]/g, "");
    a.textContent = "전화 걸기 · " + phone;
    btns.appendChild(a);
  }

  /* ---------- 헤더 · 모바일 메뉴 · 현재 위치 ---------- */
  var header = document.getElementById("header");
  var menuBtn = document.getElementById("menuBtn"), gnb = document.getElementById("gnb");
  var links = Array.prototype.slice.call(gnb.querySelectorAll('a[href^="#"]'));
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.querySelector(".menu-txt").textContent = open ? "닫기" : "메뉴";
    gnb.classList.toggle("open", open);
  }
  menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  gnb.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && gnb.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });
  document.addEventListener("click", function (e) { if (gnb.classList.contains("open") && !header.contains(e.target)) setMenu(false); });
  function onScroll() {
    var cur = -1;
    links.forEach(function (a, i) { var s = document.querySelector(a.getAttribute("href")); if (s && s.getBoundingClientRect().top < header.offsetHeight + 90) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("on", i === cur); if (i === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 프로젝트 폴더 탭 ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.pf-tabs [role="tab"]'));
  function selectTab(t, focus) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute("aria-selected", on ? "true" : "false");
      x.tabIndex = on ? 0 : -1;
      document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) t.focus();
    document.querySelectorAll("#" + t.getAttribute("aria-controls") + " .reveal").forEach(function (el) { el.classList.add("in"); });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { selectTab(t); });
    t.addEventListener("keydown", function (e) {
      var n = null;
      if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") n = tabs[0];
      else if (e.key === "End") n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });
  /* 주소 끝이 #reboot · #forwardus · #personal 이면 그 폴더를 열고 이동 */
  function openFromHash() {
    var h = location.hash.replace("#", "");
    var t = tabs.filter(function (x) { return x.dataset.hash === h; })[0];
    if (t) { selectTab(t); document.getElementById("work").scrollIntoView(); }
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();

  /* ---------- 프로필 사진 칸 (assets/img/me.jpg 가 있으면 표시) ---------- */
  var me = document.getElementById("mePhoto"), empty = document.getElementById("photoEmpty");
  if (me) {
    var showMe = function () { me.hidden = false; empty.hidden = true; };
    if (me.complete && me.naturalWidth) showMe();
    me.addEventListener("load", showMe);
  }

  /* ---------- 이미지 뷰어 (클릭해서 크게 보기) ---------- */
  var lbx = document.getElementById("lbx"), lbxImg = document.getElementById("lbxImg"), stage = document.getElementById("lbxStage");
  var lbxTitle = document.getElementById("lbxTitle"), lbxDesc = document.getElementById("lbxDesc"), lbxCount = document.getElementById("lbxCount");
  var zoomBtn = document.getElementById("lbxZoom"), prevBtn = document.getElementById("lbxPrev"), nextBtn = document.getElementById("lbxNext");
  var group = [], idx = 0, lastFocus = null;

  function groupOf(btn) {
    var g = btn.closest("[data-gallery]");
    return Array.prototype.slice.call((g || document).querySelectorAll(".g-btn"));
  }
  function setZoom(on) {
    stage.classList.toggle("zoomed", on);
    zoomBtn.setAttribute("aria-pressed", on ? "true" : "false");
    zoomBtn.textContent = on ? "축소" : "확대";
    stage.scrollTop = 0; stage.scrollLeft = on ? (stage.scrollWidth - stage.clientWidth) / 2 : 0;
  }
  function show(i) {
    idx = (i + group.length) % group.length;
    var b = group[idx], img = b.querySelector("img");
    lbxImg.src = img.currentSrc || img.src; lbxImg.alt = img.alt;
    lbxTitle.textContent = b.dataset.title || img.alt;
    lbxDesc.textContent = b.dataset.desc || "";
    lbxCount.textContent = (idx + 1) + " / " + group.length;
    var multi = group.length > 1;
    prevBtn.hidden = !multi; nextBtn.hidden = !multi;
    setZoom(false);
  }
  function open(btn) {
    group = groupOf(btn); lastFocus = btn;
    lbx.hidden = false; document.body.classList.add("lbx-open");
    show(group.indexOf(btn));
    document.getElementById("lbxClose").focus();
  }
  function close() {
    lbx.hidden = true; document.body.classList.remove("lbx-open");
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll(".g-btn").forEach(function (b) {
    var img = b.querySelector("img");
    b.setAttribute("aria-label", (b.dataset.title || img.alt) + " 크게 보기");
    b.addEventListener("click", function () { open(b); });
  });
  document.querySelectorAll("[data-open]").forEach(function (b) {
    b.addEventListener("click", function () {
      var first = document.querySelector('[data-gallery="' + b.dataset.open + '"] .g-btn');
      if (first) open(first);
    });
  });
  document.getElementById("lbxClose").addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(idx - 1); });
  nextBtn.addEventListener("click", function () { show(idx + 1); });
  zoomBtn.addEventListener("click", function () { setZoom(!stage.classList.contains("zoomed")); });
  lbxImg.addEventListener("click", function () { setZoom(!stage.classList.contains("zoomed")); });
  stage.addEventListener("click", function (e) { if (e.target === stage) close(); });
  document.addEventListener("keydown", function (e) {
    if (lbx.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowLeft" && group.length > 1) show(idx - 1);
    else if (e.key === "ArrowRight" && group.length > 1) show(idx + 1);
    else if (e.key === "+" || e.key === "=") setZoom(true);
    else if (e.key === "-" || e.key === "_") setZoom(false);
    else if (e.key === "Tab") {
      /* 뷰어 안에서만 포커스 이동 */
      var f = Array.prototype.slice.call(lbx.querySelectorAll("button:not([hidden])"));
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  /* 스와이프로 이전 · 다음 */
  var sx = null;
  stage.addEventListener("touchstart", function (e) { if (!stage.classList.contains("zoomed")) sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (sx === null || group.length < 2) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 50) show(dx > 0 ? idx - 1 : idx + 1);
  });
})();

/* ===== 3D 캐릭터 (model-viewer) =====
   - 텍스처 경계에 흰 점이 번지는 현상을 막기 위해 LINEAR 필터 사용
   - index.html을 더블클릭(file://)으로 열면 .glb를 못 읽으므로 js/char-glb.js로 대신 불러옴
   - 손을 든 채 흔드는 구간(WAVE_FROM~WAVE_TO초)만 반복
   - "동작 줄이기" 설정이면 손을 든 자세로 멈춤 */
(function () {
  var mv = document.querySelector(".char3d");
  if (!mv) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) mv.removeAttribute("autoplay");
  if (location.protocol === "file:") {
    var sc = document.createElement("script");
    sc.src = "js/char-glb.js";
    sc.onload = function () { if (window.CHAR_GLB) mv.src = window.CHAR_GLB; };
    document.body.appendChild(sc);
  }
  var WAVE_FROM = 1.0, WAVE_TO = 2.1;
  function waveLoop() {
    if (!mv.paused && mv.currentTime >= WAVE_TO) mv.currentTime = WAVE_FROM;
    requestAnimationFrame(waveLoop);
  }
  mv.addEventListener("load", function () {
    try {
      mv.model.materials.forEach(function (m) {
        var t = m.pbrMetallicRoughness.baseColorTexture.texture;
        if (t && t.sampler) t.sampler.setMinFilter(9729);
      });
    } catch (e) {}
    if (reduce) { mv.pause(); mv.currentTime = 1.5; return; }
    mv.currentTime = 0; mv.play();
    requestAnimationFrame(waveLoop);
  });
})();
