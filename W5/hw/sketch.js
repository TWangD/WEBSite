let paletteIndex = 0;
let trails = [];

const palettes = [
  ["#FF3299", "#BFFF00", "#693CFF"],
  ["#FF6B00", "#783CFF", "#00E5D0"],
  ["#00CFFF", "#FFEA00", "#FF368B"]
];

function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  strokeJoin(ROUND);
}

function draw() {
  background("#F4F0DC");

  let t = millis() / 1000;
  let colors = palettes[paletteIndex];

  drawGraphicBackground(colors);

  // SQUARE: nonlinear looping motion with changing speed.
  let orbitAngle = t * 0.9 + sin(t * 1.1) * 0.7;

  // Perlin noise expands and contracts the path.
  let orbitWidth = map(noise(20, t * 0.25), 0, 1, 85, 140);
  let orbitHeight = map(noise(60, t * 0.3), 0, 1, 60, 105);

  let squareX =
    195 +
    cos(orbitAngle) * orbitWidth +
    sin(t * 2.3) * 24;

  let squareY =
    235 +
    sin(orbitAngle * 2) * orbitHeight +
    cos(t * 1.7) * 18;

  // TRIANGLE: independent, uneven swinging rhythm.
  let swingPhase = t * 1.61 + sin(t * 0.73) * 0.9;

  let swing =
    sin(swingPhase + 1.2) * 0.72 +
    sin(t * 3.17) * 0.16;

  let pivotX = 455;
  let pivotY = 120;

  // Elastic cable stretches and contracts.
  let ropeLength =
    165 +
    sin(t * 2.13 + 0.8) * 20 +
    map(noise(100, t * 0.4), 0, 1, -12, 12);

  let triangleX = pivotX + sin(swing) * ropeLength;
  let triangleY = pivotY + cos(swing) * ropeLength;

  // Record positions for the ink trails.
  let now = millis();
  let squareRotation = t * 2.2 + sin(t * 1.7) * 0.8;

  if (
    trails.length === 0 ||
    now - trails[trails.length - 1].born > 45
  ) {
    trails.push({
      x: squareX,
      y: squareY,
      x2: triangleX,
      y2: triangleY,
      squareAngle: squareRotation,
      triangleAngle: -swing,
      born: now
    });
  }

  trails = trails.filter(mark => now - mark.born < 1100);

  // Draw shrinking geometric ink trails.
  for (let mark of trails) {
    let life = 1 - (now - mark.born) / 1100;
    let size = 24 * life;

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

  // Rotating center marker.
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

  // Swing cable.
  stroke("#19191D");
  strokeWeight(6);
  line(pivotX, pivotY, triangleX, triangleY);

  stroke(colors[2]);
  strokeWeight(2);
  line(pivotX, pivotY, triangleX, triangleY);

  // Pivot.
  stroke("#19191D");
  strokeWeight(4);
  fill(colors[2]);
  circle(pivotX, pivotY, 19);

  // MAIN SQUARE
  push();
  translate(squareX, squareY);
  rotate(squareRotation);

  let size = map(noise(10, t * 0.65), 0, 1, 42, 66);

  // Offset shadow.
  noStroke();
  fill("#19191D");
  square(7, 8, size);

  stroke("#19191D");
  strokeWeight(5);
  fill(colors[0]);
  square(0, 0, size);

  // Highlight.
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

  let pulse = map(noise(80, t * 0.7), 0, 1, 0.85, 1.2);
  scale(pulse);

  // Offset shadow.
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

  // Organic ink splashes.
  inkSplash(35, 145, 65, colors[0], 10);
  inkSplash(600, 330, 78, colors[1], 40);
  inkSplash(285, 465, 60, colors[2], 90);

  // Diagonal graphic stripes.
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

  // Perlin noise creates an irregular outline.
  beginShape();

  for (let i = 0; i < 80; i++) {
    let a = i / 80 * TWO_PI;

    let n = noise(
      seed + cos(a) * 2,
      seed + sin(a) * 2
    );

    let r = radius * map(n, 0, 1, 0.35, 1.3);

    vertex(cos(a) * r, sin(a) * r);
  }

  endShape(CLOSE);

  // Fixed droplets avoid flickering.
  for (let i = 0; i < 9; i++) {
    let a = noise(seed + i * 7) * TWO_PI;

    let distance =
      radius * map(noise(seed + i + 30), 0, 1, 0.8, 1.5);

    let diameter =
      map(noise(seed + i + 60), 0, 1, 4, 13);

    circle(
      cos(a) * distance,
      sin(a) * distance,
      diameter
    );
  }

  pop();
}

function drawLabels(colors) {
  // Angled title sticker.
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

  // Footer sticker.
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
  text("SPIN. SWING. SPLAT.  /  CLICK TO REMIX", 0, 0);
  pop();
}

function mousePressed() {
  paletteIndex = (paletteIndex + 1) % palettes.length;
  trails = [];
}