import Stats from "stats-js";

// ~ FPS Viewer

const stats = (() => {
  const ref = new Stats();
  ref.setMode(0);
  ref.domElement.style.display = 'none';
  document.body.appendChild(ref.domElement);
  return ref;
})();

export const showStats = () => stats.domElement.style.display = 'block';
export const hideStats = () => stats.domElement.style.display = 'none';

