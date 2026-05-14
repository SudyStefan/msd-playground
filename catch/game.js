/// <reference types="p5" />
/// <reference types="p5/global" />

// enums and constants
const GameState = Object.freeze({
  START: "start",
  RUNNING: "running",
  GAMEOVER: "gameover",
});

const Difficulty = Object.freeze({
  easy: { speedY: [2, 4], speedX: [-0.5, 0.5], newBallFrames: 1000 },
  medium: { speedY: [3, 4], speedX: [-1, 1], newBallFrames: 500 },
  hard: { speedY: [4, 5], speedX: [-2, 2], newBallFrames: 500 },
});

const PowerupType = Object.freeze({
  WIDE: "wide",
  SNACK: "snack",
  SLOW: "slow",
});

// control variables
let paddle, score, lives;
let balls,
  powerups = [];
let framesSinceLastBall, currentGameState, settings, monoSynth;

// sidebar elements
const scoreTag = document.getElementById("score");
const updateScore = () => {
  scoreTag.textContent = score;
};

const startGame = () => {
  settings = getDifficulty();
  currentGameState = GameState.RUNNING;
};
document.getElementById("start").onclick = startGame;

const resetGame = () => {
  balls = [];
  addBall();

  powerups = [];

  score = 0;
  lives = 3;
  currentGameState = GameState.START;
};
document.getElementById("reset").onclick = resetGame;

const liveDivs = document.getElementsByClassName("live");
const updateLives = () => {
  for (let i = 0; i < liveDivs.length; i++) {
    i >= lives
      ? liveDivs[i].classList.add("lost")
      : liveDivs[i].classList.remove("lost");
  }
};

const getDifficulty = () => {
  const selected = document.querySelector(
    'input[name="difficulty"]:checked',
  ).value;

  return Difficulty[selected];
};

// drawers
const drawBalls = () => {
  for (let i = 0; i < balls.length; i++) {
    balls[i].display();
    if (currentGameState === GameState.RUNNING) {
      if (balls[i].move()) {
        balls[i].hits(paddle);
      } else {
        lives--;
        balls.splice(i, 1);
        addBall();
      }
    }
  }
};

const drawPaddle = () => {
  paddle.display();
  paddle.move();
};

const displayMessage = (mainText, subText) => {
  textAlign(CENTER, CENTER);
  textFont("Arial");
  fill(200);

  textSize(42);
  text(mainText, width / 2, height / 2);

  if (subText) {
    textSize(18);
    text(subText, width / 2, height / 2 + 40);
  }
};

const drawPowerup = () => {
  if (
    currentGameState === GameState.RUNNING &&
    random(1) < 0.004 &&
    powerups.length < 2
  ) {
    let type = random(1) < 0.2 ? PowerupType.SNACK : PowerupType.WIDE;
    powerups.push(new Powerup(type));
  }

  for (let i = 0; i < powerups.length; i++) {
    powerups[i].display();
    if (!powerups[i].move()) {
      powerups.splice(i, 1);
      continue;
    }

    if (powerups[i].hits(paddle)) {
      powerups.splice(i, 1);
      monoSynth.play("C3", 0.2, 0, 0.1);
    }
  }
};

// game logic
const addBall = () => {
  balls.push(new Ball());
  framesSinceLastBall = 0;
};

const isGameOver = () => {
  if (lives < 1) {
    console.log(`Game Over! Final Score: ${score}`);
    currentGameState = GameState.GAMEOVER;
  }
};

// p5 base
function setup() {
  createCanvas(500, 400);
  paddle = new Paddle(100, 20);
  settings = Difficulty.easy;
  monoSynth = new p5.MonoSynth();

  resetGame();
}

function draw() {
  background(61);

  drawBalls();
  drawPowerup();
  drawPaddle();

  updateLives();
  updateScore();

  // add a ball after 500 frames for difficulty
  if (currentGameState === GameState.RUNNING) {
    framesSinceLastBall >= settings.newBallFrames
      ? addBall()
      : framesSinceLastBall++;
    isGameOver();
  } else if (currentGameState === GameState.GAMEOVER) {
    displayMessage("GAME OVER!", "Press RESET to try again!");
  } else {
    displayMessage("Press START to play!");
  }
}

class Powerup {
  constructor(type) {
    this.type = type;
    this.r = 15;
    this.x = random(this.r, width - this.r);
    this.y = this.r;
    this.speedY = 2;
  }

  move() {
    this.y += this.speedY;
    return this.y < height + this.r;
  }

  display() {
    push();
    switch (this.type) {
      case PowerupType.SNACK:
        fill(255, 100, 100);
        ellipse(this.x, this.y, this.r * 2);
        break;
      case PowerupType.WIDE:
        fill(100, 100, 255);
        rectMode(CENTER);
        rect(this.x, this.y, this.r * 2.5, this.r * 1.5);
        break;
      default:
        console.warn(`Unkown Powerup type: ${this.type}`);
        break;
    }
    pop();
  }

  hits(paddle) {
    // Simplified collision for powerups: check if it's near the paddle top
    if (
      this.y + this.r > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w
    ) {
      this.applyEffect();
      return true;
    }
    return false;
  }

  applyEffect() {
    switch (this.type) {
      case PowerupType.SNACK:
        if (lives < 3) lives++;
        break;
      case PowerupType.WIDE:
        paddle.w += 50;
        paddle.w = min(paddle.w, 250);
        paddle.wideFrames += 200;
        paddle.wideFrames = min(paddle.wideFrames, 600);
        break;
      default:
        break;
    }
  }
}

class Ball {
  constructor() {
    this.r = random(10, 20);
    this.x = random(this.r, width - this.r);
    this.y = this.r;

    this.speedY = random(settings.speedY);
    this.speedX = random(settings.speedX);
  }

  move() {
    this.y += this.speedY;
    this.x += this.speedX;

    // check if ball hits top wall
    if (this.y - this.r < 0) {
      this.y = this.r; // snap to avoid overlap
      this.speedY *= -1; // change direction
    }

    // check if ball hits side wall
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.speedX *= -1;
      this.x = constrain(this.x, this.r, width - this.r); // snap to avoid overlap
    }

    // check and return if ball hits bottom
    return this.y < height + this.r;
  }

  display() {
    ellipse(this.x, this.y, this.r * 2);
  }

  hits(paddle) {
    if (
      this.y + this.r > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w
    ) {
      this.y = paddle.y - this.r; // snap to avoid overlap

      // change direction and slightly speed up if not at max speed
      if (this.speedY <= 7) this.speedY *= -1.05;
      else this.speedY *= -1;

      score++;

      let pitch = map(abs(this.speedY), 2, 15, 50, 200);
      monoSynth.play(pitch, 0.2, 0, 0.005);
    }
  }
}

class Paddle {
  constructor(w, h) {
    this.baseW = w;
    this.w = this.baseW;
    this.h = h;
    this.x = width / 2 - this.w / 2;
    this.y = height - 25;
    this.wideFrames = 0;
  }

  move() {
    this.x = constrain(mouseX - this.w / 2, 0, width - this.w);
    if (this.wideFrames > 0) this.wideFrames--;
    else this.w = this.baseW;
  }

  display() {
    push();
    let normalColor = color("#4CAF50");
    let powerColor = color(100, 100, 255);
    let intensity = map(paddle.wideFrames, 0, 60, 0, 1, true);
    fill(lerpColor(normalColor, powerColor, intensity));
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
