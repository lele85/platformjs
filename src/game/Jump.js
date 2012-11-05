var game = game || {};
game.Jump = game.Vector|| {};

(function(Jump, Vector){
    Jump.create = function(params){
        var TIME = 1/60.0;
        var player_state = params.player_state;
        var keyboard = params.keyboard;

    	var jump = {};
    	var wall_jump_speed = Vector.create(350,1000);
        
        var jump_started =  false;
        var max_jump_time = 5;
        var current_jump_time = 0;
        var jump_cb = undefined;
        jump.jump_speed = Vector.create(0,0);
        
        var jump_direction = Vector.create(1,1);
        var wall_jump_direction = Vector.create(1,1);

        var applyTo = function(current_speed) {
            current_speed.x += jump_direction.x*jump.jump_speed.x;
            current_speed.y += jump_direction.y*jump.jump_speed.y;
        }

        var applyLeftWalljumpTo = function(current_speed) {
            var new_speed = Vector.create(0,0);
            new_speed.x = wall_jump_direction.x*wall_jump_speed.x;
            new_speed.y = - wall_jump_direction.y*wall_jump_speed.y;
            return new_speed;
        };

        var applyRightWalljumpTo = function(current_speed) {
            var new_speed = Vector.create(0,0);
            new_speed.x = - wall_jump_direction.x*wall_jump_speed.x;
            new_speed.y = - wall_jump_direction.y*wall_jump_speed.y;
            return new_speed;
        };

        var on_gravity_inversion =  function(){
            jump_direction.y *= -1;
            wall_jump_direction.y *= -1;
        };

        var start = function(){
            jump_started = true;
        }

        var stop = function(){
            if (jump_started == true) {
                jump_started = false;
                current_jump_time = 0;
                jump.jump_speed.x = 0;
                jump.jump_speed.y = 0;
            }
        };

        var update = function(){
            if (jump_started) {
                jump.jump_speed.y = -400/(1 + current_jump_time*current_jump_time*1500);
                current_jump_time += TIME;
                if (current_jump_time > max_jump_time){
                    stop();
                }
            };
            if ( player_state.on_ground && keyboard.isJustPressed("JUMP")){
                start();
                player_state.update_after_jump();
            };
            if ( player_state.on_ground && keyboard.isJustReleased("JUMP")){
                stop();
                player_state.update_after_jump();
            };

        };

        jump.start = start;
        jump.stop = stop;
        jump.update = update;
        jump.on_gravity_inversion = on_gravity_inversion;
        jump.applyRightWalljumpTo = applyRightWalljumpTo;
        jump.applyLeftWalljumpTo = applyLeftWalljumpTo;
        jump.applyTo = applyTo;

        return jump;
    }
}(game.Jump, math.Vector));