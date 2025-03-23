import { Vector } from "../math/Vector.js";

export const Jump = {
  create: (params) => {
    var player_id = params.player_id;
    var keyboard_provider = params.keyboard_provider;
    var player_state = params.player_state;

    var jump = {};

    var jump_started = false;
    var max_jump_time = 5;
    var current_jump_time = 0;
    var jump_cb = undefined;
    jump.jump_speed = new Vector(0, 0);

    var jump_direction = new Vector(1, 1);

    var applyTo = function (current_speed) {
      current_speed.x += jump_direction.x * jump.jump_speed.x;
      current_speed.y += jump_direction.y * jump.jump_speed.y;
    };

    var on_gravity_inversion = function () {
      jump_direction.y *= -1;
    };

    var start = function () {
      jump_started = true;
    };

    var stop = function () {
      if (jump_started == true) {
        jump_started = false;
        current_jump_time = 0;
        jump.jump_speed.x = 0;
        jump.jump_speed.y = 0;
      }
    };

    var update = function (dt) {
      var keyboard = keyboard_provider.getKeyboard(player_id);
      if (jump_started) {
        jump.jump_speed.y =
          -400 / (1 + current_jump_time * current_jump_time * 1500);
        current_jump_time += dt;
        if (current_jump_time > max_jump_time) {
          stop();
        }
      }
      if (player_state.on_ground && keyboard.isJustPressed("JUMP")) {
        start();
        player_state.update_after_jump();
      }
      if (player_state.on_ground && keyboard.isJustReleased("JUMP")) {
        stop();
        player_state.update_after_jump();
      }
    };

    jump.start = start;
    jump.stop = stop;
    jump.update = update;
    jump.on_gravity_inversion = on_gravity_inversion;
    jump.applyTo = applyTo;

    return jump;
  },
};
