// @ts-check
import { Vector } from "../math/Vector.js";

export class PlayerState {
  /**
   *
   * @param {{player_id: string}} options
   */
  constructor({ player_id }) {
    this.player_id = player_id;
    this.on_ground = true;
    this.on_left_wall = false;
    this.on_right_wall = false;
    this.left_wall_jump_possible = true;
    this.right_wall_jump_possible = true;
    this.gravity_versor = new Vector(1, -1);
  }

  setOnGroundState() {
    this.on_ground = true;
    this.on_left_wall = false;
    this.on_right_wall = false;
    this.left_wall_jump_possible = true;
    this.right_wall_jump_possible = true;
  }

  setCollisionWithMovingPlatformState() {
    this.on_ground = true;
    this.on_left_wall = false;
    this.on_right_wall = false;
    this.left_wall_jump_possible = false;
    this.right_wall_jump_possible = false;
  }

  /**
   *
   * @param {Vector} collisionResponse
   */
  update(collisionResponse) {
    this.update_check_on_ground(collisionResponse);
    this.update_check_on_walls(collisionResponse);
  }

  /**
   *
   * @param {Vector} collisionResponse
   */
  update_check_on_ground(collisionResponse) {
    if (
      (this.gravity_versor.y == -1 && collisionResponse.y < 0) || // Normal Gravity
      (this.gravity_versor.y == 1 && collisionResponse.y > 0)
    ) {
      // Inverse gravity
      this.setOnGroundState();
    }
  }

  /**
   *
   * @param {Vector} collisionResponse
   */
  update_check_on_walls(collisionResponse) {
    if (collisionResponse.x > 0) {
      this.on_left_wall = true;
      this.on_right_wall = false;
    }
    if (collisionResponse.x < 0) {
      this.on_left_wall = false;
      this.on_right_wall = true;
    }
    if (collisionResponse.x == 0) {
      this.on_right_wall = false;
      this.on_left_wall = false;
    }
  }

  update_after_jump() {
    this.on_ground = false;
  }

  update_after_left_wall_jump() {
    this.on_left_wall = false;
    this.left_wall_jump_possible = false;
    this.right_wall_jump_possible = true;
  }

  update_after_right_wall_jump() {
    this.on_right_wall = false;
    this.left_wall_jump_possible = true;
    this.right_wall_jump_possible = false;
  }

  onGravityInversion() {
    this.gravity_versor.y *= -1;
  }

  get_state() {
    var state = [];
    if (this.on_ground) {
      state.push("on_ground");
    }
    if (this.on_left_wall) {
      state.push("on_left_wall");
    }
    if (this.on_right_wall) {
      state.push("on_right_wall");
    }
    return state;
  }
}
