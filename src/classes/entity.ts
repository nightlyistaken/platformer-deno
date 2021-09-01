import { Canvas } from "https://deno.land/x/sdl2@0.1-alpha.6/src/canvas.ts";
// TODO: Add some music :)
class Entity {
  x: number;
  y: number;
  xChange: number;
  yChange: number;
  dimensions: number;
  image: any;
  imageSurface: any;
  name: string;
  constructor(
    x: number,
    y: number,
    xChange: number,
    yChange: number,
    dimensions: number,
    imageSurface: any,
    name: string,
    canvas: Canvas,
  ) {
    this.x = x;
    this.y = y;
    this.xChange = xChange;
    this.yChange = yChange;
    this.dimensions = dimensions;
    this.imageSurface = canvas.loadSurface("assets/" + imageSurface);
    this.image = canvas.createTextureFromSurface(this.imageSurface);
    this.name = name;
  }
}
export default Entity;
