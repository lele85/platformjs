export class Vector {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Vector}
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   *
   * @param {Vector} worldPosition
   * @returns {Vector}
   */
  toWorldSpace(worldPosition) {
    return new Vector(this.x + worldPosition.x, this.y + worldPosition.y);
  }

  /**
   *
   * @param {Vector} worldPosition
   * @returns {Vector}
   */
  toScreenSpace(worldPosition) {
    return new Vector(this.x - worldPosition.x, this.y - worldPosition.y);
  }

  /**
   *
   * @returns {Vector}
   */
  toTileSpace() {
    const TILE_DIMENSION = 32;
    return new Vector(
      Math.floor(this.x / TILE_DIMENSION),
      Math.floor(this.y / TILE_DIMENSION)
    );
  }
}
