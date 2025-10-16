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
   // Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => {
  const isOpen = navLinks.getAttribute('data-open') === 'true';
  navLinks.setAttribute('data-open', String(!isOpen));
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

// Scroll reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const els = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: .14 });
  els.forEach(el => io.observe(el));
} else {
  document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('in'));
}

// Newsletter
function subscribe(e) {
  e && e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  if (!email) { alert('Please enter your email.'); return false; }
  alert('Thank you! Email ' + email + ' received.');
  document.getElementById('newsletterForm').reset();
  return false;
}

// Share helper
function share(which) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  let shareUrl = '';
  if (which === 'x') shareUrl = 'https://x.com/intent/tweet?text=' + title + '%20' + url;
  if (which === 'facebook') shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  if (which === 'whatsapp') shareUrl = 'https://wa.me/?text=' + title + '%20' + url;
  if (which === 'linkedin') shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
  if (shareUrl) window.open(shareUrl, '_blank', 'noopener');
}

});
