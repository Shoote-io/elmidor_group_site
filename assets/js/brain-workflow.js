/* brain-workflow.js
   Lè fichye chaje, li kreye yon SVG "brain" ak plizyè chemen nèwon,
   epi li ajoute anpil patikil (circle) ki swiv chemen yo ak varyasyon vitès,
   koulè ak twinkle. Customize fasil anba.
*/

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("brain-workflow");
  if (!container) {
    console.warn("brain-workflow: pa jwenn <div id='brain-workflow'> nan paj la.");
    return;
  }

  // --------- Configurable ----------
  const PARTICLES_PER_PATH = 6; // konbyen patikil pou chak path
  const PATHS = [
    // plis path -> plis branch nèwon; modifye D strings si ou vle
    "M100,150 Q150,40 240,80 Q330,40 400,150 Q350,240 250,210 Q150,270 100,150Z",
    "M160,140 Q220,80 300,120 Q260,170 200,140Z",
    "M210,170 Q260,260 320,180 Q280,140 220,170Z",
    "M140,200 Q190,160 260,200 Q240,230 180,220Z",
    "M280,110 Q320,80 360,120 Q330,150 290,130Z"
  ];
  const COLORS = ["#5ad1e6","#7c5cff","#00f8ff","#89f0ff"];

  // --------- Build SVG skeleton ----------
  container.innerHTML = `
  <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
    <defs>
      <!-- gradient fill for subtle brain texture -->
      <linearGradient id="brainFillGradient" x1="0" x2="1">
        <stop offset="0%" stop-color="#071021" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#091022" stop-opacity="0.6"/>
      </linearGradient>

      <!-- glow filter for particles and paths -->
      <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <!-- soft inner shadow for brain outline -->
      <filter id="softInnerShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
        <feOffset dx="0" dy="2" result="offsetBlur"/>
        <feComposite in="offsetBlur" in2="SourceAlpha" operator="arithmetic"
                     k1="0" k2="-1" k3="1" k4="0" result="innerShadow"/>
        <feMerge>
          <feMergeNode in="innerShadow"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <!-- subtle noise overlay -->
      <filter id="noise" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" result="turb"/>
        <feColorMatrix type="saturate" values="0" in="turb" result="noiseMono"/>
        <feBlend in="SourceGraphic" in2="noiseMono" mode="screen"/>
      </filter>
    </defs>

    <!-- Brain outline (big shape) -->
    <path class="brain-outline" d="${PATHS[0]}"></path>

    <!-- container for neuron paths and particles -->
    <g id="neurons"></g>
    <g id="particles"></g>

    <!-- subtle noise rect to add texture (low opacity) -->
    <rect x="0" y="0" width="100%" height="100%" fill="#000" opacity="0.02" filter="url(#noise)"></rect>
  </svg>
  `;

  const svg = container.querySelector("svg");
  const neuronsGroup = svg.querySelector("#neurons");
  const particlesGroup = svg.querySelector("#particles");

  // create paths (exclude index 0 if you used it for outline)
  // If PATHS includes the outline as first, create neurons from rest.
  for (let i = 1; i < PATHS.length; i++) {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", PATHS[i]);
    p.setAttribute("class", "neuron" + (i % 2 === 0 ? " strong" : ""));
    p.setAttribute("id", `workflow${i}`);
    neuronsGroup.appendChild(p);
  }

  // Create particles that follow each path
  const createdPaths = svg.querySelectorAll(".neuron");
  createdPaths.forEach((pathEl, pathIndex) => {
    for (let i = 0; i < PARTICLES_PER_PATH; i++) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");

      // randomize size and color
      const r = (Math.random() * 2.8) + 1.6; // 1.6 - 4.4
      c.setAttribute("r", r.toString());

      const color = COLORS[(pathIndex + i) % COLORS.length];
      c.setAttribute("fill", color);
      c.setAttribute("class", "spark");

      // append animateMotion
      const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
      // duration randomized per particle
      const baseDur = 2.0 + Math.random() * 3.5; // 2 - 5.5s
      animateMotion.setAttribute("dur", baseDur.toFixed(2) + "s");
      animateMotion.setAttribute("repeatCount", "indefinite");
      // random begin to spread particles
      const begin = (Math.random() * 3.5).toFixed(2) + "s";
      animateMotion.setAttribute("begin", begin);

      // use mpath to reference the path
      const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
      mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + pathEl.id);
      animateMotion.appendChild(mpath);

      // small offset along the path to avoid collisions visually:
      // we add a small animateTransform on the circle for bobbing/twinkle
      const animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate");
      animateOpacity.setAttribute("attributeName", "opacity");
      animateOpacity.setAttribute("values", "0.12;1;0.15");
      animateOpacity.setAttribute("dur", (0.9 + Math.random() * 1.5).toFixed(2) + "s");
      animateOpacity.setAttribute("repeatCount", "indefinite");
      animateOpacity.setAttribute("begin", begin);

      const animateScale = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
      animateScale.setAttribute("attributeName", "transform");
      animateScale.setAttribute("type", "scale");
      // random small scale changes
      const s1 = (0.7 + Math.random() * 0.5).toFixed(2);
      const s2 = (1.05 + Math.random() * 0.35).toFixed(2);
      animateScale.setAttribute("values", `${s1}; ${s2}; ${s1}`);
      animateScale.setAttribute("dur", (0.8 + Math.random() * 1.8).toFixed(2) + "s");
      animateScale.setAttribute("repeatCount", "indefinite");
      animateScale.setAttribute("additive", "sum");
      animateScale.setAttribute("begin", begin);

      // attach animations and add to DOM
      c.appendChild(animateOpacity);
      c.appendChild(animateScale);
      c.appendChild(animateMotion);
      particlesGroup.appendChild(c);
    }
  });

  // OPTIONAL: allow runtime tuning via window.brainWorkflow (for dev)
  window.brainWorkflow = {
    svg,
    container,
    setParticleCount: (nPerPath) => {
      // simple rebuild: remove particles and recreate with new count
      while (particlesGroup.firstChild) particlesGroup.removeChild(particlesGroup.firstChild);
      for (let pathIndex = 0; pathIndex < createdPaths.length; pathIndex++) {
        const pathEl = createdPaths[pathIndex];
        for (let i = 0; i < nPerPath; i++) {
          const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          const r = (Math.random() * 2.8) + 1.6;
          c.setAttribute("r", r.toString());
          const color = COLORS[(pathIndex + i) % COLORS.length];
          c.setAttribute("fill", color);
          c.setAttribute("class", "spark");
          const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
          const baseDur = 2.0 + Math.random() * 3.5;
          animateMotion.setAttribute("dur", baseDur.toFixed(2) + "s");
          animateMotion.setAttribute("repeatCount", "indefinite");
          const begin = (Math.random() * 3.5).toFixed(2) + "s";
          animateMotion.setAttribute("begin", begin);
          const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
          mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + pathEl.id);
          animateMotion.appendChild(mpath);
          const animateOpacity = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animateOpacity.setAttribute("attributeName", "opacity");
          animateOpacity.setAttribute("values", "0.12;1;0.15");
          animateOpacity.setAttribute("dur", (0.9 + Math.random() * 1.5).toFixed(2) + "s");
          animateOpacity.setAttribute("repeatCount", "indefinite");
          animateOpacity.setAttribute("begin", begin);
          const animateScale = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
          animateScale.setAttribute("attributeName", "transform");
          animateScale.setAttribute("type", "scale");
          const s1 = (0.7 + Math.random() * 0.5).toFixed(2);
          const s2 = (1.05 + Math.random() * 0.35).toFixed(2);
          animateScale.setAttribute("values", `${s1}; ${s2}; ${s1}`);
          animateScale.setAttribute("dur", (0.8 + Math.random() * 1.8).toFixed(2) + "s");
          animateScale.setAttribute("repeatCount", "indefinite");
          animateScale.setAttribute("additive", "sum");
          animateScale.setAttribute("begin", begin);

          c.appendChild(animateOpacity);
          c.appendChild(animateScale);
          c.appendChild(animateMotion);
          particlesGroup.appendChild(c);
        }
      }
    }
  };

});
