var game = game || {};
game.PlayerInput = game.PlayerInput|| {};

(function(PlayerInput){
    /*
    Options:
      - keyboard
    */
    PlayerInput.create = function(params){
        var keyboard = params.keyboard;
        var MAX_HORIZONTAL_SPEED = 250;
        var HORIZONTAL_DECELERATION = 1600;
        var HORIZONTAL_ACCELERATION = 2000;
        var TIME = 1/60;

        var applyTo = function(speed){
            if (keyboard.isHeld("RIGHT")){
                var x_speed_increment = 0;
                if (speed.x < MAX_HORIZONTAL_SPEED)
                {
                    x_speed_increment = HORIZONTAL_ACCELERATION*TIME;
                };
                speed.x += x_speed_increment;
            };

            if (keyboard.isHeld("LEFT")){
                var x_speed_increment = 0;
                if (speed.x > -MAX_HORIZONTAL_SPEED)
                {
                    x_speed_increment = HORIZONTAL_ACCELERATION*TIME;
                };
                speed.x -= x_speed_increment;
            };

            if (!keyboard.isHeld("RIGHT") && !keyboard.isHeld("LEFT")){
                if (speed.x > 0) {
                    speed.x -= HORIZONTAL_DECELERATION*TIME;
                    if (speed.x < 0) speed.x = 0;
                } else if (speed.x < 0){
                    speed.x += HORIZONTAL_DECELERATION*TIME;
                    if (speed.x > 0) speed.x = 0;
                } 
            };
        }

        return {
            applyTo: applyTo
        }
    }
}(game.PlayerInput));