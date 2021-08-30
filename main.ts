import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
const canvasWidth = 800;
const canvasHeight = 400;
// Change canvasHeight and canvasWidth after deno_sdl2 width, height fix.
const canvas = new Canvas({
  title: "deno-platformer",
  width: canvasHeight,
  height: canvasWidth,
});

canvas.setCursor("assets/sprites/mainCursor.png");
canvas.setDrawColor(0, 64, 255, 255);
canvas.clear();

// Variables
const gravity = 2;
let isSpace = false;
let isRight = false;
let isLeft = false;

const assets = "assets/";
const playerSurfaceJump = canvas.loadSurface(assets + "sprites/player.png");
const playerImgJump = canvas.createTextureFromSurface(playerSurfaceJump);

const playerDimensions = 64;
let playerY = 50;
let playerX = 300;
// Functions

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
    playerX -= 10;
    isLeft = false;
  }
  if (isRight) {
    playerX += 10;
    isRight = false;
  }
  // Reset space state
  isSpace = false;
  canvas.copy(
    playerImgJump,
    {
      x: 0,
      y: 0,
      width: 140,
      height: 140,
    },
    {
      x: playerX,
      y: playerY,
      width: playerDimensions,
      height: playerDimensions,
    }
  );
  if (playerY >= 400 - playerDimensions) {
    playerY = 400 - playerDimensions;
  }
  canvas.present();
  canvas.clear();
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
