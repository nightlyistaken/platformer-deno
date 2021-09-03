import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
import Player from "./src/classes/player.ts";
import checkCollusion from "./src/functions/collusion.ts";

let levelPasser: Player;

export function checkLevelPass(
  player: Player,
  canvas: Canvas,
  font: number,
): boolean {
  if (
    checkCollusion(
      player.x,
      player.y,
      player.dimensions,
      player.dimensions,
      levelPasser.x,
      levelPasser.y,
      levelPasser.dimensions,
      levelPasser.dimensions,
    )
  ) {
    canvas.setDrawColor(100, 100, 23, 255);
    canvas.clear();
    canvas.renderFont(
      font,
      "Loading...",
      {
        blended: { color: { r: 255, g: 255, b: 0, a: 255 } },
      },
      // @ts-ignore: using --no-check
      {
        x: 0,
        y: 80,
      },
    );
    canvas.present();
    return true;
  }
  return false;
}

function level0(canvas: Canvas, _font: number) {
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}

function level1(canvas: Canvas, _font: number) {
  levelPasser.x = 300;
  levelPasser.y = 300;
  levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
}

export default function init(
  canvas: Canvas,
): ((canvas: Canvas, font: number) => void)[] {
  levelPasser = new Player(
    100,
    50,
    0,
    0,
    34,
    "sprites/player.png",
    "Level passer",
    canvas,
  );

  return [level0, level1];
}
