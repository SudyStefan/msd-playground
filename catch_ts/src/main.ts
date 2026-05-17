import p5 from "p5";
import { DifficultyPreset } from "./constants";
import Game from "./game";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<!-- js insert point -->
<main id="sketch-holder"></main>

<div id="sidebar">
  <h1>Catch Game</h1>
  <p>Score: <span id="score">0</span></p>
  <div id="liveContainer">
    <div class="live">❤</div>
    <div class="live">❤</div>
    <div class="live">❤</div>
  </div>
  <h3>Difficulty:</h3>
  <div class="difficultyContainer">
    <input type="radio" id="easy" name="difficulty" value="easy" checked />
    <label for="easy">easy</label>

    <input type="radio" id="medium" name="difficulty" value="medium" />
    <label for="medium">Medium</label>

    <input type="radio" id="hard" name="difficulty" value="hard" />
    <label for="hard">HARD</label>
  </div>
  <button id="start">START</button>
  <button id="reset">RESET</button>
</div>
`;

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(500, 400);
  };

  p.draw = () => {
    p.background(61);
    game.update();
  };
};

const p = new p5(sketch)
export const game = new Game(p);
