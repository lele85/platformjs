var game = game || {};
game.MovingPlatform = game.MovingPlatform || {};

(function (MovingPlatform, Collider) {
  MovingPlatform.create = function () {
    var that = {};

    that.collider = Collider.create({
      x: 300,
      y: 2480,
      w: 32,
      h: 32,
    });
    that.START_X = 300;
    that.END_X = 500;
    that.PIXEL_PER_FRAME = 1;
    that.SPEED = 1;

    that.update = function (dt) {
      that.collider.x += that.PIXEL_PER_FRAME;
      if (that.collider.x > that.END_X) {
        that.collider.x = that.END_X;
        that.PIXEL_PER_FRAME *= -1;
        that.SPEED *= -1;
      }
      if (that.collider.x < that.START_X) {
        that.collider.x = that.START_X;
        that.PIXEL_PER_FRAME *= -1;
        that.SPEED *= -1;
      }
    };

    that.draw = function (context) {
      that.collider.draw(context);
    };

    that.collides = function (otherCollider) {
      return that.collider.collides(otherCollider);
    };

    return that;
  };
})(game.MovingPlatform, game.Collider);
