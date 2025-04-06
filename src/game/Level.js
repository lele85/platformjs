import { Vector } from "../math/Vector";
import { Collider } from "./Collider";

export const TILE_DIMENSION = 32;

export class Level {
  /**
   *
   * @param {{ definition: number[][] }} options
   */
  constructor(options) {
    this.definition = options.definition || [];
    /**
     * @type {Collider[][]}
     */
    this.collidersMatrix = [];
  }

  build() {
    for (let i = 0; i < this.definition.length; i++) {
      var row = [];
      for (let j = 0; j < this.definition[i].length; j++) {
        if (this.definition[i][j] === 1) {
          var coll = new Collider({
            x: j * TILE_DIMENSION,
            y: i * TILE_DIMENSION,
            w: TILE_DIMENSION,
            h: TILE_DIMENSION,
            debug: true,
          });
          row[j] = coll;
        }
        this.collidersMatrix[i] = row;
      }
    }
  }
  /**
   *
   * @param {number} i
   * @param {number} j
   */
  addCollider(i, j) {
    if (this.collidersMatrix[j] === undefined) {
      this.collidersMatrix[j] = [];
      this.definition[j] = [];
    }
    this.collidersMatrix[j][i] = new Collider({
      x: i * TILE_DIMENSION,
      y: j * TILE_DIMENSION,
      w: TILE_DIMENSION,
      h: TILE_DIMENSION,
      debug: true,
    });
    this.definition[j][i] = 1;
  }

  /**
   *
   * @param {number} i
   * @param {number} j
   */
  removeCollider(i, j) {
    if (this.collidersMatrix[j] === undefined) {
      this.collidersMatrix[j] = [];
      this.definition[j] = [];
    }
    delete this.collidersMatrix[j][i];
    this.definition[j][i] = 0;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Vector} worldOffset
   */
  draw(context, worldOffset) {
    for (let rowIndex in this.collidersMatrix) {
      for (let columnIndex in this.collidersMatrix[rowIndex])
        this.collidersMatrix[rowIndex][columnIndex].draw(context, worldOffset);
    }
  }

  /**
   *
   * @param {Collider|undefined} element
   * @param {Collider[]} array
   */
  addIfNotUndefined(element, array) {
    if (element !== undefined) {
      array.push(element);
    }
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} xOffset
   * @param {number} yOffset
   * @returns {Collider|undefined}
   */
  getCollider(x, y, xOffset, yOffset) {
    var coll;
    if (
      this.collidersMatrix[Math.floor(y / TILE_DIMENSION) + yOffset] !=
      undefined
    ) {
      coll =
        this.collidersMatrix[Math.floor(y / TILE_DIMENSION) + yOffset][
          Math.floor(x / TILE_DIMENSION) + xOffset
        ];
    }
    return coll;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Collider[]}
   */
  getVerticalCollidersAt(x, y) {
    /**
     * @type {Collider[]}
     */
    var potentialColliders = [];

    this.addIfNotUndefined(this.getCollider(x, y, 0, -1), potentialColliders);
    this.addIfNotUndefined(this.getCollider(x, y, 0, 0), potentialColliders);
    this.addIfNotUndefined(this.getCollider(x, y, 0, 1), potentialColliders);

    return potentialColliders;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns
   */
  getHorizontalCollidersAt(x, y) {
    /**
     * @type {Collider[]}
     */
    var potentialColliders = [];
    this.addIfNotUndefined(this.getCollider(x, y, 1, 0), potentialColliders);
    this.addIfNotUndefined(this.getCollider(x, y, 0, 0), potentialColliders);
    this.addIfNotUndefined(this.getCollider(x, y, -1, 0), potentialColliders);

    return potentialColliders;
  }

  /**
   *
   * @returns {Bounds}
   */
  getBounds() {
    var bounds = {
      h: this.definition.length * TILE_DIMENSION,
      w: this.definition[0].length * TILE_DIMENSION,
    };
    return bounds;
  }
}
