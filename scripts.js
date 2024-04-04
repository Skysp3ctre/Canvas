const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fruits = ["🍎", "🍊", "🍌"];

function drawSquare(x, y, size) {
  ctx.beginPath();
  ctx.rect(x, y, size, size);
  ctx.stroke();
  const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
  ctx.font = "40px Arial";
  ctx.fillText(randomFruit, x + size / 2 - 20, y + size / 2 + 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquare(30, 30, 100);
  drawSquare(150, 30, 100);
  drawSquare(270, 30, 100);
}

function spin() {
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      draw();
    }, i * 100);
  }
}

document.getElementById("spinButton").addEventListener("click", spin);
document.getElementById("resetButton").addEventListener("click", draw);

draw();
