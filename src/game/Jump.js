import { Vector } from "../math/Vector.js";
import { PlayerKeyboardProvider } from "./PlayerKeyboardProvider.js";
import { PlayerState } from "./PlayerState.js";

export class Jump {
  /**
   *
   * @param {{
   *  player_id : string,
   *  keyboard_provider : PlayerKeyboardProvider,
   *  player_state: PlayerState
   * }} options
   */
  constructor({ player_id, keyboard_provider, player_state }) {
    this.player_id = player_id;
    this.keyboard_provider = keyboard_provider;
    this.state = player_state;
    this.jump_speed = new Vector(0, 0);
    this.jump_direction = new Vector(1, 1);
  }

  /**
   * @param {Vector} current_speed
   * @param {number} dt
   */
  applyTo(current_speed, dt) {
    current_speed.x += this.jump_direction.x * this.jump_speed.x;
    current_speed.y += this.jump_direction.y * this.jump_speed.y;
  }

  onGravityInversion() {
    this.jump_direction.y *= -1;
    this.stop();
  }

  start() {
    this.jump_speed.y = -1000;
    this.state.onJumpStart();
  }

  stop() {
    this.jump_speed.y = 0;
    this.state.onJumpEnd();
  }

  /**
   * @param {number} dt
   */
  update(dt) {
    var keyboard = this.keyboard_provider.getKeyboard(this.player_id);

    // Stop jump
    if (!this.state.isOnGround()) {
      this.stop();
    }

    // Start jump
    if (this.state.isOnGround() && keyboard.isJustPressed("JUMP")) {
      this.start();
    }
  }
}
