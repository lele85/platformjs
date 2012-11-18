var game = game || {};
game.LevelLimits = game.LevelLimits || {};

(function(LevelLimits, Vector){
    LevelLimits.create = function(options){
       var level = options.level;
       var collider = options.collider;
       
       var potentialColliders;
       var verticalColliders;
       var horizontalColliders;

       
       var applyTo = function(position){
            var totalXResponse = 0;
            var totalYResponse = 0;
            //Vertical collisions with level
            for (var index in verticalColliders){
                var otherCollider = verticalColliders[index];
                var response = collider.collides(otherCollider);
                totalYResponse += response.y;
                position.y += response.y;
            };
            //Horizontal collisions with level
            for (var index in potentialColliders){
                var otherCollider = potentialColliders[index];
                var response = collider.collides(otherCollider);
                totalXResponse += response.x;
                position.x += response.x;
            };
            return Vector.create(totalXResponse,totalYResponse); 
       };

       var update = function(){
       		potentialColliders = level.getPotentialCollidersAt(collider.x,collider.y);
            verticalColliders = level.getVerticalCollidersAt(collider.x,collider.y);
            horizontalColliders = level.getHorizontalCollidersAt(collider.x,collider.y);
       };

       return {
           applyTo : applyTo,
           update : update
       };
    }
}(game.LevelLimits, math.Vector));