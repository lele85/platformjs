// @ts-check

/**
 *
 * @param {Vector} worldPosition
 * @param {Vector} vector
 * @returns {Vector}
 */
export function toWorldSpace(worldPosition, vector) {
  return new Vector(vector.x + worldPosition.x, vector.y + worldPosition.y);
}

/**
 *
 * @param {Vector} vector
 * @returns
 */
export function toTileSpace(vector) {
  const TILE_DIMENSION = 32;
  return new Vector(
    Math.floor(vector.x / TILE_DIMENSION),
    Math.floor(vector.y / TILE_DIMENSION)
  );
}

/**
 *
 * @param {Vector} worldPosition
 * @param {Vector} vector
 * @returns
 */
export function toScreenSpace(worldPosition, vector) {
  return new Vector(vector.x - worldPosition.x, vector.y - worldPosition.y);
}

export class Vector {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
