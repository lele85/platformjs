import { Vector } from "../math/Vector.js";

export const WallJump = {
  create: (params) => {
    var player_state = params.player_state;
    var keyboard_provider = params.keyboard_provider;
    var player_id = params.player_id;
    var should_rightwall_jump = false;
    var should_left_wall_jump = false;
    var wall_jump_speed = Vector.create(350, 1000);
    var wall_jump_direction = Vector.create(1, 1);

    var applyTo = function (current_speed) {
      applyLeftWalljumpTo(current_speed);
      applyRightWalljumpTo(current_speed);
    };

    var applyLeftWalljumpTo = function (current_speed) {
      if (!should_left_wall_jump) {
        return;
      }
      current_speed.x = wall_jump_direction.x * wall_jump_speed.x;
      current_speed.y = -wall_jump_direction.y * wall_jump_speed.y;
      should_left_wall_jump = false;
      player_state.update_after_left_wall_jump();
    };

    var on_gravity_inversion = function () {
      wall_jump_direction.y *= -1;
    };

    var applyRightWalljumpTo = function (current_speed) {
      if (!should_rightwall_jump) {
        return;
      }
      current_speed.x = -wall_jump_direction.x * wall_jump_speed.x;
      current_speed.y = -wall_jump_direction.y * wall_jump_speed.y;
      should_rightwall_jump = false;
      player_state.update_after_right_wall_jump();
    };

    var update = function () {
      var keyboard = keyboard_provider.getKeyboard(player_id);
      if (
        player_state.left_wall_jump_possible &&
        player_state.on_left_wall &&
        keyboard.isJustPressed("JUMP")
      ) {
        should_left_wall_jump = true;
      }
      if (
        player_state.right_wall_jump_possible &&
        player_state.on_right_wall &&
        keyboard.isJustPressed("JUMP")
      ) {
        should_rightwall_jump = true;
      }
    };

    return {
      on_gravity_inversion: on_gravity_inversion,
      update: update,
      applyTo: applyTo,
    };
  },
};
