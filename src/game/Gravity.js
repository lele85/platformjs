import { Vector } from "../math/Vector.js";
import { Keyboard } from "../utils/Keyboard.js";

export class Gravity {
  /**
   * @param {{ keyboard: Keyboard, observers: GravityObserver[] }} params
   */
  constructor({ keyboard, observers }) {
    this.keyboard = keyboard;
    this.acceleration = new Vector(0, 3500);

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
   * @param {number} dt
   */
  applyTo(speed, dt) {
    speed.x += this.acceleration.x * dt;
    speed.y += this.acceleration.y * dt;
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
    if (this.keyboard.isJustPressed("INVERT_GRAVITY")) {
      this.invert_y();
    }
  }
}
