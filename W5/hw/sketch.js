<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Ink in Motion — Process</title>

  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.11/lib/p5.min.js"></script>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #f4f0dc;
      color: #19191d;
      font-family: Arial, sans-serif;
    }

    header,
    main,
    footer {
      width: 90%;
      max-width: 1000px;
      margin: auto;
    }

    header {
      padding: 45px 0 30px;
      border-bottom: 3px solid #19191d;
    }

    h1 {
      margin: 10px 0;
      font-size: clamp(48px, 9vw, 90px);
      line-height: 1;
    }

    h1 span {
      color: #ff3299;
    }

    h2 {
      font-size: 32px;
    }

    h3 {
      font-size: 19px;
    }

    p {
      line-height: 1.7;
    }

    .label {
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    section {
      margin: 45px 0;
    }

    .sketch-container {
      max-width: 648px;
      margin: 25px auto;
      border: 4px solid #19191d;
      box-shadow: 8px 8px #ff3299;
    }

    #sketch canvas {
      display: block;
      width: 100% !important;
      height: auto !important;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      padding: 15px;
    }

    button {
      padding: 10px 14px;
      background: #bfff00;
      color: #19191d;
      border: 2px solid #19191d;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background: #ffb4d9;
    }

    button:focus-visible {
      outline: 3px solid #693cff;
      outline-offset: 3px;
    }

    .instructions {
      text-align: center;
      font-size: 13px;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 35px;
    }

    figure {
      margin: 0;
    }

    figure img {
      display: block;
      width: 100%;
      aspect-ratio: 4 / 3;
      object-fit: contain;
      background: #e9e4cf;
      border: 3px solid #19191d;
    }

    .number {
      display: inline-block;
      padding: 5px 10px;
      margin-right: 8px;
      background: #bfff00;
      border: 2px solid #19191d;
      font-size: 14px;
    }

    .reflection {
      padding: 25px;
      background: #bfff00;
      border: 3px solid #19191d;
      box-shadow: 7px 7px #19191d;
    }

    .reflection h2 {
      margin-top: 0;
    }

    footer {
      padding: 20px 0;
      border-top: 3px solid #19191d;
      font-size: 12px;
    }

    @media (max-width: 650px) {
      .gallery {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>

  <header>
    <p class="label">TIANSHENG WANG / P5.JS MOTION STUDY</p>

    <h1>Ink in <span>Motion.</span></h1>

    <p>
      Exploring rotation, oscillation, and nonlinear movement
      through colorful geometric shapes.
    </p>
  </header>

  <main>

    <section>
      <p class="label">THE FINAL ANIMATION</p>

      <h2>Spin. Swing. Splat.</h2>

      <p>
        A rotating square and a swinging triangle follow different
        rhythms through overlapping waves and Perlin noise.
      </p>

      <div class="sketch-container">
        <div id="sketch"></div>

        <div class="controls">
          <button id="pauseButton" type="button">Pause</button>
          <button id="colorButton" type="button">Change colors</button>
          <button id="saveButton" type="button">Save screenshot</button>
        </div>
      </div>

      <p class="instructions">
        Click the animation to remix its colors.
      </p>
    </section>

    <section>
      <p class="label">THE DEVELOPMENT PROCESS</p>

      <h2>How it evolved.</h2>

      <p>
        I developed this animation with AI assistance by exploring
        different shapes, backgrounds, and movement patterns.
      </p>

      <!-- Check that these captions match your screenshot order. -->
      <div class="gallery">

        <figure>
          <img
            src="Capture1.png"
            data-capture="Capture1"
            alt="First iteration: orbiting and oscillating shapes.">

          <figcaption>
            <h3><span class="number">01</span>Starting with motion</h3>

            <p>
              I used sine and cosine to create an orbiting shape
              and a pendulum moving at different rhythms.
            </p>
          </figcaption>
        </figure>

        <figure>
          <img
            src="Capture2.png"
            data-capture="Capture2"
            alt="Second iteration: a playful cosmic animation.">

          <figcaption>
            <h3><span class="number">02</span>Making it playful</h3>

            <p>
              I added playful characters and used Perlin noise
              to give their outlines an organic appearance.
            </p>
          </figcaption>
        </figure>

        <figure>
          <img
            src="Capture3.png"
            data-capture="Capture3"
            alt="Third iteration: colorful geometric shapes.">

          <figcaption>
            <h3><span class="number">03</span>Returning to geometry</h3>

            <p>
              I simplified the characters into colorful geometric
              shapes with trails that reveal their movement.
            </p>
          </figcaption>
        </figure>

        <figure>
          <img
            src="Capture4.png"
            data-capture="Capture4"
            alt="Fourth iteration: shapes on a light background.">

          <figcaption>
            <h3><span class="number">04</span>Reversing the background</h3>

            <p>
              I switched to a light background to give the
              animation a cleaner graphic appearance.
            </p>
          </figcaption>
        </figure>

        <figure>
          <img
            src="Capture5.png"
            data-capture="Capture5"
            alt="Fifth iteration: neon colors and ink splashes.">

          <figcaption>
            <h3><span class="number">05</span>Adding graphic energy</h3>

            <p>
              I introduced neon colors, bold outlines, and ink
              splashes for a Splatoon-inspired style.
            </p>
          </figcaption>
        </figure>

        <figure>
          <!-- Captured automatically from the canvas after two seconds. -->
          <img
            id="finalCapture"
            alt="Final iteration: geometric shapes with nonlinear motion.">

          <figcaption>
            <h3><span class="number">06</span>Breaking the predictable loop</h3>

            <p>
              I combined overlapping waves and Perlin noise to
              create nonlinear paths and an elastic swinging motion.
            </p>
          </figcaption>
        </figure>

      </div>
    </section>

    <section class="reflection">
      <h2>Reflection</h2>

      <p>
        This project taught me how changes in rhythm, color,
        and motion can give simple geometric shapes an
        expressive personality.
      </p>
    </section>

  </main>

  <footer>
    Ink in Motion — Made with p5.js and developed with AI assistance.
  </footer>

  <script>
    // Try common extensions for your five existing screenshots.
    document.querySelectorAll("img[data-capture]").forEach(function (image) {
      const alternatives = ["jpg", "jpeg", "PNG", "JPG", "webp"];
      let attempt = 0;

      image.addEventListener("error", function () {
        if (attempt < alternatives.length) {
          image.src =
            image.dataset.capture + "." + alternatives[attempt++];
        }
      });
    });

    // ANIMATION VARIABLES
    let paletteIndex = 0;
    let trails = [];
    let motionTime = 0;
    let paused = false;
    let captured = false;
    let artCanvas;

    const palettes = [
      ["#FF3299", "#BFFF00", "#693CFF"],
      ["#FF6B00", "#783CFF", "#00E5D0"],
      ["#00CFFF", "#FFEA00", "#FF368B"]
    ];

    function setup() {
      artCanvas = createCanvas(640, 480);
      artCanvas.parent("sketch");

      artCanvas.elt.setAttribute("role", "img");
      artCanvas.elt.setAttribute(
        "aria-label",
        "A rotating square and a swinging triangle with colorful ink trails."
      );

      rectMode(CENTER);
      strokeJoin(ROUND);
      noiseSeed(14);

      document.getElementById("pauseButton").onclick = function () {
        paused = !paused;
        this.textContent = paused ? "Play" : "Pause";
      };

      document.getElementById("colorButton").onclick = remixColors;

      document.getElementById("saveButton").onclick = function () {
        updateFinalCapture();
        saveCanvas(artCanvas, "Capture6", "png");
      };
    }

    function draw() {
      if (!paused) {
        motionTime += min(deltaTime, 50) / 1000;
      }

      let t = motionTime;
      let colors = palettes[paletteIndex];

      background("#F4F0DC");
      drawGraphicBackground(colors);

      // NONLINEAR SQUARE MOTION
      let orbitAngle = t * 0.9 + sin(t * 1.1) * 0.7;

      let orbitWidth = map(
        noise(20, t * 0.25), 0, 1, 85, 140
      );

      let orbitHeight = map(
        noise(60, t * 0.3), 0, 1, 60, 105
      );

      let squareX =
        195 +
        cos(orbitAngle) * orbitWidth +
        sin(t * 2.3) * 24;

      let squareY =
        235 +
        sin(orbitAngle * 2) * orbitHeight +
        cos(t * 1.7) * 18;

      let squareRotation =
        t * 2.2 + sin(t * 1.7) * 0.8;

      // NONLINEAR TRIANGLE MOTION
      let swingPhase =
        t * 1.61 + sin(t * 0.73) * 0.9;

      let swing =
        sin(swingPhase + 1.2) * 0.72 +
        sin(t * 3.17) * 0.16;

      let pivotX = 455;
      let pivotY = 120;

      let ropeLength =
        165 +
        sin(t * 2.13 + 0.8) * 20 +
        map(noise(100, t * 0.4), 0, 1, -12, 12);

      let triangleX =
        pivotX + sin(swing) * ropeLength;

      let triangleY =
        pivotY + cos(swing) * ropeLength;

      // RECORD MOTION TRAILS
      if (
        !paused &&
        (
          trails.length === 0 ||
          t - trails[trails.length - 1].born > 0.045
        )
      ) {
        trails.push({
          x: squareX,
          y: squareY,
          x2: triangleX,
          y2: triangleY,
          squareAngle: squareRotation,
          triangleAngle: -swing,
          born: t
        });
      }

      trails = trails.filter(function (mark) {
        return t - mark.born < 1.1;
      });

      for (let mark of trails) {
        let size = 24 * (1 - (t - mark.born) / 1.1);

        push();
        translate(mark.x, mark.y);
        rotate(mark.squareAngle);
        noStroke();
        fill(colors[0]);
        square(0, 0, size);
        pop();

        push();
        translate(mark.x2, mark.y2);
        rotate(mark.triangleAngle);
        noStroke();
        fill(colors[1]);

        triangle(
          0, -size,
          -size * 0.8, size * 0.6,
          size * 0.8, size * 0.6
        );

        pop();
      }

      // CENTER MARKER
      push();
      translate(195, 235);
      rotate(-t);

      stroke("#19191D");
      strokeWeight(4);
      fill(colors[2]);
      square(0, 0, 30);

      noStroke();
      fill("#FFFFFF");
      square(0, 0, 9);
      pop();

      // ELASTIC CABLE
      stroke("#19191D");
      strokeWeight(6);
      line(pivotX, pivotY, triangleX, triangleY);

      stroke(colors[2]);
      strokeWeight(2);
      line(pivotX, pivotY, triangleX, triangleY);

      stroke("#19191D");
      strokeWeight(4);
      fill(colors[2]);
      circle(pivotX, pivotY, 19);

      // MAIN SQUARE
      push();
      translate(squareX, squareY);
      rotate(squareRotation);

      let size = map(
        noise(10, t * 0.65), 0, 1, 42, 66
      );

      noStroke();
      fill("#19191D");
      square(7, 8, size);

      stroke("#19191D");
      strokeWeight(5);
      fill(colors[0]);
      square(0, 0, size);

      stroke("#FFFFFF");
      strokeWeight(4);

      line(
        -size * 0.28, -size * 0.28,
        size * 0.1, -size * 0.28
      );

      noStroke();
      fill(colors[2]);
      square(5, 6, size * 0.28);
      pop();

      // MAIN TRIANGLE
      push();
      translate(triangleX, triangleY);
      rotate(-swing);

      let pulse = map(
        noise(80, t * 0.7), 0, 1, 0.85, 1.2
      );

      scale(pulse);

      noStroke();
      fill("#19191D");
      triangle(7, -31, -28, 33, 42, 33);

      stroke("#19191D");
      strokeWeight(5);
      fill(colors[1]);
      triangle(0, -39, -35, 25, 35, 25);

      noStroke();
      fill(colors[2]);
      triangle(0, -13, -13, 12, 13, 12);

      stroke("#FFFFFF");
      strokeWeight(4);
      line(-20, 9, -6, -17);
      pop();

      drawLabels(colors);

      // Create the sixth process image from the actual animation.
      if (!captured && t >= 2) {
        updateFinalCapture();
        captured = true;
      }
    }

    function drawGraphicBackground(colors) {
      // Halftone dots.
      noStroke();
      fill(25, 25, 29, 25);

      for (let x = 12; x < width; x += 18) {
        for (let y = 12; y < height; y += 18) {
          circle(x, y, 3);
        }
      }

      inkSplash(35, 145, 65, colors[0], 10);
      inkSplash(600, 330, 78, colors[1], 40);
      inkSplash(285, 465, 60, colors[2], 90);

      // Diagonal stripes.
      push();
      translate(575, 70);
      rotate(-0.45);

      noStroke();
      fill("#19191D");

      for (let i = 0; i < 4; i++) {
        rect(i * 15, 0, 7, 62);
      }

      pop();
    }

    function inkSplash(x, y, radius, ink, seed) {
      push();
      translate(x, y);

      noStroke();
      fill(ink);

      beginShape();

      for (let i = 0; i < 80; i++) {
        let angle = i / 80 * TWO_PI;

        let n = noise(
          seed + cos(angle) * 2,
          seed + sin(angle) * 2
        );

        let r = radius * map(n, 0, 1, 0.35, 1.3);

        vertex(
          cos(angle) * r,
          sin(angle) * r
        );
      }

      endShape(CLOSE);

      // Fixed ink droplets.
      for (let i = 0; i < 9; i++) {
        let angle = noise(seed + i * 7) * TWO_PI;

        let distance =
          radius * map(
            noise(seed + i + 30), 0, 1, 0.8, 1.5
          );

        let diameter = map(
          noise(seed + i + 60), 0, 1, 4, 13
        );

        circle(
          cos(angle) * distance,
          sin(angle) * distance,
          diameter
        );
      }

      pop();
    }

    function drawLabels(colors) {
      // Title sticker.
      push();
      translate(185, 47);
      rotate(-0.06);

      noStroke();
      fill(colors[0]);
      rect(6, 7, 300, 48);

      fill("#19191D");
      rect(0, 0, 300, 48);

      fill("#FFFFFF");
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textSize(29);
      text("INK IN MOTION!", 0, -1);
      pop();

      // Bottom sticker.
      push();
      translate(435, 439);
      rotate(-0.035);

      stroke("#19191D");
      strokeWeight(3);
      fill(colors[1]);
      rect(0, 0, 310, 32);

      noStroke();
      fill("#19191D");
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textSize(12);

      text(
        "SPIN. SWING. SPLAT. / CLICK TO REMIX",
        0,
        0
      );

      pop();
    }

    function remixColors() {
      paletteIndex = (paletteIndex + 1) % palettes.length;
      trails = [];
    }

    function updateFinalCapture() {
      document.getElementById("finalCapture").src =
        artCanvas.elt.toDataURL("image/png");
    }

    function mousePressed(event) {
      if (event && event.target === artCanvas.elt) {
        remixColors();
      }
    }
  </script>

</body>
</html>