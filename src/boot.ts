/// <reference path="../node_modules/@types/p5/global.d.ts" />

import Sketch from "./sketch"

const sketch = new Sketch();

const connect = (name: string) => {
  const fn = (sketch[name]) as any;
  if (typeof fn === "function") {
    globalThis[name] = fn.bind(sketch);
  }
}

connect("preload")
connect("setup")
connect("draw")
connect("mouseMoved")
connect("mouseDragged")
connect("mousePressed")
connect("mouseReleased")
connect("mouseClicked")
connect("doubleClicked")
connect("mouseWheel")
connect("deviceMoved")
connect("deviceTurned")
connect("deviceShaken")
connect("keyPressed")
connect("keyReleased")
connect("keyTyped")

