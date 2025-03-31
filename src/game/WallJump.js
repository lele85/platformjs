import { Vector } from "../math/Vector.js";
import { PlayerKeyboardProvider } from "./PlayerKeyboardProvider.js";
import { PlayerState } from "./PlayerState.js";

export class WallJump {
  /**
   *
   * @param {{player_state: PlayerState, keyboard_provider: PlayerKeyboardProvider, player_id: string}} params
   */
  constructor({ player_state, keyboard_provider, player_id }) {
    this.state = player_state;
    this.keyboard_provider = keyboard_provider;
    this.player_id = player_id;
    this.wall_jump_speed = new Vector(0, 0);
    this.wall_jump_direction = new Vector(1, 1);
    this.can_wall_jump_left = true;
    this.can_wall_jump_right = true;
  }

  /**
   *
   * @param {Vector} current_speed
   */
  applyTo(current_speed) {
    current_speed.x += this.wall_jump_direction.x * this.wall_jump_speed.x;
    current_speed.y += this.wall_jump_direction.y * this.wall_jump_speed.y;
  }

  onGravityInversion() {
    this.wall_jump_direction.y *= -1;
  }

  update() {
    var keyboard = this.keyboard_provider.getKeyboard(this.player_id);
    if (
      this.can_wall_jump_right &&
      keyboard.isJustPressed("JUMP") &&
      this.state.isOnRightWall()
    ) {
      this.can_wall_jump_left = true;
      this.can_wall_jump_right = false;
      this.wall_jump_speed.y = -1100;
      this.wall_jump_speed.x = -350;
      return;
    }
    if (
      this.can_wall_jump_left &&
      keyboard.isJustPressed("JUMP") &&
      this.state.isOnLeftWall()
    ) {
      this.can_wall_jump_left = false;
      this.can_wall_jump_right = true;
      this.wall_jump_speed.y = -1100;
      this.wall_jump_speed.x = 350;
      return;
    }
    if (this.state.isOnGround()) {
      this.can_wall_jump_left = true;
      this.can_wall_jump_right = true;
    }
    this.wall_jump_speed.y = 0;
    this.wall_jump_speed.x = 0;
  }
}
