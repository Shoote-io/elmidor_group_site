document.addEventListener("DOMContentLoaded", () => {
  const particles = document.querySelector(".particles");
  if (particles) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      p.style.width = `${Math.random()*6+4}px`;
      p.style.height = p.style.width;
      p.style.left = `${Math.random()*100}%`;
      p.style.animationDuration = `${15 + Math.random()*20}s`;
      p.style.animationDelay = `${Math.random()*10}s`;
      particles.appendChild(p);
    }
  }
});
