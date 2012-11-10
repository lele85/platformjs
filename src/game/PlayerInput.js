var game = game || {};
game.PlayerInput = game.PlayerInput|| {};

(function(PlayerInput){
    PlayerInput.create = function(params){
        var player_id = params.player_id;
        var keyboard_provider = params.keyboard_provider;
        var MAX_HORIZONTAL_SPEED = 250;
        var HORIZONTAL_DECELERATION = 1600;
        var HORIZONTAL_ACCELERATION = 2000;
        var TIME = 1/60;

        //Todo: Refactoring updatable non deve andare sull'apply to
        var applyTo = function(speed){
            var keyboard = keyboard_provider.getKeyboard(player_id);
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

        var update = function(){

        };

        return {
            applyTo: applyTo,
            update : update
        }
    }
}(game.PlayerInput));