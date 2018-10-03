let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ballsArray = [];
const trashArry = [];

const colorArray = [
  "#65DEF1",
  "#F17F29",
  "#F96900",
  "#DCE2C8",
  "#A8DCD1",
  "#66B3BA",
  "#42CAFD",
  "#F6EFA6",
  "#2589BD",
  "#38686A",
  "#187795",
  "#CDC6AE",
  "#AC3931",
  "#482C3D",
  "#D9E76C",
  "#E5D352"
];
let c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined
};

function Ball() {
  this.radius = 3 + Math.random() * 30;
  this.x = this.radius + Math.random() * (innerWidth - 2 * this.radius);
  this.y = this.radius + Math.random() * (innerHeight - 2 * this.radius);
  this.vx = 1;
  this.vy = 0;
  this.gravity = 0.5;
  this.bounceFactor = 0.9;

  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function(ball) {
    this.vy += this.gravity;

    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.radius > canvas.height) {
      this.vy *= -this.bounceFactor;
      this.y = canvas.height - this.radius;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vy *= -this.bounceFactor;
      this.vx = -this.vx;
    }
    // this is going to remove a ball from the ballsArray
    if (this.y < 0) {
      ballsArray.splice(ball, 1);
    }

    this.up();
  };

  this.up = function() {
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      this.gravity = -2;
      this.bounceFactor = 0.4;
      if (mouse.x > this.x) {
        this.vx = -2.5;
        if (this.x - this.radius < 0) {
          this.vx = 20;
        }
      } else {
        this.vx = 2.5;
        if (this.x + this.radius > canvas.width) {
          this.vx = -20;
        }
      }
    } else {
      this.gravity = 0.5;
      this.bounceFactor = 0.9;
    }
  };

  this.draw();
}

function init() {
  for (let i = 0; i < 100; i++) {
    ballsArray.push(new Ball());
  }
}

window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("mouseout", event => {
  mouse.x = undefined;
  mouse.y = undefined;
});

window.addEventListener("resize", event => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

let seconds = 0;

function timer() {
  setInterval(() => {
    seconds++;
  }, 1000);
}

timer();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballsArray.length; i++) {
    ballsArray[i].draw();
    ballsArray[i].update(i);
  }
  c.font = "20px Georgia";
  c.fillStyle = "white";
  c.textAlign = "center";
  if (ballsArray.length > 85) {
    c.fillText(
        "Push the dots to the top of the screen",
        canvas.width / 2,
        -50 + canvas.height / 2
      );
  }

  c.fillText(
    `Dots left: ${ballsArray.length}     Time: ${seconds}s`,
    canvas.width / 2,
    canvas.height / 2
  );
}

init();
animate();
