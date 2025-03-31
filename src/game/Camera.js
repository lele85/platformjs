import { Vector } from "../math/Vector";
import { Collider } from "./Collider";

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
   * @type {Collider[]}
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
   *  targets: Collider[],
   *  getBounds: () => Bounds
   * }} options
   */
  constructor({ context, worldOffset, targets, getBounds }) {
    this.context = context;
    this.worldOffset = worldOffset;
    this.targets = targets;
    this.getBounds = getBounds;
    this.active = 0;

    this.CAMERA_SPEED = 8;
    this.camera_w = 640;
    this.semi_camera_w = this.camera_w / 2;
    this.camera_h = 480;
    this.semi_camera_h = this.camera_h / 2;
    this.current_target = this.targets[0];
    this.moveCameraTo(this.current_target.x, this.current_target.y);
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    // Calculate the vertical limits of the camera
    var targetCameraY = this.current_target.y;
    var targetCameraYBottomLimit = this.getBounds().h - this.semi_camera_h;
    var targetCameraYTopLimit = this.semi_camera_h;

    // Apply vertical limits
    if (targetCameraY > targetCameraYBottomLimit) {
      targetCameraY = targetCameraYBottomLimit;
    }
    if (targetCameraY < targetCameraYTopLimit) {
      targetCameraY = targetCameraYTopLimit;
    }

    // Calculate the vertical distance between the target and the camera
    var targetToCameraDistanceY =
      targetCameraY - this.semi_camera_h - this.worldOffset.y;

    // Calculate the vertical movement based on time
    var dy = targetToCameraDistanceY * this.CAMERA_SPEED * dt;

    // Calculate the horizontal limits of the camera
    var targetCameraX = this.current_target.x;
    var targetCameraXLeftLimit = this.semi_camera_w;

    // Apply horizontal limits
    if (targetCameraX < targetCameraXLeftLimit) {
      targetCameraX = targetCameraXLeftLimit;
    }

    // Calculate the horizontal distance between the target and the camera
    var targetToCameraDistanceX =
      targetCameraX - this.semi_camera_w - this.worldOffset.x;

    // Calculate the horizontal movement based on time
    var dx = targetToCameraDistanceX * this.CAMERA_SPEED * dt;

    // Translat the context and update the world offset
    this.context.translate(-dx, -dy);
    this.worldOffset.x += dx;
    this.worldOffset.y += dy;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  moveCameraTo(x, y) {
    this.worldOffset.x = Math.max(0, x - this.semi_camera_w);
    this.worldOffset.y = Math.min(this.getBounds().h - this.camera_h, y);
    this.context.translate(-this.worldOffset.x, -this.worldOffset.y);
  }

  nextTarget() {
    this.active = (this.active + 1) % this.targets.length;
    this.current_target = this.targets[this.active];
  }
}
