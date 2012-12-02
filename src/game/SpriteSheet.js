var game = game || {};
game.SpriteSheet = game.SpriteSheet || {};

(function(SpriteSheet, Vector){
    SpriteSheet.create = function(options){

        var position = options.position;
        var player_state = options.player_state;

        var spriteSheet = {};
        spriteSheet.draw = function(){};
        var url = options.url;
        var img = new Image();

        var loop = 500;
        var current_time = 0;
        var current_frame = 0;
        var frames = 4;
        var frame_time = loop/frames;

        spriteSheet.update = function(dt){
            current_time += dt*1000;
            current_frame = Math.floor(current_time/frame_time);
            if (current_time > 500) {
                current_time = 0;
                current_frame = 0;
            };
        };

        img.onload = function(){
            spriteSheet.draw = function(ctx){
                ctx.save();
                //ctx.drawImage(img, (current_frame-1)*96, 0, 96, 96, 100, 1800, 96, 96);
                ctx.drawImage(img, current_frame*20, 20, 20, 20, position.x, position.y, 20, 20);
                ctx.restore();
            };
            console.log("loaded");
        };

        img.src = url;

        return spriteSheet;
    }
}(game.SpriteSheet));