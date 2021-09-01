import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
import Entity from "./src/classes/entity.ts";
import start from "./src/start.ts";
import end from "./src/end.ts";
import level1 from "./src/levels/level1.ts";

const canvasWidth = 800;
const canvasHeight = 400;

// Change canvasHeight and canvasWidth after deno_sdl2 width, height fix.
const canvas = new Canvas({
  title: "deno-platformer",
  width: canvasHeight,
  height: canvasWidth,
});
start(canvas);
// Variables
const gravity = 2;
let isSpace = false;
let isRight = false;
let isLeft = false;

const player = new Entity(
  300,
  50,
  0,
  64,
  "sprites/player.png",
  "Denosaur",
  canvas
);

// Functions
console.log(player.name);
function drawPlayer(x: number, y: number) {
  canvas.copy(
    player.image,
    {
      x: 0,
      y: 0,
      width: 140,
      height: 140,
    },
    {
      x: x,
      y: y,
      width: player.dimensions,
      height: player.dimensions,
    }
  );
}
console.log("Started to draw!");
function gameLoop() {
  if (isSpace) {
    player.y -= 70;
    isSpace = false;
  } else {
    // Give player downwards acceleration
    player.y += gravity;
  }
  if (isLeft) {
    player.xChange -= 1;
    isLeft = false;
  }
  if (isRight) {
    player.xChange += 1;
    end(canvas);
    isRight = false;
  }
  drawPlayer(player.x, player.y);

  player.x += player.xChange;
  // Reset space state

  if (player.y >= 400 - player.dimensions) {
    player.y = 400 - player.dimensions;
  }
  canvas.present();
  canvas.clear();

  // @ts-ignore: Deno Functionality
  Deno.sleepSync(10);
}

canvas.present();
// @ts-ignore: FIXME: Why a redline?
for await (const event of canvas) {
  switch (event.type) {
    case "quit":
      console.log("Quit");
      canvas.quit();
      break;
    case "draw":
      gameLoop();
      break;
    case "mouse_motion":
      // Mouse stuff
      break;
    case "key_down":
      if (event.keycode == 32) {
        console.log("Space key is pressed");
        if (!isSpace) isSpace = true;
        level1(canvas);
      }
      if (event.keycode == 97) {
        console.log("A key is pressed");
        if (!isLeft) isLeft = true;
      }
      if (event.keycode == 100) {
        console.log("D key is pressed");
        if (!isRight) isRight = true;
      }
      if (event.keycode == 1073741904) {
        console.log("Left arrow key AKA A is pressed");
        if (!isLeft) isLeft = true;
      }
      if (event.keycode == 1073741903) {
        console.log("Right arrow key AKA D is pressed");
        if (!isRight) isRight = true;
      }
      break;
    default:
      break;
  }
}
