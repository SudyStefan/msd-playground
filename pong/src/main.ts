import "./style.css";
import p5 from "p5";
import * as Tone from "tone";

const KeyCodes = {
  UP_ARROW: "ArrowUp",
  DOWN_ARROW: "ArrowDown",
  W: "w",
  S: "s",
} as const;

const Colors = {
  LEFT_PADDLE: "#4CAF50",
  RIGHT_PADDLE: "#fC7F00",
  BALL: "#dddddd",
} as const;

const GameState = {
  WAITING: 0,
  RUNNING: 1,
  SERVING: 2,
  PAUSED: 3,
} as const;

const MoveState = {
  UP: -1,
  STILL: 0,
  DOWN: 1,
};

const FRAMES_PER_SECOND = 30 as const;

abstract class DrawableObject {
  x: number;
  y: number;
  color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  abstract move(): void | boolean;
  abstract display(): void;
}

class Paddle extends DrawableObject {
  w: number;
  h: number;
  moveSpeed: number;

  upKey: string;
  downKey: string;
  hitPitch: number;

  moveState: number;

  constructor(
    w: number,
    h: number,
    x: number,
    moveSpeed: number,

    color: string,
    upKey: string,
    downKey: string,
    hitPitch: number,
  ) {
    super(x, canvas.height / 2 - h / 2, color);
    this.w = w;
    this.h = h;
    this.moveSpeed = moveSpeed;

    this.upKey = upKey;
    this.downKey = downKey;
    this.hitPitch = hitPitch;
    this.moveState = MoveState.STILL;
  }

  display() {
    canvas.push();
    canvas.fill(this.color);
    canvas.rect(this.x, this.y, this.w, this.h);
    canvas.pop();
  }

  move() {
    if (canvas.keyIsDown(this.upKey)) {
      this.y = canvas.constrain(
        this.y - this.moveSpeed,
        0,
        canvas.height + this.h,
      );
      this.moveState = MoveState.UP;
    } else if (canvas.keyIsDown(this.downKey)) {
      this.y = canvas.constrain(
        this.y + this.moveSpeed,
        0,
        canvas.height - this.h,
      );
      this.moveState = MoveState.DOWN;
    } else this.moveState = MoveState.STILL;
  }
}

class Ball extends DrawableObject {
  r: number;
  speedX: number;
  speedY: number;
  closestSide: string;

  constructor(r: number) {
    super(canvas.width / 2, canvas.height / 2, Colors.BALL);
    this.r = r;
    this.closestSide = "r";

    // randomise init speeds
    this.speedX = canvas.random(3, 4);
    if (canvas.random(1) > 0.5) this.speedX *= -1;
    this.speedY = canvas.random(-2, 2);
  }

  move() {
    this.y += this.speedY;
    this.x += this.speedX;

    // check if ball hits top or bottom
    if (this.y - this.r < 0) {
      this.y = this.r; // snap to avoid overlap
      this.speedY *= -1; // change direction
    } else if (this.y + this.r > canvas.height) {
      this.y = canvas.height - this.r;
      this.speedY *= -1;
    }

    //update closest side
    if (this.x < canvas.width / 2) this.closestSide = "l";
    else this.closestSide = "r";

    // check if ball hits paddle or oob
    switch (this.closestSide) {
      case "l":
        this.hits(leftPaddle);
        if (this.x - this.r - this.speedX <= 0) {
          score(this.closestSide);
          return false;
        }
        break;
      case "r":
        this.hits(rightPaddle);
        if (this.x + this.r + this.speedX >= canvas.width) {
          score(this.closestSide);
          return false;
        }
        break;
    }

    return true;
  }

  display() {
    canvas.push();
    canvas.ellipse(this.x, this.y, this.r * 2);
    canvas.pop();
  }

  hits(paddle: Paddle) {
    if (this.y > paddle.y && this.y < paddle.y + paddle.h) {
      switch (this.closestSide) {
        case "l":
          if (this.x - this.r > paddle.x + paddle.w) return;
          this.x = paddle.x + paddle.w + this.r; // snap to avoid overlap
          break;
        case "r":
          if (this.x + this.r < paddle.x) return;
          this.x = paddle.x - this.r;
          break;
      }

      this.speedX =
        this.speedX <= 7 ? (this.speedX *= -1.05) : (this.speedX *= -1);

      if (this.speedY <= 4)
        this.speedY = this.speedY + (paddle.moveSpeed * paddle.moveState) / 3;

      playHitSound(paddle.hitPitch);
    }
  }
}

const score = (side: string): void => {
  switch (side) {
    case "l":
      scoreRight++;
      playHitSound(200);
      break;
    case "r":
      scoreLeft++;
      playHitSound(300);
      break;
  }
  leftPaddle.y = canvas.height / 2 - leftPaddle.h / 2;
  rightPaddle.y = canvas.height / 2 - rightPaddle.h / 2;
};

const startGame = (): void => {
  serveFrameCounter = 0;
  currentState = GameState.SERVING;
};

const pauseGame = (): void => {
  currentState = GameState.PAUSED;
};

const resetGame = (): void => {
  ball = new Ball(10);
  leftPaddle = new Paddle(
    10,
    100,
    10,
    5,
    Colors.LEFT_PADDLE,
    KeyCodes.W,
    KeyCodes.S,
    60,
  );
  rightPaddle = new Paddle(
    10,
    100,
    canvas.width - 20,
    5,
    Colors.RIGHT_PADDLE,
    KeyCodes.UP_ARROW,
    KeyCodes.DOWN_ARROW,
    70,
  );
  scoreLeft = 0;
  scoreRight = 0;
  serveFrameCounter = 0;
  currentState = GameState.WAITING;
};

const runGame = (p: p5): void => {
  p.setup = () => {
    p.createCanvas(500, 400);
    resetGame();
  };

  p.draw = () => {
    // draw board
    p.background(61);
    drawNet();
    drawScore();

    ball.display();
    leftPaddle.display();
    rightPaddle.display();

    switch (currentState) {
      case GameState.RUNNING:
        if (playFrameCounter < FRAMES_PER_SECOND) {
          displayMessage("GO!");
          playFrameCounter++;
        }

        leftPaddle.move();
        rightPaddle.move();

        if (!ball.move()) {
          ball = new Ball(10);
          serveFrameCounter = 0;
          currentState = GameState.SERVING;
        }
        break;
      case GameState.SERVING:
        serveBall();
        break;
      case GameState.WAITING:
        displayMessage("Press START to serve!");
        break;
      case GameState.PAUSED:
        displayMessage("PAUSED!");
        break;
    }
  };
};

const displayMessage = (mainText: string, subText?: string): void => {
  canvas.push();
  canvas.textAlign(canvas.CENTER, canvas.CENTER);
  canvas.textFont("Arial");
  canvas.fill(240);

  canvas.textSize(42);
  canvas.text(mainText, canvas.width / 2, canvas.height / 4);

  if (subText) {
    canvas.textSize(18);
    canvas.text(subText, canvas.width / 2, canvas.height / 2 + 40);
  }
  canvas.pop();
};

const drawScore = (): void => {
  canvas.push();

  canvas.textAlign(canvas.CENTER, canvas.CENTER);
  canvas.textFont("Arial");
  canvas.fill(230);
  canvas.textSize(42);
  canvas.text(scoreLeft, canvas.width / 4, canvas.height / 8);
  canvas.text(scoreRight, canvas.width * 0.75, canvas.height / 8);

  canvas.pop();
};

const drawNet = (): void => {
  canvas.push();

  const ctx = canvas.drawingContext as CanvasRenderingContext2D;
  canvas.stroke(120);
  canvas.strokeWeight(4);
  ctx.setLineDash([15, 20]);
  canvas.line(canvas.width / 2, 0, canvas.width / 2, canvas.height);
  ctx.setLineDash([]);

  canvas.pop();
};

const serveBall = (): void => {
  if (serveFrameCounter < FRAMES_PER_SECOND) displayMessage("3");
  else if (serveFrameCounter < FRAMES_PER_SECOND * 2) displayMessage("2");
  else if (serveFrameCounter < FRAMES_PER_SECOND * 3) displayMessage("1");
  else if (serveFrameCounter < FRAMES_PER_SECOND * 4) {
    currentState = GameState.RUNNING;
    playFrameCounter = 0;
  }
  serveFrameCounter++;
};

const playHitSound = (pitch: number): void => {
  if (Tone.context.state !== "running") Tone.start();
  synth.triggerAttackRelease(pitch, "16n");
};

// game vars
let ball: Ball;
let leftPaddle: Paddle;
let rightPaddle: Paddle;
let scoreLeft: number;
let scoreRight: number;
let currentState: number;
let serveFrameCounter: number;
let playFrameCounter: number;

// const synth = new Tone.MonoSynth().toDestination();
const synth = new Tone.MonoSynth({
  envelope: {
    attack: 0.001, // Instant start
    decay: 0.1, // Quick fade
    sustain: 0, // Don't hold the note
    release: 0.1, // Short tail
  },
}).toDestination();
const canvas = new p5(runGame);

// sidebar
document.getElementById("start")!.onclick = startGame;
document.getElementById("pause")!.onclick = pauseGame;
document.getElementById("reset")!.onclick = resetGame;
