import { urlConfig } from './utils';

// ------------------------------------
// ~ Config
// ------------------------------------

export const config = urlConfig({
  //
  //
  // Add configuration options here
  //
  //
  gui: false,
  seed: Math.round(Number(Date.now() + Math.random() * 1000000))
});




