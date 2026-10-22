function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  background("#15152A");
}

function draw() {
  // Transparent background creates fading motion trails.
  background(21, 21, 42, 35);

  let t = millis() / 1000;

  // ORBITING SQUARE
  let orbitAngle = t * 0.9;

  let squareX = 205 + cos(orbitAngle) * 130;
  let squareY = 240 + sin(orbitAngle) * 105;

  // Orbit guide.
  noFill();
  stroke(255, 25);
  strokeWeight(1);
  ellipse(205, 240, 260, 210);

  // Center diamond.
  push();
  translate(205, 240);
  rotate(-t * 0.4);

  noStroke();
  fill("#FFD166");
  square(0, 0, 24);
  pop();

  // Square rotates while orbiting.
  push();
  translate(squareX, squareY);
  rotate(t * 1.8);

  stroke("#FFB3DB");
  strokeWeight(2);
  fill("#EF479D");
  square(0, 0, 48);

  noStroke();
  fill("#FFD166");
  square(0, 0, 18);
  pop();

  // SWINGING TRIANGLE
  // Different frequency and phase create an independent rhythm.
  let swingAngle = sin(t * 1.47 + PI / 3) * 0.65;

  let pivotX = 470;
  let pivotY = 100;
  let length = 195;

  let triangleX = pivotX + sin(swingAngle) * length;
  let triangleY = pivotY + cos(swingAngle) * length;

  stroke("#A5A7D4");
  strokeWeight(2);
  line(pivotX, pivotY, triangleX, triangleY);

  // Pivot point.
  noStroke();
  fill("#FFD166");
  circle(pivotX, pivotY, 12);

  // Triangle tilts with the swing.
  push();
  translate(triangleX, triangleY);
  rotate(-swingAngle);

  stroke("#B4FFF2");
  strokeWeight(2);
  fill("#06D6A0");
  triangle(0, -30, -29, 23, 29, 23);

  noStroke();
  fill("#5267FF");
  triangle(0, -12, -12, 11, 12, 11);
  pop();

  // Labels.
  noStroke();
  fill("#FFFFFF");
  textAlign(CENTER);
  textSize(20);
  text("COLOR IN MOTION", width / 2, 40);

  fill("#FFB3DB");
  textSize(12);
  text("ROTATE + ORBIT", 205, 410);

  fill("#B4FFF2");
  text("SWING + REPEAT", 470, 410);

  fill("#A5A7D4");
  text("Click to restart the trails", width / 2, 452);
}

function mousePressed() {
  background("#15152A");
}