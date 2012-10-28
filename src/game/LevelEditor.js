var game = game || {};
game.LevelEditor = game.LevelEditor || {};

(function(LevelEditor){
    LevelEditor.create = function(level, mouse, world){
        mouse.onClick(function(position){
            level.addCollider(position.toWorldSpace(world).toTileSpace().x,position.toWorldSpace(world).toTileSpace().y);
        });
    }
}(game.LevelEditor));