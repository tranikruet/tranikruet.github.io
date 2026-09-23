/* Shah Md Tasrifur Rahim — site behaviour. Plain JavaScript, no libraries. */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Email (assembled here so spam bots can't read it from the HTML) ---------- */
  document.querySelectorAll("[data-email-user]").forEach(function (a) {
    var addr = a.getAttribute("data-email-user") + "@" + a.getAttribute("data-email-domain");
    a.setAttribute("href", "mailto:" + addr);
    var label = a.querySelector("[data-email-text]");
    if (label) label.textContent = addr;
  });

  /* ---------- Photo gallery: one photo at a time ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (root) {
    var track = root.querySelector(".gallery-track");
    var slides = Array.prototype.slice.call(track.children);
    var caption = root.querySelector(".gallery-caption");
    var count = root.querySelector(".gallery-count");
    var viewport = root.querySelector(".gallery-viewport");
    var i = 0, timer = null, n = slides.length, DELAY = 5000;

    function show(k) {
      i = (k + n) % n;
      track.style.transform = "translateX(" + (-100 * i) + "%)";
      slides.forEach(function (s, j) { s.setAttribute("aria-hidden", j === i ? "false" : "true"); });
      if (caption) caption.textContent = slides[i].getAttribute("data-caption") || "";
      if (count) count.textContent = (i + 1) + " / " + n;
    }
    function start() { if (!reduceMotion && !timer) timer = setInterval(function () { show(i + 1); }, DELAY); }
    function stop() { clearInterval(timer); timer = null; }

    root.querySelector("[data-prev]").addEventListener("click", function () { stop(); show(i - 1); start(); });
    root.querySelector("[data-next]").addEventListener("click", function () { stop(); show(i + 1); start(); });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { stop(); show(i - 1); }
      if (e.key === "ArrowRight") { stop(); show(i + 1); }
    });
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });

    /* Swipe on phones */
    var x0 = null;
    viewport.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    viewport.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { stop(); show(dx < 0 ? i + 1 : i - 1); start(); }
    });

    show(0);
    start();
  });

  /* ---------- CV: buttons appear automatically once the PDF is uploaded ---------- */
  var cv = document.querySelector("[data-cv]");
  if (cv) {
    var path = cv.getAttribute("data-cv");
    fetch(path, { method: "HEAD", cache: "no-store" })
      .then(function (r) {
        var type = r.headers.get("content-type") || "";
        if (r.ok && type.indexOf("pdf") !== -1) {
          cv.querySelector(".cv-actions").hidden = false;
          cv.querySelector(".cv-pending").hidden = true;
        }
      })
      .catch(function () { /* no CV yet, keep the placeholder */ });
  }

  /* ---------- Copy BibTeX ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = document.getElementById(btn.getAttribute("data-copy"));
      if (!pre || !navigator.clipboard) return;
      navigator.clipboard.writeText(pre.textContent.trim()).then(function () {
        var old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = old; }, 1800);
      });
    });
  });

  /* ---------- Gentle reveal on scroll (skipped for reduced motion) ---------- */
  var targets = document.querySelectorAll(".reveal, .timeline");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("is-visible"); });
  }

  /* ---------- Footer: last updated (taken from the server, so it stays current) ---------- */
  var upd = document.querySelector("[data-updated]");
  if (upd) {
    var d = new Date(document.lastModified);
    if (!isNaN(d)) upd.textContent = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
