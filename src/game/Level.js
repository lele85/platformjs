var game = game || {};
game.Level = game.Level || {};

(function(Level, Collider){
    Level.create = function(options){
        var definition = options.definition || [];
        var collidersMatrix = [];
        var h = definition.length * 32;

        var build =  function(){
            var i,j;
            for (i = 0; i < definition.length; i++) {
                var row = [];
                for (j = 0; j < definition[i].length; j++) {
                    if (definition[i][j] === 1){
                        var coll = Collider.create({
                            x: j*32,
                            y: i*32,
                            w: 32,
                            h: 32
                        });
                        row[j] = coll;
                    }
                    collidersMatrix[i] = row;
                };
            };
        };

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
            if (collidersMatrix[Math.floor((y+10)/32)+xOffset] != undefined)
            {
                coll = collidersMatrix[Math.floor((y+10)/32)+yOffset][Math.floor((x+10)/32)+xOffset];
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
                h : definition.length * 32,
                w : definition[0].length * 32
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
            getBounds : getBounds
        };
    }
}(game.Level, game.Collider));