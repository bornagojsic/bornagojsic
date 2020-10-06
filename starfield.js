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

function setup() {
  header = document.getElementById('masthead');
  h = windowHeight * 1.05;
  if ( ( windowWidth >= 800 ) && ( windowHeight >= 600 ) && ( windowWidth > 2 * windowHeight ) ) {
    header.setAttribute("style","height: 100vh;");
    h = windowHeight;
  }
  cnv = createCanvas(windowWidth - dW, h);
  cnv.parent('canvas');
  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
  speed = minSpeed;
  targetSpeed = minSpeed;
}


var stars = [];
var speed;
var targetSpeed;
var stop = false;
var logging = false;

const minSpeed = 10;
const maxSpeed = 100;
var avgSpeed = (minSpeed + maxSpeed) / 2;
const accFactor = 10;
const dW = 15.5;


function windowResized() {
  h = windowHeight * 1.05;
  if ( ( windowWidth >= 800 ) && ( windowHeight >= 600 ) && ( windowWidth > 2 * windowHeight ) ) {
    h = windowHeight;
  }
  resizeCanvas(windowWidth - dW, h);
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
  if ( ( windowWidth >= 800 ) && ( windowHeight >= 600 ) && ( windowWidth > 2 * windowHeight ) && (mouseY < height) )  {
    if (header.height != "100vh") {
      header.setAttribute("style","height: 100vh;");
      h = windowHeight - 20;
    }
    sign = Math.sign(mouseY - height/2);
    dSpeed = sign * (avgSpeed - minSpeed);
    targetSpeed = map(mouseY, (1 + sign) * height/4, (3 + sign) * height/4, avgSpeed + dSpeed, avgSpeed - dSpeed, height);
  }
  if (!stop) {
    speed += (Math.sign(targetSpeed - speed) * acceleration);
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
