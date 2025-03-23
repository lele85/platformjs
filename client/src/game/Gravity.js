var game = game || {};
game.Gravity = game.Gravity || {};

(function (Gravity, Vector) {
  /*
    params:
      - observers
      - keyboard
    */
  Gravity.create = function (params) {
    var TIME = 1 / 60.0;
    var keyboard = params.keyboard;

    var gravity = {};
    var acceleration = Vector.create(0, 7000);
    var observers = params.observers || [
      {
        on_gravity_inversion: function () {},
      },
    ];

    gravity.notify_gravity_inversion = function () {
      for (index in observers) {
        observers[index].on_gravity_inversion();
      }
    };

    gravity.applyTo = function (speed) {
      speed.x = speed.x + 0.5 * acceleration.x * TIME;
      speed.y = speed.y + 0.5 * acceleration.y * TIME;
    };

    gravity.invert_y = function () {
      acceleration.y *= -1;
      gravity.notify_gravity_inversion();
    };

    gravity.update = function (dt) {
      TIME = dt;
      if (keyboard.isJustPressed("INVERT_GRAVITY")) {
        gravity.invert_y();
      }
    };

    return gravity;
  };
})(game.Gravity, math.Vector);
