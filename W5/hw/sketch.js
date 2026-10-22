let paletteIndex = 0;

const palettes = [
  ["#FF3388", "#00BFA6", "#6554FF", "#FFB800"],
  ["#FF6437", "#307BFF", "#BD38DA", "#00B87A"],
  ["#ED365B", "#009DC4", "#7546E8", "#F5A000"]
];

function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  background(250, 247, 240);
}

function draw() {
  // A pale wash leaves colorful trails behind.
  background(250, 247, 240, 28);

  let t = millis() / 1000;
  let colors = palettes[paletteIndex];

  // 1. ORBITING SQUARE
  // A second sine wave makes the orbit rise and dip.
  let orbitX = 205 + cos(t * 0.9) * 130;
  let orbitY = 230 + sin(t * 0.9) * 95
                   + sin(t * 2.3) * 25;

  // Perlin noise smoothly changes the square's size.
  let squareSize = map(noise(10, t * 0.5), 0, 1, 28, 75);

  push();
  translate(orbitX, orbitY);
  rotate(t * 2);

  stroke(colors[0]);
  strokeWeight(3);
  fillColor(colors[0], 80);
  square(0, 0, squareSize);

  rotate(-t * 3.2);
  noFill();
  stroke(colors[2]);
  square(0, 0, squareSize * 0.55);
  pop();

  // 2. SWINGING TRIANGLE
  // Independent speed and phase keep it out of sync.
  let swing = sin(t * 1.53 + 1.1) * 0.95;
  let ropeLength = 150;
  let pivotX = 440;
  let pivotY = 110;

  let triangleX = pivotX + sin(swing) * ropeLength;
  let triangleY = pivotY + cos(swing) * ropeLength;

  stroke(45, 40, 65, 85);
  strokeWeight(2);
  line(pivotX, pivotY, triangleX, triangleY);

  noStroke();
  fill(colors[3]);
  circle(pivotX, pivotY, 13);

  push();
  translate(triangleX, triangleY);
  rotate(-swing);

  // Noise adds a gentle change in scale.
  let triangleScale = map(noise(50, t * 0.6), 0, 1, 0.75, 1.35);
  scale(triangleScale);

  stroke(colors[1]);
  strokeWeight(3);
  fillColor(colors[1], 95);
  triangle(0, -36, -34, 28, 34, 28);

  noStroke();
  fill(colors[2]);
  triangle(0, -14, -13, 11, 13, 11);
  pop();

  // 3. OSCILLATING DIAMOND
  // Different frequencies on each axis create looping motion.
  let diamondX = width / 2 + sin(t * 1.17 + 2) * 220;
  let diamondY = 325 + cos(t * 2.07) * 55;

  push();
  translate(diamondX, diamondY);
  rotate(PI / 4 + sin(t * 2.6) * 0.6);

  stroke(colors[2]);
  strokeWeight(2);
  fillColor(colors[2], 75);
  square(0, 0, 30);

  noStroke();
  fill(colors[3]);
  square(0, 0, 12);
  pop();

  // 4. MINI SQUARES IN A ROTATING RING
  push();
  translate(205, 230);
  rotate(-t * 0.65);

  for (let i = 0; i < 6; i++) {
    let angle = i * TWO_PI / 6;

    // Each square pulses at a different phase.
    let radius = 43 + sin(t * 2.1 + i) * 12;

    push();
    translate(cos(angle) * radius, sin(angle) * radius);
    rotate(t * 1.8 + angle);

    noStroke();
    fill(colors[i % colors.length]);
    square(0, 0, 10);
    pop();
  }

  pop();

  // Repaint the title area to keep the text crisp.
  noStroke();
  fill(250, 247, 240);
  rect(width / 2, 29, width, 58);

  fill("#29243D");
  textAlign(CENTER, CENTER);
  textSize(20);
  text("A LITTLE OUT OF CONTROL", width / 2, 29);

  // Footer.
  fill(250, 247, 240);
  rect(width / 2, 460, width, 40);

  fill("#625B73");
  textSize(12);
  text("Click to remix the colors", width / 2, 460);
}

// Apply transparency to a palette color.
function fillColor(hex, opacity) {
  let c = color(hex);
  c.setAlpha(opacity);
  fill(c);
}

function mousePressed() {
  paletteIndex = (paletteIndex + 1) % palettes.length;
  background(250, 247, 240);
}