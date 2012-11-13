var game = game || {};
game.Player = game.Player || {};

(function(Player, Vector){
    Player.create = function(level, movingPlatform, gravity, jump, state, position, speed_limits, player_input){
        var that = {};

        that.TIME = 1/60;
        that.speed = Vector.create(0,0);
        that.collider = game.Collider.create({
            x : position.x || 40,
            y : position.y || 2000,
            w : 20,
            h : 20
        });
        
        that.movingPlatform =  movingPlatform;
        that.state = state;

        that.update =  function(){
            that.potentialColliders = level.getPotentialCollidersAt(that.collider.x,that.collider.y);
            that.verticalColliders = level.getVerticalCollidersAt(that.collider.x,that.collider.y);
            that.horizontalColliders = level.getHorizontalCollidersAt(that.collider.x,that.collider.y);

            var oldY = that.collider.y;
            var oldX = that.collider.x;
            
            //Applica le forze
            gravity.applyTo(that.speed, that.TIME);
            player_input.applyTo(that.speed);
            speed_limits.applyTo(that.speed);
            jump.applyTo(that.speed);
            

            that.collider.y = oldY + that.speed.y * that.TIME;
            that.collider.x =  oldX + that.speed.x*that.TIME;

            //that.speed.y = Math.round((newY - oldY)/that.TIME);
            var totalXResponse = 0;
            var totalYResponse = 0;
            var collisionWithMovingPlatform = false;
            //Vertical collisions with level
            for (var index in that.verticalColliders){
                var otherCollider = that.verticalColliders[index];
                var response = that.collides(otherCollider);
                totalYResponse += response.y;
                that.collider.y += response.y;
            };
            //Horizontal collisions with level
            for (var index in that.potentialColliders){
                var otherCollider = that.potentialColliders[index];
                var response = that.collides(otherCollider);
                totalXResponse += response.x;
                that.collider.x += response.x;
            };

            //Collision with moving platform
            /*
            var response = that.movingPlatform.collides(that.collider);
            if (response.y != 0){
                that.collider.x += that.movingPlatform.SPEED;
                that.collider.y -= response.y;
                totalYResponse -= response.y;
                collisionWithMovingPlatform = true;
            };*/

            var totalResponse = Vector.create(totalXResponse,totalYResponse);

            //that.state.update(totalResponse);

            that.speed.y = (that.collider.y - oldY)/that.TIME;

            that.state.update(totalResponse);
            
            
            
        }

        that.collides =  function(otherCollider){
            return that.collider.collides(otherCollider);
        };

        that.draw = function(context){
            that.collider.draw(context);
        };

        return that;
    };
}(game.Player, math.Vector));