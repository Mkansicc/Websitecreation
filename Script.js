// Helpers
const $ = (sel) => document.querySelector(sel);

const themeBtn = $("#themeBtn");
const printBtn = $("#printBtn");
const demoTheme = $("#demoTheme");
const demoPrint = $("#demoPrint");
const menuBtn = $("#menuBtn");
const mobileNav = $("#mobileNav");
const yearEl = $("#year");

yearEl.textContent = new Date().getFullYear();

// Theme (persist)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

function toggleTheme(){
  const curr = document.documentElement.getAttribute("data-theme");
  const next = curr === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

themeBtn?.addEventListener("click", toggleTheme);
demoTheme?.addEventListener("click", toggleTheme);

// Print/PDF
function doPrint(){ window.print(); }
printBtn?.addEventListener("click", doPrint);
demoPrint?.addEventListener("click", doPrint);

// Mobile menu
menuBtn?.addEventListener("click", () => {
  const isOpen = mobileNav.style.display === "grid";
  mobileNav.style.display = isOpen ? "none" : "grid";
  mobileNav.setAttribute("aria-hidden", String(isOpen));
});
mobileNav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileNav.style.display = "none";
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Reveal on scroll (animations)
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("in");
  });
}, { threshold: 0.12 });

items.forEach(el => io.observe(el));

// Default theme if none set
if (!savedTheme){
  document.documentElement.setAttribute("data-theme", "dark");
}
