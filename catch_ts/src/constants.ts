export const GameState = {
  START: "start",
  RUNNING: "running",
  GAMEOVER: "gameover",
} as const;

export interface Difficulty {
  speedY: [number, number];
  speedX: [number, number];
  newBallFrames: number;
}

export const DifficultyPreset: Record<"easy" | "medium" | "hard", Difficulty> =
  {
    easy: { speedY: [2, 4], speedX: [-0.5, 0.5], newBallFrames: 1000 },
    medium: { speedY: [3, 4], speedX: [-1, 1], newBallFrames: 500 },
    hard: { speedY: [4, 5], speedX: [-2, 2], newBallFrames: 500 },
  };

export const width = 500;
export const height = 400;