import type p5 from "p5";
import type { FallingObject } from "./falling-objects";
import type Paddle from "./paddle";
import { game } from "./main";

export interface Powerup {
  applyEffect(): void;
}

export class WidePowerup implements FallingObject, Powerup {
  x: number;
  y: number;
  r: number;

  speedX: number;
  speedY: number;
  p: p5;

  constructor(p: p5) {
    this.p = p;
    this.r = 15;
    this.x = p.random(this.r, p.width - this.r);
    this.y = this.r;

    this.speedX = 0;
    this.speedY = 2;
  }

  move() {
    this.y += this.speedY;
    return this.y < this.p.height + this.r;
  }

  display() {
    this.p.push();
    this.p.fill(100, 100, 255);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(this.x, this.y, this.r * 2.5, this.r * 1.5);
    this.p.pop();
  }

  hits() {
    // Simplified collision for powerups: check if it's near the paddle top
    if (
      this.y + this.r > game.paddle.y &&
      this.x > game.paddle.x &&
      this.x < game.paddle.x + game.paddle.w
    ) {
      this.applyEffect();
      return true;
    }
    return false;
  }

  applyEffect() {
    game.paddle.w += 50;
    game.paddle.w = Math.min(game.paddle.w, 250);
    game.paddle.wideFrames += 200;
    game.paddle.wideFrames = Math.min(game.paddle.wideFrames, 600);
  }
}

export class SnackPowerup implements FallingObject, Powerup {
  x: number;
  y: number;
  r: number;

  speedX: number;
  speedY: number;
  p: p5;

  constructor(p: p5) {
    this.p = p;
    this.r = 15;
    this.x = p.random(this.r, p.width - this.r);
    this.y = this.r;

    this.speedX = 0;
    this.speedY = 2;
  }

  move() {
    this.y += this.speedY;
    return this.y < this.p.height + this.r;
  }

  display() {
    this.p.push();
    this.p.fill(255, 100, 100);
    this.p.ellipse(this.x, this.y, this.r * 2);
    this.p.pop();
  }

  hits() {
    // simplified collision for powerups: check if it's near the paddle top
    if (
      this.y + this.r > game.paddle.y &&
      this.x > game.paddle.x &&
      this.x < game.paddle.x + game.paddle.w
    ) {
      this.applyEffect();
      return true;
    }
    return false;
  }

  applyEffect() {
    if (game.lives < 3) game.lives++;
  }
}
