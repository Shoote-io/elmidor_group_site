/* =========================================================
   Elmidor Group – Site Script
   ========================================================= */

// Safe query helpers
<script>
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
});
});
</script>

// Year in footer
<script>
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
});
});
</script>

// Mobile menu toggle (ARIA-friendly)
<script>
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
</script>

// Demo modal controls (open/close + ESC/outside)
<script>
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
});
</script>

// Intersection Observer for [data-animate]
<script>
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
});
</script>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    img.addEventListener('load', () => img.classList.add('loaded'));
  });
});
</script>

   // Mobile nav toggle
<script>
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => {
  const isOpen = navLinks.getAttribute('data-open') === 'true';
  navLinks.setAttribute('data-open', String(!isOpen));
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});
});
</script>

// Scroll reveal
<script>
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
});
});
</script>

// Newsletter
<script>
function subscribe(e) {
  e && e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  if (!email) { alert('Please enter your email.'); return false; }
  alert('Thank you! Email ' + email + ' received.');
  document.getElementById('newsletterForm').reset();
  return false;
}
});
});
</script>

// Share helper
<script>
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
});
</script>
