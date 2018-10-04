let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let seconds = 0;

function timer() {
  setInterval(() => {
    seconds++;
  }, 1000);
}

let ballSack = [];

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
    // this is going to remove a ball from the ballSack
    if (this.y < 0) {
      ballSack.splice(ball, 1);
    }

    this.up();
  };
  //mouseover functionality happens here. badaboom badabing
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
        this.vx = -3;
        if (this.x - this.radius < 0) {
          this.vx = 20;
        }
      } else {
        this.vx = 3;
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

// start shit
function init() {
  for (let i = 0; i < 100; i++) {
    ballSack.push(new Ball());
  }
}

// event stuff
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

// yes i know everything in this function sucks
// yes i know there is a better way to fill text in this canvas
// it's late af and i don't have time to make this look nice right now
// i will make this look better tomorrow or maybe 6 months from now if i feel like it

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballSack.length; i++) {
    ballSack[i].draw();
    ballSack[i].update(i);
  }
  c.font = "20px Georgia";
  c.fillStyle = "white";
  c.textAlign = "center";
  if (ballSack.length > 85) {
    c.fillText(
        "Push the dots to the top of the screen",
        canvas.width / 2,
        -50 + canvas.height / 2
      );
  }

  if (ballSack.length === 0) {
    c.fillText(
        `You wasted ${seconds} seconds playing this game.`,
        canvas.width / 2,
        -100 + canvas.height / 2
      );

      c.fillText(
        ` They're still ticking. Go do something.`,
        canvas.width / 2,
        -75 + canvas.height / 2
      );
  }

  c.fillText(
    `Dots left: ${ballSack.length}     Time: ${seconds}s`,
    canvas.width / 2,
    canvas.height / 2
  );
}


init();
animate();
timer();
