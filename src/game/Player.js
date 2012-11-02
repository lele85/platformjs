var game = game || {};
game.Player = game.Player || {};

(function(Player, Vector){
    Player.create = function(keyboard, level, movingPlatform, gravity, jump, state, position, speed_limits, player_input){
        var that = {};

        that.TIME = 1/60;
        that.speed = Vector.create(0,0);
        that.keyboard =  keyboard;
        that.collider = game.Collider.create({
            x : position.x || 40,
            y : position.y || 2000,
            w : 20,
            h : 20
        });
        
        that.MAX_HORIZONTAL_SPEED = 250;
        that.HORIZONTAL_DECELERATION = 1600;
        that.HORIZONTAL_ACCELERATION = 2000;
        that.JUMP_SPEED = 1000;
        that.WALL_JUMP_SPEED = 350;
        that.movingPlatform =  movingPlatform;
        that.gravity =  gravity;
        that.jump =  jump;
        that.state = state;

        that.update =  function(){
            that.potentialColliders = level.getPotentialCollidersAt(that.collider.x,that.collider.y);
            that.verticalColliders = level.getVerticalCollidersAt(that.collider.x,that.collider.y);
            that.horizontalColliders = level.getHorizontalCollidersAt(that.collider.x,that.collider.y);

            var oldY = that.collider.y;
            var speedAfterGravity =  gravity.applyTo(that.speed, that.TIME);
            var newY = oldY + speedAfterGravity.y * that.TIME;

            if (that.keyboard.isJustPressed("INVERT_GRAVITY")){
                that.gravity.invert_y();
            };
            
            player_input.applyTo(that.speed);

            if (that.speed.x > that.MAX_HORIZONTAL_SPEED && that.state.on_ground){
                that.speed.x = that.MAX_HORIZONTAL_SPEED;
            }
            if (that.speed.x < - that.MAX_HORIZONTAL_SPEED && that.state.on_ground){
                that.speed.x = - that.MAX_HORIZONTAL_SPEED;
            }

            that.collider.x =  that.collider.x + that.speed.x*that.TIME;

            that.collider.y = newY;
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
            var response = that.movingPlatform.collides(that.collider);
            if (response.y != 0){
                that.collider.x += that.movingPlatform.SPEED;
                that.collider.y -= response.y;
                totalYResponse -= response.y;
                collisionWithMovingPlatform = true;
            };

            var totalResponse = Vector.create(totalXResponse,totalYResponse);

            that.state.update(totalResponse, collisionWithMovingPlatform);

            that.speed.y = (that.collider.y - oldY)/that.TIME;

            

            that.state.update(totalResponse);
            
            //Top speed
            speed_limits.applyTo(that.speed);


            that.jump.update(that.TIME);
            if ( that.state.on_ground && that.keyboard.isJustPressed("JUMP")){
                that.jump.start();
                that.state.update_after_jump();
            };
            if ( that.state.on_ground && that.keyboard.isJustReleased("JUMP")){
                that.jump.stop();
                that.state.update_after_jump();
            };
            var jump_delta = that.jump.applyJumpTo(that.speed, that.TIME);
            that.speed.y += jump_delta.y;

            if ((that.state.left_wall_jump_possible) && (that.state.on_left_wall) && that.keyboard.isJustPressed("JUMP")){
                that.speed = that.jump.applyLeftWalljumpTo(that.speed);
                that.state.update_after_left_wall_jump();
            };
            if ((that.state.right_wall_jump_possible) && (that.state.on_right_wall) && that.keyboard.isJustPressed("JUMP")){
                that.speed = that.jump.applyRightWalljumpTo(that.speed);
                that.state.update_after_right_wall_jump();
            };


            
        }

        that.collides =  function(otherCollider){
            return that.collider.collides(otherCollider);
        };

        that.draw = function(context){
            that.collider.draw(context);
        };

        that.changeKeyboard = function(other){
            var other_keyboard = other.keyboard;
            var this_keyboard = that.keyboard;
            other.keyboard = this_keyboard;
            that.keyboard = other_keyboard;
        };

        return that;
    };
}(game.Player, math.Vector));