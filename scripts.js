var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var resetButton = document.getElementById("resetButton");
var timeLeft = 15; // Countdown time in seconds
var intervalId; // Store the interval ID for starting and stopping the game loop

var noShapes = 7; // Decreased number of shapes
var shapes = [];
var score = 0;

function enter() {
  timeLeft = 250; // Reset countdown time
  shapes = [];
  addShapes();
  score = 0;
  startTimer();
}

function loop() {
  clearCanvas();
  drawShapes();
  moveShapes();
  displayStats();
  timeLeft--; // Decrease time left in seconds
  if (timeLeft <= 0) {
    clearInterval(intervalId); // Stop the game loop when time is up
    alert("Game over! Your final score is: " + score);
  }
}

function startTimer() {
  intervalId = setInterval(function () {
    loop();
  }, 1000 / 60); // Start the game loop at 60 frames per second
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addShapes() {
  var colors = [
    "Lime",
    "Red",
    "Green",
    "Orange",
    "Violet",
    "Teal",
    "Pink",
    "Magenta",
    "Navy",
  ];
  var types = ["circle", "square", "triangle"];

  for (var i = 0; i < noShapes; i++) {
    var shape = {
      x: Math.random() * (canvas.width - 100) + 50,
      y: Math.random() * -100, // Start above the canvas
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[i % colors.length],
      chr: String.fromCharCode(65 + (i % 26)), // ASCII code for A-Z
      hit: false,
    };
    shapes.push(shape);
  }
}

function drawShapes() {
  for (var i = 0; i < shapes.length; i++) {
    var o = shapes[i];

    ctx.beginPath();

    if (o.type === "circle") {
      ctx.arc(o.x, o.y, 40, 0, Math.PI * 2);
    } else if (o.type === "square") {
      ctx.rect(o.x - 40, o.y - 40, 80, 80);
    } else if (o.type === "triangle") {
      ctx.moveTo(o.x, o.y - 40);
      ctx.lineTo(o.x + 40, o.y + 40);
      ctx.lineTo(o.x - 40, o.y + 40);
      ctx.closePath();
    }

    ctx.fillStyle = o.color;
    ctx.fill();

    if (!o.hit) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(o.chr, o.x, o.y + 7); // Draw letter on top of shape
    }
  }
}

function moveShapes() {
  for (var i = 0; i < shapes.length; i++) {
    var o = shapes[i];
    o.y += Math.random() * 2 + 1; // Adjust speed
    if (o.y > canvas.height + 40) {
      // If shape goes below canvas, reset its position
      o.y = Math.random() * -100;
      o.x = Math.random() * (canvas.width - 100) + 50;
      o.hit = false; // Reset hit status
    }
  }
}

function displayStats() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("Time Left: " + timeLeft + "s", 10, 40); // Display countdown timer
  ctx.fillText(
    "Press the right letter on your keyboard to pop the shape!",
    10,
    canvas.height - 20
  );
}

function checkHit(key) {
  for (var i = 0; i < shapes.length; i++) {
    var o = shapes[i];

    if (!o.hit && o.chr === key.toUpperCase()) {
      o.hit = true;
      score += 10;
      shapes.splice(i, 1); // Remove the shape from the array
      break;
    }
  }
}

window.addEventListener("keydown", function (event) {
  checkHit(event.key);
});

resetButton.addEventListener("click", function () {
  enter(); // Reset the game when the button is clicked
});

enter(); // Start the game when the page loads
