// @ts-check
import { Vector } from "../math/Vector.js";

export class Collider {
  /**
   *
   * @param {{ x: number, y: number, w: number, h: number, debug: boolean }} options
   */
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.debug = options.debug;
  }

  /**
   *
   * @param {Collider} collider
   * @returns {Vector}
   */
  collides(collider) {
    const top = this.y;
    const otherTop = collider.y;
    const left = this.x;
    const otherLeft = collider.x;
    const right = this.x + this.w;
    const otherRight = collider.x + collider.w;
    const bottom = this.y + this.h;
    const otherBottom = collider.y + collider.h;
    const centerX = this.x + this.w / 2;
    const centerY = this.y + this.h / 2;
    const otherCenterX = collider.x + collider.w / 2;
    const otherCenterY = collider.y + collider.h / 2;
    const response = new Vector(0, 0);

    if (bottom <= otherTop) return response;
    if (top >= otherBottom) return response;

    if (right <= otherLeft) return response;
    if (left >= otherRight) return response;

    let responseX =
      this.w / 2 + collider.w / 2 - Math.abs(otherCenterX - centerX);
    let responseY =
      this.h / 2 + collider.h / 2 - Math.abs(otherCenterY - centerY);

    if (centerX < otherCenterX) {
      responseX *= -1;
    }
    if (centerY < otherCenterY) {
      responseY *= -1;
    }

    response.x = responseX;
    response.y = responseY;
    return response;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Vector} worldOffset
   */
  draw(context, worldOffset) {
    if (this.debug !== false) {
      if (this.y > worldOffset.y + 480 + 32 || this.y < worldOffset.y - 32) {
        return;
      }
      context.strokeStyle = "rgb(0,0,0);";
      context.lineWidth = 2;
      context.strokeRect(this.x, this.y, this.w, this.h);
      context.fillStyle = "#DDD6FF";
      context.fillRect(this.x, this.y, this.w, this.h);
    }
  }
}
