<script>
/* =========================================================
   Elmidor Group – Optimized Unified Script
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

document.addEventListener("DOMContentLoaded", () => {

  // Year in footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle (ARIA-friendly)
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  if (menuBtn && navLinks) {
    const toggleMenu = (open) => {
      const next = typeof open === "boolean" ? open : navLinks.dataset.open !== "true";
      navLinks.dataset.open = String(next);
      menuBtn.setAttribute("aria-expanded", String(next));
    };
    menuBtn.addEventListener("click", () => toggleMenu());
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && e.target !== menuBtn && navLinks.dataset.open === "true") toggleMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.dataset.open === "true") toggleMenu(false);
    });
  }

  // Lazy image fade-in
  $$('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => img.classList.add('loaded'));
  });

  // Intersection Observer for animations
  const animated = $$("[data-animate]");
  if (animated.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          target.classList.add("in");
          io.unobserve(target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    animated.forEach(el => io.observe(el));
  } else {
    animated.forEach(el => el.classList.add("in"));
  }

  // Newsletter form
  const form = $("#newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = $("#newsletterEmail").value.trim();
      if (!email) return alert("Please enter your email.");
      alert(`Thank you! Email ${email} received.`);
      form.reset();
    });
  }

});

// Demo modal
function openDemo() {
  const modal = $("#demoModal");
  const video = $("#demoVideo");
  if (!modal || !video) return;
  modal.style.display = "flex";
  try { video.play(); } catch(e){}
}
function closeDemo() {
  const modal = $("#demoModal");
  const video = $("#demoVideo");
  if (!modal || !video) return;
  modal.style.display = "none";
  try { video.pause(); } catch(e){}
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDemo();
});

// Share helper
function share(which) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const map = {
    x: `https://x.com/intent/tweet?text=${title}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  };
  if (map[which]) window.open(map[which], "_blank", "noopener");
}
</script>
