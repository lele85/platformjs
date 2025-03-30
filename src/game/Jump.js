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
    this.started = false;
    this.current_jump_time = 0;
    this.jump_speed = new Vector(0, 0);
    this.jump_direction = new Vector(1, 1);
  }

  /**
   * @param {Vector} current_speed
   * @param {number} dt
   */
  applyTo(current_speed, dt) {
    if (this.started) {
      current_speed.x += this.jump_direction.x * this.jump_speed.x;
      current_speed.y += this.jump_direction.y * this.jump_speed.y;
    }
  }

  onGravityInversion() {
    this.jump_direction.y *= -1;
    this.stop();
  }

  start() {
    this.started = true;
    this.current_jump_time = 0;
    this.jump_speed.y = -100;
    this.state.onJumpStart();
  }

  stop() {
    this.started = false;
    this.current_jump_time = 0;
    this.jump_speed.y = 0;
    this.state.onJumpEnd();
  }

  /**
   * @param {number} dt
   */
  update(dt) {
    var keyboard = this.keyboard_provider.getKeyboard(this.player_id);

    // Manage started jump
    if (this.started) {
      this.current_jump_time += dt;

      // Reduce jump speed over time
      this.jump_speed.y += 80 * this.current_jump_time;
      this.jump_speed.y = Math.min(this.jump_speed.y, 0);
    }

    // Start jump
    if (
      !this.started &&
      this.state.isOnGround() &&
      keyboard.isJustPressed("JUMP")
    ) {
      this.start();
    }

    // Stop jump
    if (this.started && this.state.isOnGround()) {
      this.stop();
    }
  }
}
