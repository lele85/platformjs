import { Vector } from "../math/Vector.js";

export const PlayerState = {
  create: (params) => {
    var that = {};
    that.player_id = params.player_id;
    that.on_ground = true;
    that.on_left_wall = false;
    that.on_right_wall = false;
    that.left_wall_jump_possible = true;
    that.right_wall_jump_possible = true;
    that.gravity_versor = new Vector(1, -1);

    that.setOnGroundState = function () {
      that.on_ground = true;
      that.on_left_wall = false;
      that.on_right_wall = false;
      that.left_wall_jump_possible = true;
      that.right_wall_jump_possible = true;
    };

    that.setCollisionWithMovingPlatformState = function () {
      that.on_ground = true;
      that.on_left_wall = false;
      that.on_right_wall = false;
      that.left_wall_jump_possible = false;
      that.right_wall_jump_possible = false;
    };

    that.update = function (collisionResponse) {
      that.update_check_on_ground(collisionResponse);
      that.update_check_on_walls(collisionResponse);
    };

    that.update_check_on_ground = function (collisionResponse) {
      if (
        (that.gravity_versor.y == -1 && collisionResponse.y < 0) || // Normal Gravity
        (that.gravity_versor.y == 1 && collisionResponse.y > 0)
      ) {
        // Inverse gravity
        that.setOnGroundState();
      }
    };

    that.update_check_on_walls = function (collisionResponse) {
      if (collisionResponse.x > 0) {
        that.on_left_wall = true;
        that.on_right_wall = false;
      }
      if (collisionResponse.x < 0) {
        that.on_left_wall = false;
        that.on_right_wall = true;
      }
      if (collisionResponse.x == 0) {
        that.on_right_wall = false;
        that.on_left_wall = false;
      }
    };

    that.update_after_jump = function () {
      that.on_ground = false;
    };

    that.update_after_left_wall_jump = function () {
      that.on_left_wall = false;
      that.left_wall_jump_possible = false;
      that.right_wall_jump_possible = true;
    };

    that.update_after_right_wall_jump = function () {
      that.on_right_wall = false;
      that.left_wall_jump_possible = true;
      that.right_wall_jump_possible = false;
    };

    that.on_gravity_inversion = function () {
      that.gravity_versor.y *= -1;
    };

    that.get_state = function () {
      var state = [];
      if (that.on_ground) {
        state.push("on_ground");
      }
      if (that.on_left_wall) {
        state.push("on_left_wall");
      }
      if (that.on_right_wall) {
        state.push("on_right_wall");
      }
      return state;
    };

    return that;
  },
};
