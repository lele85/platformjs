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
            var targetCameraY = target.y;
            if (targetCameraY > getBounds().h - 240){
                targetCameraY = getBounds().h - 240;
            };
            if (Math.abs((targetCameraY - 240) - context.y) != 0){
                var distance = (targetCameraY - 240) - context.y;
                context.translate(0, -distance*CAMERA_SPEED/levelHeight);
                context.y += distance*CAMERA_SPEED/levelHeight;
            };
            
            var targetCameraX = target.x;
            if (targetCameraX < 320) {
                targetCameraX = 320;
            };
            if (Math.abs((targetCameraX - 320) - context.x) != 0){
                var distance = (targetCameraX - 320) - context.x;
                context.translate(-distance*CAMERA_SPEED/640,0);
                context.x += distance*CAMERA_SPEED/640;
            };
        };

        return that;
    };
}(game.Camera));