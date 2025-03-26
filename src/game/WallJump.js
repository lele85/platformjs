// @ts-check
import { Vector } from "../math/Vector.js";
import { PlayerKeyboardProvider } from "./PlayerKeyboardProvider.js";
import { PlayerState } from "./PlayerState.js";

export class WallJump {
  /**
   *
   * @param {{player_state: PlayerState, keyboard_provider: PlayerKeyboardProvider, player_id: string}} params
   */
  constructor({ player_state, keyboard_provider, player_id }) {
    this.player_state = player_state;
    this.keyboard_provider = keyboard_provider;
    this.player_id = player_id;
    this.should_rightwall_jump = false;
    this.should_left_wall_jump = false;
    this.wall_jump_speed = new Vector(350, 1000);
    this.wall_jump_direction = new Vector(1, 1);
  }

  /**
   *
   * @param {Vector} current_speed
   */
  applyTo(current_speed) {
    this.applyLeftWalljumpTo(current_speed);
    this.applyRightWalljumpTo(current_speed);
  }

  /**
   *
   * @param {Vector} current_speed
   * @returns
   */
  applyLeftWalljumpTo(current_speed) {
    if (!this.should_left_wall_jump) {
      return;
    }
    current_speed.x = this.wall_jump_direction.x * this.wall_jump_speed.x;
    current_speed.y = -this.wall_jump_direction.y * this.wall_jump_speed.y;
    this.should_left_wall_jump = false;
    this.player_state.update_after_left_wall_jump();
  }

  onGravityInversion() {
    this.wall_jump_direction.y *= -1;
  }

  /**
   *
   * @param {Vector} current_speed
   * @returns
   */
  applyRightWalljumpTo(current_speed) {
    if (!this.should_rightwall_jump) {
      return;
    }
    current_speed.x = -this.wall_jump_direction.x * this.wall_jump_speed.x;
    current_speed.y = -this.wall_jump_direction.y * this.wall_jump_speed.y;
    this.should_rightwall_jump = false;
    this.player_state.update_after_right_wall_jump();
  }

  update() {
    var keyboard = this.keyboard_provider.getKeyboard(this.player_id);
    if (
      this.player_state.left_wall_jump_possible &&
      this.player_state.on_left_wall &&
      keyboard.isJustPressed("JUMP")
    ) {
      this.should_left_wall_jump = true;
    }
    if (
      this.player_state.right_wall_jump_possible &&
      this.player_state.on_right_wall &&
      keyboard.isJustPressed("JUMP")
    ) {
      this.should_rightwall_jump = true;
    }
  }
}
