import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";

function gameIntro(canvas: Canvas, font: any) {
  canvas.clear();
  canvas.renderFont(
    font,
    "Hello, Deno!",
    {
      blended: { color: { r: 255, g: 255, b: 0, a: 255 } },
    },
    // @ts-ignore: using --no-check
    {
      x: 150,
      y: 30,
    },
  );
}

export default gameIntro;
