var math = math || {};
math.Vector = math.Vector|| {};

(function(Vector){
    Vector.create = function(x, y){

    	var toWorldSpace = function(worldPosition){
    		return Vector.create(x + worldPosition.x, y + worldPosition.y);
    	};

    	var toScreenSpace =  function(worldPosition){
			return Vector.create(x - worldPosition.x, y - worldPosition.y);
    	};

        return {
        	toWorldSpace: toWorldSpace,
        	toScreenSpace : toScreenSpace,
            x : x,
            y : y
        };
    }
}(math.Vector));