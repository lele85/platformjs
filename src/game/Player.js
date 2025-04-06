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
  constructor({ player_state, speed_influencers, collider, level_limits }) {
    this.state = player_state;
    this.speed_influencers = speed_influencers;
    this.collider = collider;
    this.level_limits = level_limits;
    this.speed = new Vector(0, 0);

    this.rightWallProbe = new Collider({
      x: this.collider.x,
      y: this.collider.y,
      w: 5,
      h: this.collider.h,
      debug: true,
      color: "black",
    });

    this.leftWallProbe = new Collider({
      x: this.collider.x - 10,
      y: this.collider.y,
      w: 5,
      h: this.collider.h,
      debug: true,
      color: "black",
    });

    this.groundProbe = new Collider({
      x: this.collider.x,
      y: this.collider.y + this.collider.h,
      w: this.collider.w,
      h: 5,
      debug: true,
      color: "black",
    });
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    //Apply speed influencers
    for (let i = this.speed_influencers.length - 1; i >= 0; i--) {
      this.speed_influencers[i].applyTo(this.speed, dt);
    }

    // Update the collider position
    this.collider.y += this.speed.y * dt;
    this.collider.x += this.speed.x * dt;

    const movingPlatformResponse = new Vector(0, 0);

    // Get moving platforms
    const movingPlatforms = this.level_limits.getMovingPlatforms(this.collider);
    for (let i = 0; i < movingPlatforms.length; i++) {
      const platform = movingPlatforms[i];
      const response = this.collider.collides(platform.collider);
      if (response.y < 0) {
        this.collider.y += response.y;
        this.speed.y = 0;
        this.collider.x += platform.SPEED * dt;
        movingPlatformResponse.y += response.y;
      }
      if (response.y > 0) {
        this.collider.y += response.y;
        this.speed.y = 0;
        movingPlatformResponse.y += response.y;
      }
    }

    const levelCollisionResponse = this.level_limits.collides(this.collider);

    // If we are colliding with the ground, stop the vertical speed
    if (
      (levelCollisionResponse.y > 0 && this.speed.y < 0) ||
      (levelCollisionResponse.y < 0 && this.speed.y > 0)
    ) {
      this.speed.y = 0;
      this.collider.y += levelCollisionResponse.y;
    }

    // If we are colliding with a wall, stop the horizontal speed
    if (
      (levelCollisionResponse.x > 0 && this.speed.x < 0) ||
      (levelCollisionResponse.x < 0 && this.speed.x > 0)
    ) {
      this.speed.x = 0;
      this.collider.x += levelCollisionResponse.x;
    }

    this.rightWallProbe.x = this.collider.x + this.collider.w;
    this.rightWallProbe.y = this.collider.y;
    this.leftWallProbe.x = this.collider.x - this.leftWallProbe.w;
    this.leftWallProbe.y = this.collider.y;

    this.state.gravity_versor.y === -1
      ? (this.groundProbe.y = this.collider.y + this.collider.h)
      : (this.groundProbe.y = this.collider.y - this.groundProbe.h);
    this.groundProbe.x = this.collider.x;

    const collidesLeft = this.level_limits.collidesLeft(this.leftWallProbe);
    const collidesRight = this.level_limits.collidesRight(this.rightWallProbe);

    this.state.update(
      {
        x: levelCollisionResponse.x + movingPlatformResponse.x,
        y: levelCollisionResponse.y + movingPlatformResponse.y,
      },
      collidesLeft,
      collidesRight
    );
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

    // Debug player state
    if (this.state.isOnGround()) {
      this.groundProbe.draw(context, worldOffset);
    }
    if (this.state.isOnLeftWall()) {
      this.leftWallProbe.draw(context, worldOffset);
    }
    if (this.state.isOnRightWall()) {
      this.rightWallProbe.draw(context, worldOffset);
    }
  }
}
