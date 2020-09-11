function Star() {
  this.random = function() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.pz = this.z;
  }

  this.z = random(width);
  this.random();

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.random();
    }
  }

  this.show = function() {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);

  }
}

var stars = [];
var speed;
var targetSpeed;
var stop = false;
var logging = false;

const minSpeed = 10;
const maxSpeed = 50;
const avgSpeed = (minSpeed + maxSpeed) / 2;
const accFactor = 10;

function setup() {
  cnv = createCanvas(windowWidth - 20, windowHeight - 20);
  cnv.parent('canvas');
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
  speed = minSpeed;
  targetSpeed = minSpeed;
}

function windowResized() {
   resizeCanvas(windowWidth - 20, windowHeight - 20);
}

function mouseClicked() {
  if (mouseY < height) {
    stop = !stop;
  }
}

function keyPressed() {
  // F2
  if(keyCode === 113) {
    logging = !logging;
  }
}

function draw() {
  if (logging) {
    console.log(speed);
  }
  acceleration = map(speed, 0, maxSpeed, minSpeed / accFactor, maxSpeed / accFactor, maxSpeed);
  if (!stop) {
    if ( ( window.innerWidth >= 800 ) && ( window.innerHeight >= 600 ) && (mouseY < height) )  {
      sign = Math.sign(mouseY - height/2);
      dSpeed = sign * (avgSpeed - minSpeed);
      targetSpeed = map(mouseY, (1 + sign) * height/4, (3 + sign) * height/4, avgSpeed + dSpeed, avgSpeed - dSpeed, height);
      speed += (Math.sign(targetSpeed - speed) * acceleration);
    } else {
      speed = minSpeed;
    }
  } else {
    speed -= acceleration;
    if (speed < 0.1) {
      speed = 0;
    }
  }
  background('#0b0c10');
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}