// @ts-check
import { Vector } from "../math/Vector";

export class Camera {
  /**
   * @type {CanvasRenderingContext2D}
   */
  context;
  /**
   * @type {Vector}
   */
  worldOffset;
  /**
   * @type {Vector[]}
   */
  targets;
  /**
   * @type {() => Bounds}
   */
  getBounds;

  /**
   *
   * @param {{
   *  context: CanvasRenderingContext2D,
   *  worldOffset: Vector,
   *  targets: Vector[],
   *  getBounds: () => Bounds
   * }} options
   */
  constructor({ context, worldOffset, targets, getBounds }) {
    this.context = context;
    this.worldOffset = worldOffset;
    this.targets = targets;
    this.getBounds = getBounds;
    this.active = 0;

    this.CAMERA_SPEED = 300;
    this.camera_w = 640;
    this.semi_camera_w = this.camera_w / 2;
    this.camera_h = 480;
    this.semi_camera_h = this.camera_h / 2;
    this.current_target = this.targets[0];
  }

  update() {
    var targetCameraY = this.current_target.y;
    var targetCameraYBottomLimit = this.getBounds().h - this.semi_camera_h;
    var targetCameraYTopLimit = this.semi_camera_h;
    if (targetCameraY > targetCameraYBottomLimit) {
      targetCameraY = targetCameraYBottomLimit;
    }
    if (targetCameraY < targetCameraYTopLimit) {
      targetCameraY = targetCameraYTopLimit;
    }
    var targetToCameraDistance =
      targetCameraY - this.semi_camera_h - this.worldOffset.y;
    var dy = (targetToCameraDistance * this.CAMERA_SPEED) / this.getBounds().h;

    var targetCameraX = this.current_target.x;
    var targetCameraXLeftLimit = this.semi_camera_w;
    if (targetCameraX < targetCameraXLeftLimit) {
      targetCameraX = targetCameraXLeftLimit;
    }
    var targetToCameraXDistance =
      targetCameraX - this.semi_camera_w - this.worldOffset.x;
    var dx = (targetToCameraXDistance * this.CAMERA_SPEED) / this.camera_w;
    this.context.translate(-dx, -dy);
    this.worldOffset.x += dx;
    this.worldOffset.y += dy;
  }

  nextTarget() {
    this.active = (this.active + 1) % this.targets.length;
    this.current_target = this.targets[this.active];
  }
}
