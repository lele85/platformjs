var game = game || {};
game.Player = game.Player || {};

(function(Player, Vector){
    Player.create = function(params){
        var that = {};

        var movingPlatform = params.platform;
        var state = params.player_state;
        var position = params.position;
        var speed_influencers = params.speed_influencers;
        var mouse = params.mouse;
        var collider = params.collider;
        var level_limits = params.level_limits;

        that.TIME = 1/60;
        that.speed = Vector.create(0,0);
        
        that.movingPlatform =  movingPlatform;
        that.state = state;

        that.update =  function(){

            var oldY = collider.y;
            var oldX = collider.x;
            
            //Apply speed influencers
            for (var i = speed_influencers.length - 1; i >= 0; i--) {
                speed_influencers[i].applyTo(that.speed);
            };
            

            collider.y = oldY + that.speed.y*that.TIME;
            collider.x =  oldX + that.speed.x*that.TIME;

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

            that.speed.y = (collider.y - oldY)/that.TIME;
            that.state.update(totalResponse);
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