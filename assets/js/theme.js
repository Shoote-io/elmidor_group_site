document.addEventListener("DOMContentLoaded", () => {
  const particles = document.querySelector(".particles");
  if (particles) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = Math.random() * 6 + 4;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${15 + Math.random() * 20}s`;
      p.style.animationDelay = `${Math.random() * 10}s`;
      particles.appendChild(p);
    }
  } else {
    console.warn("⚠️ .particles div not found in page!");
  }
});

