import { DateTime } from "./utils/DateTime";
import config from "../assets/levels/000.yaml?raw";
import { Scene } from "./game/Scene";

window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  if (!canvas || canvas instanceof HTMLCanvasElement === false) {
    throw new Error("Canvas not found");
  }
  // get webgl context
  var context = canvas.getContext("2d", { desynchronized: true });

  if (!context || context instanceof CanvasRenderingContext2D === false) {
    throw new Error("Context not found");
  }
  const ratio = window.devicePixelRatio || 1;
  canvas.width = 640 * ratio;
  canvas.height = 480 * ratio;
  canvas.style.width = 640 + "px";
  canvas.style.height = 480 + "px";
  context.imageSmoothingEnabled = false;
  context.scale(ratio, ratio);

  const scene = new Scene(canvas, context, config);

  var last_frame_ticks = DateTime.now();
  var current_frame_ticks = last_frame_ticks;
  var dt;

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  var mainloop = function (context) {
    current_frame_ticks = DateTime.now();
    dt = (current_frame_ticks - last_frame_ticks) / 1000;

    scene.update(dt);
    scene.draw(context);

    last_frame_ticks = current_frame_ticks;
  };

  var recursiveAnim = ((context) => () => {
    mainloop(context);
    window.requestAnimationFrame(recursiveAnim);
  })(context);

  window.requestAnimationFrame(recursiveAnim);
};
