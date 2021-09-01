import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
function end(canvas: Canvas) {
  console.log("Game Over!");
  canvas.playMusic("./assets/audio/end.wav");
}
// Export
export default end;
