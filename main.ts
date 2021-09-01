import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
import start from "./src/start.ts";
import end from "./src/end.ts";

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

const assets = "assets/";
class Player {
  constructor(x: any, y: any, x_change: any, dimensions: any, image: any) {
    this.x = x;
  }
}
const playerEntity = new Player(1, 2, 3, 4, 5);
const playerSurfaceJump = canvas.loadSurface(assets + "sprites/player.png");
const playerImgJump = canvas.createTextureFromSurface(playerSurfaceJump);

const playerDimensions = 64;
let playerY = 50;
let playerX = 300;
let playerX_change = 0;
// Functions

function player(x: number, y: number) {
  canvas.copy(
    playerImgJump,
    {
      x: 0,
      y: 0,
      width: 140,
      height: 140,
    },
    {
      x: x,
      y: y,
      width: playerDimensions,
      height: playerDimensions,
    }
  );
}
console.log("Started to draw!");
function gameLoop() {
  if (isSpace) {
    playerY -= 70;
    isSpace = false;
  } else {
    // Give player downwards acceleration
    playerY += gravity;
  }
  if (isLeft) {
    playerX_change -= 1;
    isLeft = false;
  }
  if (isRight) {
    playerX_change += 1;
    isRight = false;
  }
  player(playerX, playerY);

  playerX += playerX_change;
  // Reset space state

  if (playerY >= 400 - playerDimensions) {
    playerY = 400 - playerDimensions;
  }
  canvas.present();
  canvas.clear();
  Deno.sleepSync(10);
}

canvas.present();
// @ts-ignore
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
