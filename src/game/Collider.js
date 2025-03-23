import { Vector } from "../math/Vector.js";

export const Collider = {
  create: function (options) {
    var that = {};
    that.x = options.x;
    that.y = options.y;
    that.w = options.w;
    that.h = options.h;
    that.debug = options.debug;

    var collides = function (collider) {
      var top = that.y;
      var otherTop = collider.y;
      var left = that.x;
      var otherLeft = collider.x;
      var right = that.x + that.w;
      var otherRight = collider.x + collider.w;
      var bottom = that.y + that.h;
      var otherBottom = collider.y + collider.h;
      var centerX = that.x + that.w / 2;
      var centerY = that.y + that.h / 2;
      var otherCenterX = collider.x + collider.w / 2;
      var otherCenterY = collider.y + collider.h / 2;
      var response = new Vector(0, 0);

      if (bottom <= otherTop) return response;
      if (top >= otherBottom) return response;

      if (right <= otherLeft) return response;
      if (left >= otherRight) return response;

      var responseX =
        that.w / 2 + collider.w / 2 - Math.abs(otherCenterX - centerX);
      var responseY =
        that.h / 2 + collider.h / 2 - Math.abs(otherCenterY - centerY);

      if (centerX < otherCenterX) {
        responseX *= -1;
      }
      if (centerY < otherCenterY) {
        responseY *= -1;
      }

      response.x = responseX;
      response.y = responseY;
      return response;
    };

    var draw = function (context) {
      if (that.debug !== false) {
        if (that.y > context.y + 480 + 32 || that.y < context.y - 32) {
          return;
        }
        context.strokeStyle = "rgb(0,0,0);";
        context.strokeRect(that.x, that.y, that.w, that.h);
      }
    };

    that.collides = collides;
    that.draw = draw;
    return that;
  },
};
