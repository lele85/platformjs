var game = game || {};
game.Player = game.Player || {};

(function(Player, Vector){
    Player.create = function(params){
        var that = {};
        var position_notifier = params.position_notifier || {emit: function(){}};
        var movingPlatform = params.platform;
        var state = params.player_state;
        var position = params.position;
        var speed_influencers = params.speed_influencers;
        var mouse = params.mouse;
        var collider = params.collider;
        var level_limits = params.level_limits;

        that.speed = Vector.create(0,0);
        
        that.movingPlatform =  movingPlatform;
        that.state = state;

        that.update =  function(dt){

            var oldY = collider.y;
            var oldX = collider.x;
            
            var old_X_Int = parseInt(oldX);
            var old_Y_Int = parseInt(oldY);

            //Apply speed influencers
            for (var i = speed_influencers.length - 1; i >= 0; i--) {
                speed_influencers[i].applyTo(that.speed);
            };
            

            collider.y = oldY + that.speed.y*dt;
            collider.x =  oldX + that.speed.x*dt;

            var totalResponse = level_limits.applyTo(collider);
            
            //Collision with moving platform
            /*
            var response = that.movingPlatform.collides(collider);
            if (response.y != 0){
                collider.x += that.movingPlatform.SPEED;
                collider.y -= response.y;
                totalYResponse -= response.y;
                collisionWithMovingPlatform = true;
            };*/

            that.speed.y = (collider.y - oldY)/dt;
            that.state.update(totalResponse);

            
            var new_X_Int = parseInt(collider.x);
            var new_Y_Int = parseInt(collider.y);
            if (new_X_Int != old_X_Int || new_Y_Int != old_Y_Int){
                position_notifier.emit('update',{x:new_X_Int,y:new_Y_Int});
            }
            //position_notifier.emit('update',{collider.x,collider.y});
        }

        that.collides =  function(otherCollider){
            return collider.collides(otherCollider);
        };

        that.draw = function(context){
            collider.draw(context);
        };

        return that;
    };
}(game.Player, math.Vector));