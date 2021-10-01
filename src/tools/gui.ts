import { config } from "./config";
import Sketch from "../sketch";
import * as dat from 'dat.gui';
import Stats from "stats-js";

// ------------------------------------
// ~ GUI
// ------------------------------------

export class GUI extends dat.GUI {
  stats: any

  constructor(sketch: Sketch) {
    super();

    // Add FPS Meter
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.display = 'none';
    document.body.appendChild(this.stats.domElement);

    // Configure GUI
    this.add(config, "seed");

    const paletteFolder = this.addFolder('Palette');

    paletteFolder.addColor(sketch.palette.colors, 'color1');
    paletteFolder.addColor(sketch.palette.colors, 'color2');
    paletteFolder.addColor(sketch.palette.colors, 'color3');
    paletteFolder.addColor(sketch.palette.colors, 'color4');
    paletteFolder.addColor(sketch.palette.colors, 'color5');

    const buttons = {
      "save": () => sketch.save(`out_${Date.now()}.png`),
      "reload": () => window.location.reload(),
      "reset": () => {
        const path = window.location.protocol + "//" + window.location.host + window.location.pathname + '?gui=true';
        window.history.pushState({ path },'', path);
        window.location.reload();
      }
    };

    this.add(buttons, 'save');
    this.add(buttons, 'reload');
    this.add(buttons, 'reset');
    this.setVisible(config.gui);
  }

  hide() {
    config.gui = false;
    this.stats.domElement.style.display = 'none';
    super.hide();
  }

  show() {
    config.gui = true;
    this.stats.domElement.style.display = 'block';
    super.show();
  }

  setVisible(visible: boolean) {
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  toggle() {
    if (config.gui) {
      this.hide();
    } else {
      this.show();
    }
  }
}
