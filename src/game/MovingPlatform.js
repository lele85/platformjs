import { Vector } from "../math/Vector";
import { Collider } from "./Collider";
import { TILE_DIMENSION } from "./Level";

export class MovingPlatform {
  /**
   * @type {Collider}
   */
  collider;
  /**
   * @type {number}
   */
  START_X;
  /**
   * @type {number}
   */
  END_X;
  /**
   * @type {number}
   */
  SPEED;

  /**
   * @param {{x:number, y:number, w:number, h:number, speed:number, direction: 'LEFT' | 'RIGHT'}} options
   */
  constructor({ x, y, w, h, speed, direction }) {
    this.collider = new Collider({
      x: x,
      y: y,
      w: w,
      h: h,
      debug: true,
    });
    this.START_X =
      direction === "LEFT"
        ? this.collider.x
        : this.collider.x - TILE_DIMENSION * 3;
    this.END_X =
      direction === "LEFT"
        ? this.collider.x + TILE_DIMENSION * 3
        : this.collider.x;
    this.SPEED = speed;
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    this.collider.x += this.SPEED * dt;
    if (this.collider.x > this.END_X) {
      this.collider.x = this.END_X;
      this.SPEED *= -1;
    }
    if (this.collider.x < this.START_X) {
      this.collider.x = this.START_X;
      this.SPEED *= -1;
    }
  }
  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Vector} worldOffset
   */
  draw(context, worldOffset) {
    this.collider.draw(context, worldOffset);
  }

  /**
   *
   * @param {Collider} otherCollider
   * @returns
   */
  collides(otherCollider) {
    return this.collider.collides(otherCollider);
  }
}
