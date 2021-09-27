import P5 from 'p5'
import { noop } from './utils';
import { config, gui } from './config'

class Sketch extends P5 {
  constructor() {
    super(noop);

    console.info(config.seed);
  }

  setup() {
    this.createCanvas(this.windowWidth, this.windowHeight);
  }

  draw() {
    this.background('black');
  }
}

export default new Sketch();
