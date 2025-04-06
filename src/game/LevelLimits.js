import { Vector } from "../math/Vector.js";
import { Collider } from "./Collider.js";
import { Level } from "./Level.js";
import { MovingPlatform } from "./MovingPlatform.js";

export class LevelLimits {
  /**
   * @type {Level}
   */
  level;

  /**
   * @type {MovingPlatform[]}
   */
  movingPlatforms;

  /**
   *
   * @param {{level:Level, movingPlatforms: MovingPlatform[]}} options
   */
  constructor({ level, movingPlatforms }) {
    this.level = level;
    this.movingPlatforms = movingPlatforms;
  }

  /**
   *
   * @param {Collider} collider
   * @returns
   */
  collides(collider) {
    let totalXResponse = 0;
    let totalYResponse = 0;

    const verticalColliders = this.level.getVerticalCollidersAt(
      collider.x + collider.w / 2,
      collider.y + collider.h / 2
    );

    const horizontalColliders = this.level.getHorizontalCollidersAt(
      collider.x + collider.w / 2,
      collider.y + collider.h / 2
    );
    for (let index in verticalColliders) {
      let otherCollider = verticalColliders[index];
      let response = collider.collides(otherCollider);
      totalYResponse += response.y;
    }
    for (let index in horizontalColliders) {
      let otherCollider = horizontalColliders[index];
      let response = collider.collides(otherCollider);
      totalXResponse += response.x;
    }

    return new Vector(totalXResponse, totalYResponse);
  }

  /**
   *
   * @param {Collider} collider
   * @returns
   */
  collidesLeft(collider) {
    const horizontalColliders = this.level.getHorizontalCollidersAt(
      collider.x + collider.w / 2,
      collider.y + collider.h / 2
    );
    for (let index in horizontalColliders) {
      let otherCollider = horizontalColliders[index];
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
    const horizontalColliders = this.level.getHorizontalCollidersAt(
      collider.x + collider.w / 2,
      collider.y + collider.h / 2
    );
    for (let index in horizontalColliders) {
      let otherCollider = horizontalColliders[index];
      if (collider.collides(otherCollider).x < 0) {
        return true;
      }
    }
    return false;
  }
}
