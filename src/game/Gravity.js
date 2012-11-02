var game = game || {};
game.Gravity = game.Gravity|| {};

(function(Gravity, Vector){
    /*
    params:
      - observers
      - keyboard
    */
    Gravity.create = function(params){
        var keyboard = params.keyboard;

    	var gravity = {};
        var acceleration =  Vector.create(0,7000);
        var observers =  params.observers || [{
            on_gravity_inversion : function(){}
        }];

        gravity.notify_gravity_inversion = function(){
            for (index in observers) {
                observers[index].on_gravity_inversion();
            };
        };

        gravity.applyTo = function(speed, dt) {
            var new_speed =  Vector.create(0,0);
            speed.x = speed.x + 0.5*acceleration.x * dt;
            speed.y = speed.y + 0.5*acceleration.y * dt;
        };

        gravity.invert_y =  function(){
            acceleration.y *= -1;
            gravity.notify_gravity_inversion();
        };

        gravity.update = function(){
            if (keyboard.isJustPressed("INVERT_GRAVITY")){
                gravity.invert_y();
            };
        };

        return gravity;
    };
}(game.Gravity, math.Vector));