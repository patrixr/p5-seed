import Palette from './tools/palette';
import { noop } from './tools/utils';
import { GUI } from './tools/gui'
import P5 from 'p5'
import './style.css'

export class Sketch extends P5 {
  public palette: Palette
  public gui: GUI

  constructor() {
    super(noop);
  }

  setup() {
    this.palette = new Palette(this);
    this.gui = new GUI(this);
    this.createCanvas(this.windowWidth, this.windowHeight);
  }

  draw() {
    this.background('black');
  }

  keyPressed() {
    if (this.keyCode === this.ESCAPE) {
      this.gui.toggle();
    }
  }
}


export default Sketch;

