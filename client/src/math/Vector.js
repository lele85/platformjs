var math = math || {};
math.Vector = math.Vector || {};

(function (Vector) {
  Vector.create = function (x, y) {
    var TILE_DIMENSION = 32;

    var toWorldSpace = function (worldPosition) {
      return Vector.create(x + worldPosition.x, y + worldPosition.y);
    };

    var toScreenSpace = function (worldPosition) {
      return Vector.create(x - worldPosition.x, y - worldPosition.y);
    };

    var toTileSpace = function () {
      return Vector.create(
        Math.floor(x / TILE_DIMENSION),
        Math.floor(y / TILE_DIMENSION)
      );
    };

    return {
      toWorldSpace: toWorldSpace,
      toScreenSpace: toScreenSpace,
      toTileSpace: toTileSpace,
      x: x,
      y: y,
    };
  };
})(math.Vector);
