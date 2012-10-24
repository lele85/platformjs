var game = game || {};
game.Camera = game.Camera || {};

(function(Camera){
    Camera.create = function(context, target, getBounds){
        
        var that = {};
        var CAMERA_SPEED = 300;
        var levelHeight = 2000;
        var levelWidth = 640;
        var camera_w = 640;
        var camera_w_dead_zone = 20;

        that.update = function(){

            var targetCameraY = target.y - 220;
            var cameraDistanceY = Math.abs(context.y - targetCameraY)/levelHeight;
            var cameraStepY = CAMERA_SPEED * cameraDistanceY;

            //Bottom of the level
            if (targetCameraY > getBounds().h - 480 +16) {
                targetCameraY = getBounds().h - 480 +16;
            };
            //Top of the level
            if (targetCameraY < 50) {
                targetCameraY = 0 - 16;
            };

            if (context.y > targetCameraY + 20){
                context.translate(0,cameraStepY);
                context.y -= cameraStepY;
            } else if (context.y < targetCameraY - 20){
                context.translate(0 ,- cameraStepY);
                context.y += cameraStepY;
            };


            // x scroll (Correct implementation)
            var targetCameraX = target.x;
            if (targetCameraX < 320) { targetCameraX = 320};
            if (Math.abs((targetCameraX - 320) - context.x) != 0){
                var distance = (targetCameraX - 320) -context.x;
                context.translate(-distance*CAMERA_SPEED/640,0);
                context.x += distance*CAMERA_SPEED/640;
            };
        };

        return that;
    };
}(game.Camera));