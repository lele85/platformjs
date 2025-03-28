import { Vector } from "../math/Vector.js";

export class Mouse {
  x = 0;
  y = 0;
  down = false;

  /**
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * @type {((pos: Vector) => void)[]}
   */
  clickObservers = [];

  /**
   *
   * @param {{canvas: HTMLCanvasElement }} params
   */
  constructor({ canvas }) {
    this.canvas = canvas;
    this.update = this.update.bind(this);
    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);
  }

  /**
   *
   * @param {MouseEvent} ev
   */
  update(ev) {
    // Obtain the rectangle that defines the area of the canvas
    const rect = this.canvas.getBoundingClientRect();

    // Calculate the position of the mouse in the canvas
    this.x = ev.clientX - rect.left;
    this.y = ev.clientY - rect.top;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  isDown() {
    return this.down;
  }

  setMouseDown() {
    this.down = true;
  }

  setMouseUp() {
    for (let i = this.clickObservers.length - 1; i >= 0; i--) {
      this.clickObservers[i](new Vector(this.x, this.y));
    }
    this.down = false;
  }

  /**
   *
   * @param {(pos: Vector) => void} cb
   */
  onClick(cb) {
    this.clickObservers.push(() => {
      cb(new Vector(this.x, this.y));
    });
  }

  init() {
    this.canvas.addEventListener("mousemove", this.update, false);
    this.canvas.addEventListener("mousedown", this.setMouseDown, false);
    this.canvas.addEventListener("mouseup", this.setMouseUp, false);
  }

  destroy() {
    this.canvas.removeEventListener("mousemove", this.update, false);
    this.canvas.removeEventListener("mousedown", this.setMouseDown, false);
    this.canvas.removeEventListener("mouseup", this.setMouseUp, false);
  }
}
