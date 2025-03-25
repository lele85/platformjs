// @ts-check
import { Vector } from "../math/Vector.js";
import { Keyboard } from "../utils/Keyboard.js";

export class Gravity {
  /**
   * @param {{ keyboard: Keyboard, observers: GravityObserver[] }} params
   */
  constructor({ keyboard, observers }) {
    this.TIME = 1 / 60.0;
    this.keyboard = keyboard;
    this.acceleration = new Vector(0, 7000);

    this.observers = observers || [];
  }

  notifyGravityInversion() {
    for (let index in this.observers) {
      this.observers[index].onGravityInversion();
    }
  }

  /**
   *
   * @param {Vector} speed
   */
  applyTo(speed) {
    speed.x = speed.x + 0.5 * this.acceleration.x * this.TIME;
    speed.y = speed.y + 0.5 * this.acceleration.y * this.TIME;
  }

  invert_y() {
    this.acceleration.y *= -1;
    this.notifyGravityInversion();
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    this.TIME = dt;
    if (this.keyboard.isJustPressed("INVERT_GRAVITY")) {
      this.invert_y();
    }
  }
}
