(function () {
  const root = document.documentElement;

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme
  const themeBtn = document.getElementById("themeBtn");
  const saved = localStorage.getItem("site_theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("site_theme", next);
  }

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Print / PDF
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.addEventListener("click", () => window.print());

  // Demo buttons in preview
  const demoTheme = document.getElementById("demoTheme");
  const demoPrint = document.getElementById("demoPrint");
  if (demoTheme) demoTheme.addEventListener("click", toggleTheme);
  if (demoPrint) demoPrint.addEventListener("click", () => window.print());

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  let open = false;

  function setMobileNav(state) {
    open = state;
    if (!mobileNav) return;
    mobileNav.style.display = open ? "block" : "none";
    mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
    if (menuBtn) menuBtn.textContent = open ? "✕" : "☰";
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => setMobileNav(!open));
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => setMobileNav(false));
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
