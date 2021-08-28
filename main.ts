import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";

const canvas = new Canvas({ title: "Hello, Deno!", width: 400, height: 800 });

canvas.setCursor("assets/sprites/mainCursor.png");
canvas.setDrawColor(0, 64, 255, 255);
canvas.clear();
canvas.present();

function game() {
    // Game Logic
}

for await (const event of canvas) {
  switch (event.type) {
    case "quit":
        canvas.quit()
        break;
    case "draw":
        game();
        break;
      break;
    case "mouse_motion":
      // Mouse stuff
      break;
    case "key_down":
      // Keyboard stuff
      break;
    // ...
    default:
      break;
  }
}