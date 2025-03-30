import { Vector } from "../math/Vector.js";

export class PlayerState {
  /**
   *
   * @param {{player_id: string}} options
   */
  constructor({ player_id }) {
    this.player_id = player_id;
    this.on_ground = false;
    this.on_left_wall = false;
    this.on_right_wall = false;
    this.left_wall_jump_possible = true;
    this.right_wall_jump_possible = true;
    this.gravity_versor = new Vector(1, -1);
  }

  /**
   *
   * @param {Vector} collisionResponse
   */
  update(collisionResponse) {
    this._updateCheckOnGround(collisionResponse);
    this._updateCheckOnWalls(collisionResponse);
  }

  isOnGround() {
    return this.on_ground;
  }

  onJumpStart() {
    this.on_ground = false;
  }

  onJumpEnd() {
    this.on_ground = false;
  }

  updateAfterLeftWallJump() {
    this.on_left_wall = false;
    this.left_wall_jump_possible = false;
    this.right_wall_jump_possible = true;
  }

  updateAfterRightWallJump() {
    this.on_right_wall = false;
    this.left_wall_jump_possible = true;
    this.right_wall_jump_possible = false;
  }

  onGravityInversion() {
    this.gravity_versor.y *= -1;
  }

  debugState() {
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

  _setOnGroundState() {
    this.on_ground = true;
    this.on_left_wall = false;
    this.on_right_wall = false;
    this.left_wall_jump_possible = true;
    this.right_wall_jump_possible = true;
  }

  /**
   *
   * @param {Vector} collisionResponse
   */
  _updateCheckOnGround(collisionResponse) {
    if (
      (this.gravity_versor.y == -1 && collisionResponse.y < 0) || // Normal Gravity
      (this.gravity_versor.y == 1 && collisionResponse.y > 0) // Inverse gravity
    ) {
      this._setOnGroundState();
    } else {
      this.on_ground = false;
    }
  }

  /**
   *
   * @param {Vector} collisionResponse
   */
  _updateCheckOnWalls(collisionResponse) {
    if (this.on_ground) {
      this.on_left_wall = false;
      this.on_right_wall = false;
      return;
    }
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
}
