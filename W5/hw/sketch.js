function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  background("#F5F5EF");
}

function draw() {
  // Light background with fading trails.
  background(245, 245, 239, 35);

  let t = millis() / 1000;

  // ORBITING SQUARE
  let orbitAngle = t * 0.9;

  let squareX = 205 + cos(orbitAngle) * 130;
  let squareY = 240 + sin(orbitAngle) * 105;

  // Orbit guide.
  noFill();
  stroke(30, 30, 50, 30);
  strokeWeight(1);
  ellipse(205, 240, 260, 210);

  // Center diamond.
  push();
  translate(205, 240);
  rotate(-t * 0.4);

  noStroke();
  fill("#FFB703");
  square(0, 0, 24);
  pop();

  // Rotating square.
  push();
  translate(squareX, squareY);
  rotate(t * 1.8);

  stroke("#A51660");
  strokeWeight(2);
  fill("#EF479D");
  square(0, 0, 48);

  noStroke();
  fill("#FFCF33");
  square(0, 0, 18);
  pop();

  // SWINGING TRIANGLE
  let swingAngle = sin(t * 1.47 + PI / 3) * 0.65;

  let pivotX = 470;
  let pivotY = 100;
  let ropeLength = 195;

  let triangleX = pivotX + sin(swingAngle) * ropeLength;
  let triangleY = pivotY + cos(swingAngle) * ropeLength;

  stroke("#646480");
  strokeWeight(2);
  line(pivotX, pivotY, triangleX, triangleY);

  // Pivot point.
  noStroke();
  fill("#FFB703");
  circle(pivotX, pivotY, 12);

  // Triangle tilts with the swing.
  push();
  translate(triangleX, triangleY);
  rotate(-swingAngle);

  stroke("#008F75");
  strokeWeight(2);
  fill("#06D6A0");
  triangle(0, -30, -29, 23, 29, 23);

  noStroke();
  fill("#5267FF");
  triangle(0, -12, -12, 11, 12, 11);
  pop();

  // Labels.
  noStroke();
  fill("#222238");
  textAlign(CENTER);
  textSize(20);
  text("COLOR IN MOTION", width / 2, 40);

  fill("#A51660");
  textSize(12);
  text("ROTATE + ORBIT", 205, 410);

  fill("#007C66");
  text("SWING + REPEAT", 470, 410);

  fill("#646480");
  text("Click to restart the trails", width / 2, 452);
}

function mousePressed() {
  background("#F5F5EF");
}