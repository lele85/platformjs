var game = game || {};
game.LevelEditor = game.LevelEditor || {};

(function(LevelEditor){
    LevelEditor.create = function(level, mouse, world){
        mouse.onClick(function(position){
            var tileSpaceCoords = position.toWorldSpace(world).toTileSpace();
            level.addCollider(tileSpaceCoords.x,tileSpaceCoords.y);
        });
    }
}(game.LevelEditor));