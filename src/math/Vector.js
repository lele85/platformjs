var math = math || {};
math.Vector = math.Vector|| {};

(function(Vector){
    Vector.create = function(x, y){
        return {
            x : x,
            y : y
        };
    }
}(math.Vector));