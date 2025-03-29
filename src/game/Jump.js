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
    this.player_state = player_state;

    this.jump_started = false;
    this.max_jump_time = 5;
    this.current_jump_time = 0;
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
  }

  start() {
    this.jump_started = true;
  }

  stop() {
    if (this.jump_started == true) {
      this.jump_started = false;
      this.current_jump_time = 0;
      this.jump_speed.x = 0;
      this.jump_speed.y = 0;
    }
  }

  /**
   * @param {number} dt
   */
  update(dt) {
    var keyboard = this.keyboard_provider.getKeyboard(this.player_id);
    if (this.jump_started) {
      this.jump_speed.y =
        -220 / (1 + this.current_jump_time * this.current_jump_time * 1500);
      this.current_jump_time += dt;
      if (this.current_jump_time > this.max_jump_time) {
        this.stop();
      }
    }
    if (this.player_state.on_ground && keyboard.isJustPressed("JUMP")) {
      this.start();
      this.player_state.update_after_jump();
    }
    if (this.player_state.on_ground && keyboard.isJustReleased("JUMP")) {
      this.stop();
      this.player_state.update_after_jump();
    }
  }
}
