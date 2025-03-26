// @ts-check
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
   * @type {Collider[]}
   */
  potentialColliders;

  /**
   *
   * @param {{level:Level, collider:Collider}} options
   */
  constructor({ level, collider }) {
    this.level = level;
    this.collider = collider;
    this.verticalColliders = [];
    this.horizontalColliders = [];
    this.potentialColliders = [];
  }

  /**
   *
   * @param {Vector} position
   * @returns
   */
  applyTo(position) {
    let totalXResponse = 0;
    let totalYResponse = 0;
    for (let index in this.verticalColliders) {
      let otherCollider = this.verticalColliders[index];
      let response = this.collider.collides(otherCollider);
      totalYResponse += response.y;
      position.y += response.y;
    }
    for (let index in this.potentialColliders) {
      let otherCollider = this.potentialColliders[index];
      let response = this.collider.collides(otherCollider);
      totalXResponse += response.x;
      position.x += response.x;
    }
    return new Vector(totalXResponse, totalYResponse);
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    this.potentialColliders = this.level.getPotentialCollidersAt(
      this.collider.x,
      this.collider.y
    );
    this.verticalColliders = this.level.getVerticalCollidersAt(
      this.collider.x,
      this.collider.y
    );
    this.horizontalColliders = this.level.getHorizontalCollidersAt(
      this.collider.x,
      this.collider.y
    );
  }
}
