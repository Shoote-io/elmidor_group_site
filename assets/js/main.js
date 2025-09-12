/* =========================================================
   Elmidor Group – Site Script
   ========================================================= */

// Safe query helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Mobile menu toggle (ARIA-friendly)
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");

  if (!menuBtn || !navLinks) return;

  const toggleMenu = (open) => {
    const next = typeof open === "boolean" ? open : navLinks.dataset.open !== "true";
    navLinks.dataset.open = String(next);
    menuBtn.setAttribute("aria-expanded", String(next));
  };

  menuBtn.addEventListener("click", () => toggleMenu());

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && e.target !== menuBtn && navLinks.dataset.open === "true") {
      toggleMenu(false);
    }
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.dataset.open === "true") toggleMenu(false);
  });
});

// Demo modal controls (open/close + ESC/outside)
function openDemo(){
  const modal = document.getElementById('demoModal');
  const video = document.getElementById('demoVideo');
  if (!modal || !video) return;
  modal.style.display = 'flex';
  try { video.play(); } catch(e){}
}

function closeDemo(){
  const modal = document.getElementById('demoModal');
  const video = document.getElementById('demoVideo');
  if (!modal || !video) return;
  modal.style.display = 'none';
  try { video.pause(); } catch(e){}
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDemo();
});

// Intersection Observer for [data-animate]
document.addEventListener("DOMContentLoaded", () => {
  const animated = $$("[data-animate]");
  if (!animated.length || !("IntersectionObserver" in window)) {
    // Fallback: make them visible
    animated.forEach(el => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add("in");
        io.unobserve(target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  animated.forEach(el => io.observe(el));
});

// Helper: convert inline mailto form action if needed
// (Replace incomplete "mailto:support.elmidorgroup" with valid address)
document.addEventListener("DOMContentLoaded", () => {
  $$('form[action^="mailto:support.elmidorgroup"]').forEach(form => {
    form.setAttribute("action", "mailto:support@elmidorgroup.com");
  });
});
