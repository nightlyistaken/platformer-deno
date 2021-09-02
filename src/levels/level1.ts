import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
function level1(canvas: Canvas, font: any) {
  canvas.clear();
  canvas.setDrawColor(100, 100, 23, 255);
  canvas.present();
  canvas.renderFont(
    font,
    "Congrats! You had passed level 1!",
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
}
// Export
export default level1;
