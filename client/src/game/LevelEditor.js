var game = game || {};
game.LevelEditor = game.LevelEditor || {};

(function(LevelEditor){
    LevelEditor.create = function(level, mouse, world){
        var mode = "ADD";

        var functions = {
            "ADD" : function(position){
                var tileSpaceCoords = position.toWorldSpace(world).toTileSpace();
                level.addCollider(tileSpaceCoords.x,tileSpaceCoords.y);
            },
            "REMOVE" : function(position){
                var tileSpaceCoords = position.toWorldSpace(world).toTileSpace();
                level.removeCollider(tileSpaceCoords.x,tileSpaceCoords.y);
            }
        };

        mouse.onClick(function(position){
            functions[mode](position);
        });

        var changeMode = function(newMode){
            mode =  newMode;
        }

        return {
            changeMode : changeMode
        };
    }
}(game.LevelEditor));