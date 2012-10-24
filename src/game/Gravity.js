var game = game || {};
game.Gravity = game.Gravity|| {};

(function(Gravity, Vector){
    Gravity.create = function(observers){
    	var gravity = {};
        gravity.acceleration =  Vector.create(0,7000);
        gravity.observers =  observers;

        gravity.notify_gravity_inversion = function(){
            for (index in observers) {
                observers[index].on_gravity_inversion();
            };
        };

        gravity.applyTo = function(current_speed, dt) {
            var new_speed =  Vector.create(0,0);
            new_speed.x = current_speed.x + 0.5*gravity.acceleration.x * dt;
            new_speed.y = current_speed.y + 0.5*gravity.acceleration.y * dt;
            return new_speed;
        };

        gravity.invert_y =  function(){
            gravity.acceleration.y *= -1;
            gravity.notify_gravity_inversion();
        };

        return gravity;
    };
}(game.Gravity, math.Vector));