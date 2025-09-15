document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("brain-workflow");

  container.innerHTML = `
    <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
      <!-- Kontou sèvo -->
      <path d="M100,150 Q150,20 250,80 Q350,20 400,150 Q350,280 250,220 Q150,280 100,150Z" 
            class="brain-outline"/>

      <!-- Plizyè chemen workflow -->
      <path id="workflow1" d="M150,150 Q250,50 350,150 Q250,250 150,150Z" class="neuron"/>
      <path id="workflow2" d="M200,120 Q250,30 300,120 Q250,200 200,120Z" class="neuron"/>
      <path id="workflow3" d="M180,180 Q250,270 320,180 Q250,120 180,180Z" class="neuron"/>

      <!-- Etensèl sou chemen 1 -->
      <circle r="5" class="spark">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#workflow1"/>
        </animateMotion>
      </circle>
      <circle r="5" class="spark">
        <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
          <mpath href="#workflow1"/>
        </animateMotion>
      </circle>

      <!-- Etensèl sou chemen 2 -->
      <circle r="5" class="spark">
        <animateMotion dur="2.5s" repeatCount="indefinite">
          <mpath href="#workflow2"/>
        </animateMotion>
      </circle>
      <circle r="5" class="spark">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
          <mpath href="#workflow2"/>
        </animateMotion>
      </circle>

      <!-- Etensèl sou chemen 3 -->
      <circle r="5" class="spark">
        <animateMotion dur="4s" repeatCount="indefinite">
          <mpath href="#workflow3"/>
        </animateMotion>
      </circle>
      <circle r="5" class="spark">
        <animateMotion dur="5s" repeatCount="indefinite" begin="2s">
          <mpath href="#workflow3"/>
        </animateMotion>
      </circle>
    </svg>
  `;
});
