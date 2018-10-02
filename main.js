let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext("2d");
let vx = 0.5;
let vy = Math.random() * -10 - 5;
let gravity = 0.5;

function Ball() {
  this.x = 100;
  this.y = 100;
  this.radius = 80;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
  };

  this.update = () => {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0 || this.y + this.radius > canvas.height) {
          this.x = canvas.width / 2
          this.y = canvas.height - ball.radius

          vx = 0
          vy = (Math.random() * -15) - 5
      }
  }

  this.draw();
}

const ball = new Ball();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  vy += gravity;

  ball.x += vx;
  ball.y += vy;

  ball.draw();
  ball.update()
}

animate();
