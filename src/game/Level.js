var game = game || {};
game.Level = game.Level || {};

(function(Level, Collider){
    Level.create = function(options){
        var TILE_DIMENSION = 32;

        var definition = options.definition || [];
        var collidersMatrix = [];
        var h = definition.length * TILE_DIMENSION;

        var build =  function(){
            var i,j;
            for (i = 0; i < definition.length; i++) {
                var row = [];
                for (j = 0; j < definition[i].length; j++) {
                    if (definition[i][j] === 1){
                        var coll = Collider.create({
                            x: j*TILE_DIMENSION,
                            y: i*TILE_DIMENSION,
                            w: TILE_DIMENSION,
                            h: TILE_DIMENSION
                        });
                        row[j] = coll;
                    }
                    collidersMatrix[i] = row;
                };
            };
        };

        var addCollider = function(i,j){
            collidersMatrix[i][j] = Collider.create({
                x: i*TILE_DIMENSION,
                y: j*TILE_DIMENSION,
                w: TILE_DIMENSION,
                h: TILE_DIMENSION
            });
        }

        var draw = function(context){
            for (var rowIndex in collidersMatrix){
                for (var columnIndex in collidersMatrix[rowIndex])
                    collidersMatrix[rowIndex][columnIndex].draw(context);
            };
        };

        var addIfNotUndefined = function(element,array){
            if (element !== undefined){
                array.push(element);
            };
        }

        var getCollider = function(x,y,xOffset,yOffset){
            var coll;
            if (collidersMatrix[Math.floor((y+10)/TILE_DIMENSION)+xOffset] != undefined)
            {
                coll = collidersMatrix[Math.floor((y+10)/TILE_DIMENSION)+yOffset][Math.floor((x+10)/TILE_DIMENSION)+xOffset];
            }
            return coll;
        }

        var getPotentialCollidersAt = function(x,y){
            var potentialColliders = [];
            addIfNotUndefined(getCollider(x,y,-1,-1), potentialColliders);
            addIfNotUndefined(getCollider(x,y,0,-1), potentialColliders);
            addIfNotUndefined(getCollider(x,y,1,-1), potentialColliders);
            addIfNotUndefined(getCollider(x,y,-1,0), potentialColliders);
            addIfNotUndefined(getCollider(x,y,0,0), potentialColliders);
            addIfNotUndefined(getCollider(x,y,1,0), potentialColliders);
            addIfNotUndefined(getCollider(x,y,-1,1), potentialColliders);
            addIfNotUndefined(getCollider(x,y,0,1), potentialColliders);
            addIfNotUndefined(getCollider(x,y,1,1), potentialColliders);

            return potentialColliders;
        };

        var getVerticalCollidersAt = function(x,y){
            var potentialColliders = [];
            
            addIfNotUndefined(getCollider(x,y,0,-1), potentialColliders);
            addIfNotUndefined(getCollider(x,y,0,0), potentialColliders);
            addIfNotUndefined(getCollider(x,y,0,1), potentialColliders);
            
            return potentialColliders;
        };

        var getHorizontalCollidersAt = function(x,y){
            var potentialColliders = [];
            
            addIfNotUndefined(getCollider(x,y,1,0), potentialColliders);
            addIfNotUndefined(getCollider(x,y,0,0), potentialColliders);
            addIfNotUndefined(getCollider(x,y,-1,0), potentialColliders);
            
            return potentialColliders;
        };

        var getBounds = function(){
            var bounds = {
                h : definition.length * TILE_DIMENSION,
                w : definition[0].length * TILE_DIMENSION
            };
            getBounds = function(){
                return bounds;
            }
            return bounds;
        }

        return {
            build : build,
            draw : draw,
            getPotentialCollidersAt : getPotentialCollidersAt,
            getVerticalCollidersAt : getVerticalCollidersAt,
            getHorizontalCollidersAt: getHorizontalCollidersAt,
            getBounds : getBounds,
            addCollider : addCollider
        };
    }
}(game.Level, game.Collider));