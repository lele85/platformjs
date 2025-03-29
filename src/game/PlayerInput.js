import { Vector } from "../math/Vector";
import { PlayerKeyboardProvider } from "./PlayerKeyboardProvider";

export class PlayerInput {
  /**
   * @param {{ player_id: string; keyboard_provider: PlayerKeyboardProvider; }} params
   */
  constructor({ player_id, keyboard_provider }) {
    this.player_id = player_id;
    this.keyboard_provider = keyboard_provider;
    this.MAX_HORIZONTAL_SPEED = 250;
    this.HORIZONTAL_DECELERATION = 1600;
    this.HORIZONTAL_ACCELERATION = 2000;
  }

  /**
   *
   * @param {Vector} speed
   * @param {number} dt
   */
  applyTo(speed, dt) {
    var keyboard = this.keyboard_provider.getKeyboard(this.player_id);
    if (keyboard.isHeld("RIGHT")) {
      var x_speed_increment = 0;
      if (speed.x < this.MAX_HORIZONTAL_SPEED) {
        x_speed_increment = this.HORIZONTAL_ACCELERATION * dt;
      }
      speed.x += x_speed_increment;
    }

    if (keyboard.isHeld("LEFT")) {
      var x_speed_increment = 0;
      if (speed.x > -this.MAX_HORIZONTAL_SPEED) {
        x_speed_increment = this.HORIZONTAL_ACCELERATION * dt;
      }
      speed.x -= x_speed_increment;
    }

    if (!keyboard.isHeld("RIGHT") && !keyboard.isHeld("LEFT")) {
      if (speed.x > 0) {
        speed.x -= this.HORIZONTAL_DECELERATION * dt;
        if (speed.x < 0) speed.x = 0;
      } else if (speed.x < 0) {
        speed.x += this.HORIZONTAL_DECELERATION * dt;
        if (speed.x > 0) speed.x = 0;
      }
    }
  }
}
