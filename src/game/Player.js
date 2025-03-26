// @ts-check
import { Vector } from "../math/Vector.js";
import { Collider } from "./Collider.js";

export class Player {
  /**
   *
   * @param {{
   *  platform: any,
   *  player_state: any,
   *  speed_influencers: any,
   *  collider: any,
   *  level_limits: any
   * }} params
   */
  constructor({
    platform,
    player_state,
    speed_influencers,
    collider,
    level_limits,
  }) {
    this.movingPlatform = platform;
    this.state = player_state;
    this.speed_influencers = speed_influencers;
    this.collider = collider;
    this.level_limits = level_limits;
    this.speed = new Vector(0, 0);
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    const oldY = this.collider.y;
    const oldX = this.collider.x;

    // Apply speed influencers
    for (let i = this.speed_influencers.length - 1; i >= 0; i--) {
      this.speed_influencers[i].applyTo(this.speed);
    }

    this.collider.y = oldY + this.speed.y * dt;
    this.collider.x = oldX + this.speed.x * dt;

    const totalResponse = this.level_limits.applyTo(this.collider);

    //   TODO: Collision with moving platform

    //   var response = that.movingPlatform.collides(collider);
    //   if (response.y != 0) {
    //     collider.x += that.movingPlatform.SPEED;
    //     collider.y -= response.y;
    //     totalYResponse -= response.y;
    //     collisionWithMovingPlatform = true;
    //   }

    this.speed.y = (this.collider.y - oldY) / dt;
    this.state.update(totalResponse);
  }

  /**
   *
   * @param {Collider} otherCollider
   * @returns
   */
  collides(otherCollider) {
    return this.collider.collides(otherCollider);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Vector} worldOffset
   */
  draw(context, worldOffset) {
    this.collider.draw(context, worldOffset);
  }
}
