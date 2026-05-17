import type p5 from "p5";
import { DifficultyPreset, type Difficulty, GameState } from "./constants";
import { Ball } from "./falling-objects";
import Paddle from "./paddle";
import type { Powerup } from "./powerup";

export default class Game {
  p: p5;
  score: number;
  lives: number;
  paddle: Paddle;
  settings: Difficulty;
  balls: Ball[];
  powerups: Powerup[];
  gameState: string;
  framesSinceLastBall: number;

  constructor(p: p5) {
    this.p = p;
    this.score = 0;
    this.lives = 3;
    this.paddle = new Paddle(100, 20);
    this.settings = DifficultyPreset.easy;
    this.balls = [];
    this.powerups = [];
    this.gameState = GameState.START;
    this.framesSinceLastBall = 0;
  }

  update = (): void => {
    this.drawObjects();
    this.progressState();
  };

  drawObjects = (): void => {};

  progressState = (): void => {
    switch (this.gameState) {
      case GameState.START:
        this.displayMessage("Press START to play!");
        break;
      case GameState.RUNNING:
        this.framesSinceLastBall >= this.settings.newBallFrames
          ? this.addBall()
          : this.framesSinceLastBall++;
        this.isGameOver();
        break;
      case GameState.GAMEOVER:
        this.displayMessage("GAME OVER!", "Press RESET to try again!");
        break;
      default:
        console.warn("Uknown GameState!");
        return;
    }
  };

  displayMessage = (mainText: string, subText?: string) => {
    this.p.push();
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.textFont("Arial");
    this.p.fill(200);

    this.p.textSize(42);
    this.p.text(mainText, this.p.width / 2, this.p.height / 2);

    if (subText) {
      this.p.textSize(18);
      this.p.text(subText, this.p.width / 2, this.p.height / 2 + 40);
    }
    this.p.pop();
  };

  addBall = () => {
    this.balls.push(new Ball(this.p));
    this.framesSinceLastBall = 0;
  };

  isGameOver = () => {
    if (this.lives < 1) {
      console.log(`Game Over! Final Score: ${this.score}`);
      this.gameState = GameState.GAMEOVER;
    }
  };
}
