import { Vector } from "../math/Vector.js";
import { Collider } from "./Collider.js";
import { Level } from "./Level.js";

export class LevelLimits {
  /**
   * @type {Level}
   */
  level;
  /**
   * @type {Collider}
   */
  collider;
  /**
   * @type {Collider[]}
   */
  verticalColliders;
  /**
   * @type {Collider[]}
   */
  horizontalColliders;

  /**
   *
   * @param {{level:Level, collider:Collider}} options
   */
  constructor({ level, collider }) {
    this.level = level;
    this.collider = collider;
    this.verticalColliders = [];
    this.horizontalColliders = [];
  }

  /**
   *
   * @param {Vector} position
   * @param {number} dt
   * @returns
   */
  applyTo(position, dt) {
    let totalXResponse = 0;
    let totalYResponse = 0;
    for (let index in this.verticalColliders) {
      let otherCollider = this.verticalColliders[index];
      let response = this.collider.collides(otherCollider);
      totalYResponse += response.y;
      position.y += response.y;
    }
    for (let index in this.horizontalColliders) {
      let otherCollider = this.horizontalColliders[index];
      let response = this.collider.collides(otherCollider);
      totalXResponse += response.x;
      position.x += response.x;
    }
    return new Vector(totalXResponse, totalYResponse);
  }

  /**
   *
   * @param {Collider} collider
   * @returns
   */
  collidesLeft(collider) {
    for (let index in this.horizontalColliders) {
      let otherCollider = this.horizontalColliders[index];
      if (collider.collides(otherCollider).x > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {Collider} collider
   */
  collidesRight(collider) {
    for (let index in this.horizontalColliders) {
      let otherCollider = this.horizontalColliders[index];
      if (collider.collides(otherCollider).x < 0) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    this.verticalColliders = this.level.getVerticalCollidersAt(
      this.collider.x + this.collider.w / 2,
      this.collider.y + this.collider.h / 2
    );
    this.horizontalColliders = this.level.getHorizontalCollidersAt(
      this.collider.x + this.collider.w / 2,
      this.collider.y + this.collider.h / 2
    );
  }
}
