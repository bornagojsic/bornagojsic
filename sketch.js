// // Daniel Shiffman
// // http://codingtra.in
// // http://patreon.com/codingtrain
// // Code for: https://youtu.be/17WoOqgXsRM

var stars = [];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
var speed = 10;


function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
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

// function setup() {
//   var canvas = document.getElementById('canvas');
for (var i = 0; i < 800; i++) {
  stars[i] = new Star();
}
// }

function main() {
  // speed = map(mouseY, 0, height, 0, 50);
  background(0);
  translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function interval() {
  // Function which sets interval
  setInterval(function() {
    main();
    //move();
  }, 1000);
}

// function draw() {
//   // rect(0,0,100,100,'#fff');
//   s = new Star();
//   s.update();
//   s.show();
//   console.log('AAAAAAAAAA');
// }

function random(min, max) {
  return Math.floor(Math.random * (max - min)) - Math.abs(min)
}

interval()