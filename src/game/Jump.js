var game = game || {};
game.Jump = game.Vector|| {};

(function(Jump, Vector){
    Jump.create = function(){

    	var jump = {};
    	var wall_jump_speed = Vector.create(350,1000);
        
        var jump_started =  false;
        var max_jump_time = 5;
        var current_jump_time = 0;
        var jump_cb = undefined;
        jump.jump_speed = Vector.create(0,0);

        var applyJumpTo = function(current_speed, dt) {
            var new_speed = Vector.create(0,0);
            new_speed.x = current_speed.x - jump.jump_speed.x;
            new_speed.y = current_speed.y - jump.jump_speed.y;
            return new_speed;
        };

        var applyLeftWalljumpTo = function(current_speed, dt) {
            var new_speed = Vector.create(0,0);
            new_speed.x = wall_jump_speed.x;
            new_speed.y = - wall_jump_speed.y;
            return new_speed;
        };

        var applyRightWalljumpTo = function(current_speed, dt) {
            var new_speed = Vector.create(0,0);
            new_speed.x = - wall_jump_speed.x;
            new_speed.y = - wall_jump_speed.y;
            return new_speed;
        };

        var on_gravity_inversion =  function(){
            jump.jump_speed.y *= -1;
            wall_jump_speed.y *= -1;
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

        var update = function(dt){
            if (jump_started) {
                jump.jump_speed.y = -400*1/(1 + current_jump_time*current_jump_time*1500);
                current_jump_time += dt;
                if (current_jump_time > max_jump_time){
                    stop();
                }
            }
        };

        jump.start = start;
        jump.stop = stop;
        jump.update = update;
        jump.on_gravity_inversion = on_gravity_inversion;
        jump.applyJumpTo = applyJumpTo;
        jump.applyRightWalljumpTo = applyRightWalljumpTo;
        jump.applyLeftWalljumpTo = applyLeftWalljumpTo;

        return jump;
    }
}(game.Jump, math.Vector));