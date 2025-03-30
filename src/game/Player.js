import { Vector } from "../math/Vector.js";
import { Collider } from "./Collider.js";
import { LevelLimits } from "./LevelLimits.js";
import { MovingPlatform } from "./MovingPlatform.js";
import { PlayerState } from "./PlayerState.js";

export class Player {
  /**
   *
   * @param {{
   *  platform: MovingPlatform,
   *  player_state: PlayerState,
   *  speed_influencers: SpeedInfluencer[],
   *  collider: Collider,
   *  level_limits: LevelLimits
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
      this.speed_influencers[i].applyTo(this.speed, dt);
    }

    this.collider.y += this.speed.y * dt;
    this.collider.x += this.speed.x * dt;

    this.speed.y = (this.collider.y - oldY) / dt;
    this.speed.x = (this.collider.x - oldX) / dt;

    const totalResponse = this.level_limits.applyTo(this.collider, dt);

    // If we are colliding with the ground, stop the vertical speed
    // This is a hack to avoid the player during a jump to keep accelerating
    if (totalResponse.y !== 0) {
      this.speed.y = 0;
    }

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
    // Draw a debug representation of the player_state
    const x = this.collider.x;
    const y = this.collider.y;

    context.fillStyle = "black";
    context.font = "8px Monospace";
    context.fillText(this.state.debugState().toString(), x, y);

    this.collider.draw(context, worldOffset);
  }
}
