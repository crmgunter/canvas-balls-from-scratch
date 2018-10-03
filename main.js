let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ballsArray = [];
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
console.log(Math.floor(Math.random() * colorArray.length));
let c = canvas.getContext("2d");


let mouse = {
    x: undefined,
    y: undefined
}

function Ball() {
  this.radius = 3 + Math.random() * 30;
  this.x = this.radius + Math.random() * (innerWidth - 2 * this.radius);
  this.y = Math.random() * innerHeight - this.radius;
  this.vx = 1;
  this.vy = 0;
  this.gravity = .5;
  this.bounceFactor = .8
  
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color
    c.fill();
  };

  this.update = function() {
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
    this.up()
  };

  this.up = function() {
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        this.gravity = -2;
        this.bounceFactor = .4
        if (mouse.x > this.x) {
            this.vx = -4
        } else {
            this.vx = 4
        }
    } 
    else {
        this.gravity = .5
        this.bounceFactor = .8
    }
  }

  this.draw();
}

const ball = new Ball();

for (let i = 0; i <= 300; i++) {
  ballsArray.push(new Ball());
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

window.addEventListener('mouseout', (event) => {
    mouse.x = undefined
    mouse.y = undefined
    console.log('im out')
})

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballsArray.length; i++) {
    ballsArray[i].draw();
    ballsArray[i].update();
  }
}

animate();
