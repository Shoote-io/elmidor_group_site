/* =========================================================
   Elmidor Group – Site Script (Optimized)
   ========================================================= */

// Safe query helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// YEAR IN FOOTER
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// MOBILE MENU (ARIA-friendly)
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

// DEMO MODAL (open/close + ESC)
function openDemo() {
  const modal = $("#demoModal");
  const video = $("#demoVideo");
  if (!modal || !video) return;
  modal.style.display = "flex";
  try { video.play(); } catch (e) {}
}

function closeDemo() {
  const modal = $("#demoModal");
  const video = $("#demoVideo");
  if (!modal || !video) return;
  modal.style.display = "none";
  try { video.pause(); } catch (e) {}
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDemo();
});

// ANIMATIONS ([data-animate])
document.addEventListener("DOMContentLoaded", () => {
  const animated = $$("[data-animate]");
  if (!animated.length) return;

  if (!("IntersectionObserver" in window)) {
    animated.forEach((el) => el.classList.add("in"));
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

  animated.forEach((el) => io.observe(el));
});

// FIX MAILTO
document.addEventListener("DOMContentLoaded", () => {
  $$('form[action^="mailto:support.elmidorgroup"]').forEach((form) => {
    form.setAttribute("action", "mailto:support@elmidorgroup.com");
  });
});

// NEWSLETTER
function subscribe(e) {
  e?.preventDefault();
  const email = $("#newsletterEmail")?.value.trim();
  if (!email) return alert("Please enter your email.");
  alert("Thank you! Email " + email + " received.");
  $("#newsletterForm")?.reset();
  return false;
}

// SOCIAL SHARE
function share(which) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const links = {
    x: `https://x.com/intent/tweet?text=${title}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  };
  if (links[which]) window.open(links[which], "_blank", "noopener");
}
