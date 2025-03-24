// @ts-check
import { Vector } from "../math/Vector.js";

export class Mouse {
  x = 0;
  y = 0;
  down = false;

  /**
   * @type {HTMLCanvasElement|null}
   */
  canvas = null;

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
   * @param {'X' | 'Y'} axis
   */
  toCanvas(ev, axis) {
    // Convert window space in canvas space coordinates
    let scrollOffset = {
      X: "Top",
      Y: "Left",
    };

    let pageProp = `page${axis}`;
    let clientProp = `client${axis}`;
    let scrollProp = `scroll${scrollOffset[axis]}`;
    let offsetProp = `offset${scrollOffset[axis]}`;

    let pos = 0;

    // @ts-ignore
    if (ev[pageProp]) {
      // @ts-ignore
      pos = ev[pageProp];
      // @ts-ignore
    } else if (ev[clientProp]) {
      pos =
        // @ts-ignore
        ev[clientProp] +
        // @ts-ignore
        document.body[scrollProp] +
        // @ts-ignore
        document.documentElement[scrollProp];
    }
    // @ts-ignore
    pos = pos - this.canvas[offsetProp];
    return pos;
  }

  /**
   *
   * @param {MouseEvent} ev
   */
  update(ev) {
    this.x = this.toCanvas(ev, "X");
    this.y = this.toCanvas(ev, "Y");
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
    this.canvas?.addEventListener("mousemove", this.update, false);
    this.canvas?.addEventListener("mousedown", this.setMouseDown, false);
    this.canvas?.addEventListener("mouseup", this.setMouseUp, false);
  }

  destroy() {
    this.canvas?.removeEventListener("mousemove", this.update, false);
    this.canvas?.removeEventListener("mousedown", this.setMouseDown, false);
    this.canvas?.removeEventListener("mouseup", this.setMouseUp, false);
  }
}
