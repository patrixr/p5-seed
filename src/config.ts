import { Maybe } from './types';
import * as dat from 'dat.gui';
import { hideStats, showStats } from './debug';

// --- HELPERS

function option(key: string, defaultValue: Maybe<string> = null) {
  const urlSearchParams = new URLSearchParams(window.location.search) as any;
  const params = Object.fromEntries(urlSearchParams.entries());

  if (params[key] && typeof params[key] === 'string') {
    return params[key];
  }

  return defaultValue;
}

option.bool = (key: string, defaultValue = false) => {
  const param = option(key);
  return param ? /^true$/i.test(param) : defaultValue;
}

 option.number = (key: string, defaultValue : number) => {
  const param = Number(option(key));
  return isNaN(param) ? defaultValue : param;
}

// ---- CONFIG

const config = {
  debug: option.bool('debug', false),
  seed: option.number('seed', Math.round(Number(Date.now() + Math.random() * 1000000))),
  showFPS: false
};

const gui = new dat.GUI();

gui.hide();
gui.add(config, "seed");
gui.add(config, "showFPS").onChange(() => config.showFPS ? showStats() : hideStats())

if (config.debug) {
  gui.show();
} else {
  gui.hide();
}

export { gui, config }
