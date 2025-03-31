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
    this.gravity_versor = new Vector(1, -1);
  }

  /**
   *
   * @param {Vector} collisionResponse
   * @param {boolean} onLeftWall
   * @param {boolean} onRightWall
   */
  update(collisionResponse, onLeftWall, onRightWall) {
    this._updateCheckOnGround(collisionResponse);
    this._updateCheckOnWalls(onLeftWall, onRightWall);
  }

  isOnGround() {
    return this.on_ground;
  }

  isOnLeftWall() {
    return this.on_left_wall;
  }

  isOnRightWall() {
    return this.on_right_wall;
  }

  onGravityInversion() {
    this.gravity_versor.y *= -1;
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
      this.on_ground = true;
    } else {
      this.on_ground = false;
    }
  }

  /**
   *
   * @param {boolean} onLeftWall
   * @param {boolean} onRightWall
   */
  _updateCheckOnWalls(onLeftWall, onRightWall) {
    if (this.on_ground) {
      this.on_left_wall = false;
      this.on_right_wall = false;
      this.on_left_wall = false;
      this.on_right_wall = false;
      return;
    }
    this.on_left_wall = onLeftWall;
    this.on_right_wall = onRightWall;
  }
}
