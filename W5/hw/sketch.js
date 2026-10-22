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

  // ROTATING SQUARE: orbit with an extra vertical rhythm.
  let squareX = 195 + cos(t * 0.95) * 125;
  let squareY = 235 + sin(t * 0.95) * 95
                   + sin(t * 2.4) * 18;

  // OSCILLATING TRIANGLE: independent speed and phase.
  let swing = sin(t * 1.61 + 1.2) * 0.85;
  let pivotX = 455;
  let pivotY = 120;
  let ropeLength = 175;

  let triangleX = pivotX + sin(swing) * ropeLength;
  let triangleY = pivotY + cos(swing) * ropeLength;

  // Save ink stamps at a consistent time interval.
  let now = millis();

  if (trails.length === 0 ||
      now - trails[trails.length - 1].born > 45) {
    trails.push({
      x: squareX,
      y: squareY,
      x2: triangleX,
      y2: triangleY,
      angle: t,
      born: now
    });
  }

  trails = trails.filter(mark => now - mark.born < 1100);

  // Geometric ink trails.
  for (let mark of trails) {
    let life = 1 - (now - mark.born) / 1100;
    let size = 24 * life;

    push();
    translate(mark.x, mark.y);
    rotate(mark.angle * 2);

    noStroke();
    fill(colors[0]);
    square(0, 0, size);
    pop();

    push();
    translate(mark.x2, mark.y2);
    rotate(-mark.angle);

    noStroke();
    fill(colors[1]);
    triangle(
      0, -size,
      -size * 0.8, size * 0.6,
      size * 0.8, size * 0.6
    );
    pop();
  }

  // Orbit center.
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
  rotate(t * 2.2);

  // Perlin noise changes size smoothly.
  let size = map(noise(10, t * 0.65), 0, 1, 42, 66);

  // Offset graphic shadow.
  noStroke();
  fill("#19191D");
  square(7, 8, size);

  stroke("#19191D");
  strokeWeight(5);
  fill(colors[0]);
  square(0, 0, size);

  // White highlight.
  stroke("#FFFFFF");
  strokeWeight(4);
  line(-size * 0.28, -size * 0.28,
        size * 0.1, -size * 0.28);

  // Contrasting center.
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

  // Static ink splashes with noise-shaped edges.
  inkSplash(35, 145, 65, colors[0], 10);
  inkSplash(600, 330, 78, colors[1], 40);
  inkSplash(285, 465, 60, colors[2], 90);

  // Bold diagonal stripes.
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

  // Perlin noise makes a ragged organic outline.
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

  // Scattered droplets stay fixed between frames.
  for (let i = 0; i < 9; i++) {
    let a = noise(seed + i * 7) * TWO_PI;
    let distance = radius * map(noise(seed + i + 30), 0, 1, 0.8, 1.5);
    let diameter = map(noise(seed + i + 60), 0, 1, 4, 13);

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