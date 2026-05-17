import type Paddle from "./paddle";
import { game } from "./main";
import type p5 from "p5";

export interface FallingObject {
  x: number;
  y: number;
  r: number;

  speedX: number;
  speedY: number;
  p: p5;

  move(): boolean;
  display(): void;
  hits(paddle: Paddle): boolean;
}

export class Ball implements FallingObject {
  x: number;
  y: number;
  r: number;

  speedX: number;
  speedY: number;
	p: p5;

	constructor(p: p5) {
		this.p = p;
    this.r = p.random(10, 20);
    this.x = p.random(this.r, p.width - this.r);
    this.y = this.r;

    this.speedX = p.random(game.settings.speedX);
    this.speedY = p.random(game.settings.speedY);
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
    if (this.x - this.r < 0 || this.x + this.r > this.p.width) {
      this.speedX *= -1;
      this.x = this.p.constrain(this.x, this.r, this.p.width - this.r); // snap to avoid overlap
    }

    // check and return if ball hits bottom
    return this.y < this.p.height + this.r;
  }

  display() {
    this.p.ellipse(this.x, this.y, this.r * 2);
  }

  hits() {
    if (
      this.y + this.r > game.paddle.y &&
      this.x > game.paddle.x &&
      this.x < game.paddle.x + game.paddle.w
    ) {
      this.y = game.paddle.y - this.r; // snap to avoid overlap

      // change direction and slightly speed up if not at max speed
      if (this.speedY <= 7) this.speedY *= -1.05;
      else this.speedY *= -1;

      game.score++;
      return true;
      // let pitch = map(abs(this.speedY), 2, 15, 50, 200);
      // monoSynth.play(pitch, 0.2, 0, 0.005);
    }
    return false;
  }
}
