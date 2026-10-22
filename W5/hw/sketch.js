function setup() {
  createCanvas(640, 480);
  startTime = millis();
}

function draw() {
  background(250);
  makeGrid();

  // Time in seconds keeps motion consistent across frame rates.
  let t = (millis() - startTime) / 1000;

  // TWO DIFFERENT RHYTHMS
  // Different speeds and starting phases keep them out of sync.
  let orbitAngle = t * 0.85;
  let swingAngle = sin(t * 1.43 + PI / 3) * 0.75;

  // 1. ORBITING SHAPE
  let centerX = 210;
  let centerY = 240;

  // Sine and cosine create an elliptical orbit.
  let planetX = centerX + cos(orbitAngle) * 135;
  let planetY = centerY + sin(orbitAngle) * 100;

  // Orbit guide.
  noFill();
  stroke(215);
  strokeWeight(1);
  ellipse(centerX, centerY, 270, 200);

  // Small center point.
  noStroke();
  fill(70);
  circle(centerX, centerY, 10);

  // The orbiting shape also rotates around its own center.
  push();
  translate(planetX, planetY);
  rotate(t * 0.6);
  organicShape(32, 10, t, color(85, 145, 220));
  pop();

  // 2. OSCILLATING PENDULUM
  let pivotX = 465;
  let pivotY = 105;
  let ropeLength = 190;

  // Convert the swing angle into the pendulum's position.
  let pendulumX = pivotX + sin(swingAngle) * ropeLength;
  let pendulumY = pivotY + cos(swingAngle) * ropeLength;

  // Pendulum rope.
  stroke(75);
  strokeWeight(2);
  line(pivotX, pivotY, pendulumX, pendulumY);

  // Fixed pivot.
  noStroke();
  fill(70);
  circle(pivotX, pivotY, 10);

  // Organic pendulum shape.
  push();
  translate(pendulumX, pendulumY);
  rotate(-swingAngle);
  organicShape(38, 100, t, color(235, 145, 95));
  pop();

  // Labels.
  noStroke();
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("ORBIT", 210, 405);
  text("OSCILLATION", 465, 405);

  fill(120);
  textSize(12);
  text("Different rhythms. Always moving.", width / 2, 445);
}

// Draw a gently changing outline using Perlin noise.
function organicShape(baseRadius, seed, t, shapeColor) {
  fill(shapeColor);
  stroke(45);
  strokeWeight(1.5);

  beginShape();

  for (let i = 0; i < 100; i++) {
    let angle = map(i, 0, 100, 0, TWO_PI);

    // Sample noise around a circle for a continuous outline.
    let noiseValue = noise(
      seed + cos(angle) * 0.9,
      seed + sin(angle) * 0.9,
      t * 0.3
    );

    let radius = baseRadius * map(noiseValue, 0, 1, 0.65, 1.35);

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    vertex(x, y);
  }

  endShape(CLOSE);

  // A small mark makes the shape's rotation visible.
  noStroke();
  fill(255, 190);
  circle(baseRadius * 0.4, -baseRadius * 0.25, 9);
}

// A simple grid, similar to your earlier sketch.
function makeGrid() {
  stroke(235);
  strokeWeight(1);

  for (let x = 0; x <= width; x += 40) {
    line(x, 0, x, height);
  }

  for (let y = 0; y <= height; y += 40) {
    line(0, y, width, y);
  }
}