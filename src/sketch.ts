import palette from './tools/palette';
import { GUI } from './tools/gui'
import './style.css'

export class Sketch {
  public gui: GUI

  setup() {
    this.gui = new GUI();
    createCanvas(windowWidth, windowHeight);
  }

  draw() {
    this.gui.stats.begin();
    background(palette.colors.color1);
    this.gui.stats.end();
  }

  keyPressed() {
    if (keyCode === ESCAPE) {
      this.gui.toggle();
    }
  }
}

export default Sketch;

