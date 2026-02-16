const $ = (sel) => document.querySelector(sel);

const themeBtn = $("#themeBtn");
const printBtn = $("#printBtn");
const menuBtn = $("#menuBtn");
const mobileNav = $("#mobileNav");
const yearEl = $("#year");

yearEl.textContent = new Date().getFullYear();

// Theme (persist)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
if (!savedTheme) document.documentElement.setAttribute("data-theme", "dark");

function toggleTheme(){
  const curr = document.documentElement.getAttribute("data-theme");
  const next = curr === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
themeBtn?.addEventListener("click", toggleTheme);

// Print/PDF
printBtn?.addEventListener("click", () => window.print());

// Mobile menu
menuBtn?.addEventListener("click", () => {
  const open = mobileNav.style.display === "grid";
  mobileNav.style.display = open ? "none" : "grid";
  mobileNav.setAttribute("aria-hidden", String(open));
});
mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.style.display = "none";
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Reveal on scroll
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });
items.forEach(el => io.observe(el));
