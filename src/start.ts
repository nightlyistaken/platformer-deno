import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
function start(canvas: Canvas) {
  canvas.setCursor("assets/sprites/mainCursor.png");
  canvas.setDrawColor(0, 64, 255, 255);
  canvas.clear();
}
// Export
export default start;
