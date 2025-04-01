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
  PIXEL_PER_FRAME;
  /**
   * @type {number}
   */
  SPEED;

  constructor() {
    this.collider = new Collider({
      x: 300,
      y: 2480,
      w: TILE_DIMENSION,
      h: TILE_DIMENSION,
      debug: true,
    });
    this.START_X = 300;
    this.END_X = 500;
    this.PIXEL_PER_FRAME = 1;
    this.SPEED = 1;
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    this.collider.x += this.PIXEL_PER_FRAME;
    if (this.collider.x > this.END_X) {
      this.collider.x = this.END_X;
      this.PIXEL_PER_FRAME *= -1;
      this.SPEED *= -1;
    }
    if (this.collider.x < this.START_X) {
      this.collider.x = this.START_X;
      this.PIXEL_PER_FRAME *= -1;
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
