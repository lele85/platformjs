import { Vector } from "../math/Vector.js";

export const Player = {
  create: (params) => {
    var that = {};
    var movingPlatform = params.platform;
    var state = params.player_state;
    var speed_influencers = params.speed_influencers;
    var collider = params.collider;
    var level_limits = params.level_limits;

    that.speed = new Vector(0, 0);

    that.movingPlatform = movingPlatform;
    that.state = state;

    that.update = function (dt) {
      var oldY = collider.y;
      var oldX = collider.x;

      //Apply speed influencers
      for (let i = speed_influencers.length - 1; i >= 0; i--) {
        speed_influencers[i].applyTo(that.speed);
      }

      collider.y = oldY + that.speed.y * dt;
      collider.x = oldX + that.speed.x * dt;

      var totalResponse = level_limits.applyTo(collider);

      //   TODO: Collision with moving platform

      //   var response = that.movingPlatform.collides(collider);
      //   if (response.y != 0) {
      //     collider.x += that.movingPlatform.SPEED;
      //     collider.y -= response.y;
      //     totalYResponse -= response.y;
      //     collisionWithMovingPlatform = true;
      //   }

      that.speed.y = (collider.y - oldY) / dt;
      that.state.update(totalResponse);
    };

    that.collides = function (otherCollider) {
      return collider.collides(otherCollider);
    };

    that.draw = function (context, worldOffset) {
      collider.draw(context, worldOffset);
    };

    return that;
  },
};
