import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
import Player from "./src/classes/player.ts";
import start from "./src/start.ts";
import gameIntro from "./src/intro.ts";
import end from "./src/end.ts";
import level1 from "./src/levels/level1.ts";
import checkCollusion from "./src/functions/collusion.ts";
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
const font = canvas.loadFont("./assets/fonts/mainfont.ttf", 50, {
  style: "normal",
});

let isSpace = false;
let isRight = false;
let isLeft = false;
let intro = true;
let level = 1;
// 1 arg: playerX 2 arg: playerY, 3 and 4 args: X and Y change values, 5 arg: Dimensions,
// 6 arg: dimensions, 7 arg: image of the entity, 8 arg: name of the entity,
// 9 arg: The game screen AKA canvas.
const player = new Player(
  300,
  50,
  0,
  0,
  64,
  "sprites/player.png",
  "My player",
  canvas
);
const levelPasser = new Player(
  100,
  50,
  0,
  0,
  34,
  "sprites/player.png",
  "Level passer",
  canvas
);
console.log(player.name);

// Functions
console.log("Started to draw!");
function gameLoop() {
  if (!intro) {
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

    player.x += player.xChange;
    // Reset space state

    if (player.y >= 400 - player.dimensions) {
      player.y = 400 - player.dimensions;
    }
    if (
      checkCollusion(
        player.x,
        player.y,
        player.dimensions,
        player.dimensions,
        levelPasser.x,
        levelPasser.y,
        levelPasser.dimensions,
        levelPasser.dimensions
      )
    ) {
      if (level == 1) {
        level = 2;
        level1(canvas, font);
      }
      canvas.present();
    }
    canvas.clear();
    player.draw(player.x, player.y, canvas, player);
    levelPasser.draw(levelPasser.x, levelPasser.y, canvas, levelPasser);
    canvas.present();
  } else {
    canvas.clear();
    gameIntro(canvas, font);
    canvas.present();
  }
  Deno.sleepSync(10);
}

canvas.present();

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
      if (event.keycode == 121) {
        console.log("Y key is pressed");
        intro = false;
      }
      break;
    default:
      break;
  }
}
