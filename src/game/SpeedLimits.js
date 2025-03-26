// @ts-check
import { Vector } from "../math/Vector";

export class SpeedLimits {
  /**
   *
   * @param {{up:number, down:number, left?:number, right?:number}} param0
   */
  constructor({ up, down, left, right }) {
    this.up = up || Infinity;
    this.down = down || Infinity;
    this.left = left || Infinity;
    this.right = right || Infinity;
  }

  /**
   *
   * @param {Vector} speed
   */
  applyTo(speed) {
    if (speed.y > this.up) {
      speed.y = this.up;
    }
    if (speed.y < -this.down) {
      speed.y = -this.down;
    }
    if (speed.x > this.right) {
      speed.x = this.right;
    }
    if (speed.x < -this.left) {
      speed.x = -this.left;
    }
  }
}
