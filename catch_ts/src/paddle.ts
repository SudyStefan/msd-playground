import type p5 from "p5";
import { height, width } from "./constants";
import { constrain } from "./helpers";

export default class Paddle {
  baseW: number;
  w: number;
  h: number;
  x: number;
  y: number;
  wideFrames: number;

  constructor(w: number, h: number) {
    this.baseW = w;
    this.w = w;
    this.h = h;
    this.x = width / 2 - w / 2;
    this.y = height - h + 5;
    this.wideFrames = 0;
  }

  move(p: p5) {
    this.x = constrain(p.mouseX - this.w / 2, 0, width - this.w);
    if (this.wideFrames > 0) this.wideFrames--;
    else this.w = this.baseW;
  }

  display(p: p5) {
    p.push();
    let normalColor = p.color("#4CAF50");
    let powerColor = p.color(100, 100, 255);
    let intensity = p.map(this.wideFrames, 0, 60, 0, 1, true);
    p.fill(p.lerpColor(normalColor, powerColor, intensity));
    p.rect(this.x, this.y, this.w, this.h);
    p.pop();
  }
}
