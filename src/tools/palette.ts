import P5, { Color } from "p5";
import Sketch from "../sketch";
import { urlConfig } from "./utils";

const ALL = [
  ["5a5353","a07178","e6ccbe","776274","c8cc92"],
  ["fcefef","7fd8be","a1fcdf","fcd29f","fcab64"],
  ["a0ddff","758ecd","c1cefe","7189ff","624cab"],
  ["373f51","008dd5","dfbbb1","f56476","e43f6f"],
  ["16697a","489fb5","82c0cc","ede7e3","ffa62b"],
  ["5b2333","f7f4f3","564d4a","f24333","ba1b1d"],
  ["d1bce3","c49bbb","a1867f","585481","19297c"],
  ["dbb1bc","d3c4e3","8f95d3","89daff","58504a"],
  ["d0efb1","b3d89c","9dc3c2","77a6b6","4d7298"],
  ["edafb8","f7e1d7","dedbd2","b0c4b1","4a5759"],
  ["83b692","f9ada0","f9627d","c65b7c","5b3758"],
  ["6ccff6","001011","757780","fffffc","98ce00"],
  ["587291","2f97c1","1ccad8","15e6cd","0cf574"],
  ["437c90","255957","eeebd3","a98743","f7c548"],
  ["048a81","06d6a0","54c6eb","8a89c0","cda2ab"],
  ["f59ca9","f6828c","df57bc","a03e99","371e30"],
  ["a9ddd6","7a8b99","91adc2","9ba0bc","c1b8c8"],
  ["f2f3ae","edd382","fc9e4f","ff521b","020122"],
  ["151515","a63d40","e9b872","90a959","6494aa"],
  ["071e22","1d7874","679289","f4c095","ee2e31"],
  ["bf1a2f","f00699","454e9e","018e42","f7d002"],
  ["ee6c4d","f38d68","662c91","17a398","33312e"],
  ["67597a","544e61","6e8894","85baa1","ceeddb"],
  ["463730","1f5673","759fbc","90c3c8","b9b8d3"],
  ["c97064","bca371","a6b07e","68a357","32965d"],
  ["2d7dd2","97cc04","eeb902","f45d01","474647"],
  ["c2f9bb","9ad1d4","62c370","cc3363","20063b"],
  ["270722","ecce8e","dbcf96","c2c6a7","9ac2c5"]
];

export class Palette {
  p5: P5
  colors: {
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
  }

  constructor(p5: Sketch) {
    this.p5 = p5;
    this.colors = urlConfig(
      p5.random(ALL).reduce((out, c, idx) => (
        { ...out, [`color${idx + 1}`]: `#${c}`.toUpperCase() }
      ), {})
    );
  }

  /**
   * An array of p5 Colors
   *
   * @readonly
   * @memberof Palette
   */
  get colorList() {
    return Object.values(this.colors).map((c) => this.p5.color(c));
  }

  /**
   * Returns a random color from the current palette
   *
   * @returns {Color}
   * @memberof Palette
   */
  getRandomColor() : Color {
    const { p5, colorList } = this;
    return p5.color(p5.random(colorList));
  }

  /**
   * Returns true if the 2 colors are the same
   *
   * @param {(Color | string)} cl1
   * @param {(Color | string)} cl2
   * @returns
   * @memberof Palette
   */
  equalColors(cl1 : Color | string, cl2 : Color | string) {
    return (
      this.p5.red(cl1) === this.p5.red(cl2) &&
      this.p5.green(cl1) === this.p5.green(cl2) &&
      this.p5.blue(cl1) === this.p5.blue(cl2)
    )
  }

  /**
   * Return another color from the palette
   *
   * @param {(string | Color)} clr
   * @returns
   * @memberof Palette
   */
  getComplementaryColor(clr : string | Color) {
    let newColor = this.getRandomColor();
    while (this.equalColors(newColor, clr)) {
      newColor = this.getRandomColor();
    }
    return newColor;
  }
}

export default Palette;

