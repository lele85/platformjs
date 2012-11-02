var game = game || {};
game.SpeedLimits = game.SpeedLimits|| {};

(function(SpeedLimits){
    /*
    Options:
      - up
      - down
      - left
      - right
      - player_state
    */
    SpeedLimits.create = function(params){
        var up = params.up || Infinity;
        var down = params.down || Infinity;
        var left = params.left || Infinity;
        var right = params.right || Infinity;

        var applyTo = function(speed){
            if (speed.y > up){
                speed.y = up;
            }
            if (speed.y < -down){
                speed.y = -down;
            }
            if (speed.x > right){
                speed.x = right;
            }
            if (speed.x < -left){
                speed.x = -left;
            }
        }

        return {
            applyTo: applyTo
        }
    }
}(game.SpeedLimits));