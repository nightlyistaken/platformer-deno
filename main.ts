import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
import Player from "./src/classes/player.ts";
import gameIntro from "./src/intro.ts";
import levelsInit, { checkLevelPass } from "./levels.ts";

const canvasWidth = 1000;
const canvasHeight = 600;

// Change canvasHeight and canvasWidth after deno_sdl2 width, height fix.
const canvas = new Canvas({
  title: "deno-platformer",
  width: canvasHeight,
  height: canvasWidth,
});
canvas.setCursor("assets/sprites/mainCursor.png");
canvas.clear();

// Variables
const gravity = 1;
const font = canvas.loadFont("./assets/fonts/mainfont.ttf", 20, {
  style: "normal",
});
// TODO: Add some music -_-
// DOING:
const BgSurface = canvas.loadSurface("assets/sprites/sky.png");
const BgImg = canvas.createTextureFromSurface(BgSurface);

let isSpace = false;
let isRight = false;
let isLeft = false;
let intro = true;
let playing = false;
let level = 1;
const levels = levelsInit(canvas);
let levelTransition = false;

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
  canvas,
);

// Functions
console.log("Started to draw!");
function gameLoop() {
  canvas.setDrawColor(255, 55, 25, 255);
  if (levelTransition) {
    return;
  }
  if (!intro) {
    if (!playing) {
      canvas.playMusic("assets/audio/hit.wav");
      playing = true;
    }
    canvas.clear();
    canvas.copy(
      BgImg,
      {
        x: 0,
        y: 0,
        width: 1000,
        height: 600,
      },
      {
        x: 0,
        y: 0,
        width: 1000,
        height: 600,
      },
    );
    if (isSpace) {
      player.y -= 80;
      canvas.playMusic("assets/audio/jump.wav");
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
      isRight = false;
    }

    player.x += player.xChange;
    // Reset space state

    if (player.y >= canvasHeight - player.dimensions) {
      player.y = canvasHeight - player.dimensions;
    }
    if (player.x >= canvasWidth - player.dimensions) {
      player.x = canvasWidth - player.dimensions;
    }

    if (checkLevelPass(player, canvas, font)) {
      level += 1;
      levelTransition = true;
      setTimeout(() => {
        levelTransition = false;
        // Spawn player
        player.x = 0;
        player.y = 0;
      }, 1000);
      // Move player out of map
      player.x = 1000;
      player.y = 1000;
    }

    player.draw(player.x, player.y, canvas, player);

    // Level renderer
    if (level > levels.length) {
      // All levels passed
      return;
    } else {
      levels[level - 1](canvas, font, player);
    }

    canvas.present();
  } else {
    gameIntro(canvas, font);
    canvas.present();
  }
  // @ts-ignore: Deno is imported
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
