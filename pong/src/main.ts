import "./style.css";
import p5 from "p5";

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

abstract class GameObject {
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

class Paddle extends GameObject {
  w: number;
  h: number;
  moveSpeed: number;

  upKey: string;
  downKey: string;

  constructor(
    w: number,
    h: number,
    x: number,
    moveSpeed: number,

    color: string,
    upKey: string,
    downKey: string,
  ) {
    super(x, canvas.height / 2 - h / 2, color);
    this.w = w;
    this.h = h;
    this.moveSpeed = moveSpeed;

    this.upKey = upKey;
    this.downKey = downKey;
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
    } else if (canvas.keyIsDown(this.downKey)) {
      this.y = canvas.constrain(
        this.y + this.moveSpeed,
        0,
        canvas.height - this.h,
      );
    }
  }
}

class Ball extends GameObject {
  r: number;
  speedX: number;
  speedY: number;
  closestSide: string;

  constructor(r: number) {
    super(canvas.width / 2, canvas.height / 2, Colors.BALL);
    this.r = r;
    this.speedX = 2;
    this.speedY = 2;
    this.closestSide = 'r';
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
    if (this.x < canvas.width / 2) this.closestSide = 'l';
    else this.closestSide = 'r';
    
    // check if ball hits paddle or oob
    switch(this.closestSide) {
      case 'l':
        this.hits(leftPaddle);
        if (this.x - this.r - this.speedX <= 0) {
          scoreRight++;
          return false;
        }
        break;
      case 'r':
        this.hits(rightPaddle);
        if (this.x + this.r + this.speedX >= canvas.width) {
          scoreLeft++;
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
          this.x = paddle.x + paddle.w + this.r;
          break;
        case "r":
          if (this.x + this.r < paddle.x) return;
          this.x = paddle.x - this.r;
          break;
      }

      if (this.speedX <= 7) this.speedX *= -1.05;
      else this.speedX *= -1;

      // score++;
      // let pitch = canvas.map(canvas.abs(this.speedY), 2, 15, 50, 200);
      // canvas.monoSynth.play(pitch, 0.2, 0, 0.005);
    }
  }
}

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(500, 400);
    ball = new Ball(10);
    leftPaddle = new Paddle(
      10,
      100,
      10,
      5,
      Colors.LEFT_PADDLE,
      KeyCodes.W,
      KeyCodes.S,
    );
    rightPaddle = new Paddle(
      10,
      100,
      p.width - 20,
      5,
      Colors.RIGHT_PADDLE,
      KeyCodes.UP_ARROW,
      KeyCodes.DOWN_ARROW,
    );
    scoreLeft = 0;
    scoreRight = 0;
  };

  p.draw = () => {
    p.background(61);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();

    if (!ball.move()) ball = new Ball(10);
    
    leftPaddle.move();
    rightPaddle.move();
  };
};

let ball: Ball;
let leftPaddle: Paddle;
let rightPaddle: Paddle;
let scoreLeft: number;
let scoreRight: number;

const canvas = new p5(sketch);
