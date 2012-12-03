var utils = utils || {};
utils.Mouse = utils.Mouse || {};

(function(ns, Vector){
    ns.create = function(options){
        // OPTS
        //  canvas : related canvas
        //  world : world

        var x = 0;
        var y = 0;
        var down = false;
        var canvas = options.canvas;
        var world = options.world;

        var toCanvas = function(ev, axis) {
            // Convert window space in canvas space coordinates
            var scrollOffset = {
                X : "Top",
                Y : "Left"
            };

            var pageProp = "page" + axis;
            var clientProp = "client" + axis;
            var scrollProp = "scroll"+ scrollOffset[axis];
            var offsetProp = "offset" + scrollOffset[axis];

            var pos = 0;
            if (ev[pageProp]){
                pos = ev[pageProp];
            } else if (ev[clientProp]) {
                pos = ev[clientProp]
                    + document.body[scrollProp]
                    + document.documentElement[scrollProp];
            }
            pos = pos - canvas[offsetProp];
            return pos;
        };

        var update =  function(ev){
            x = toCanvas(ev, 'X');
            y = toCanvas(ev, 'Y');
        };

        var getX = function(){
            return x;
        };

        var getY = function(){
            return y;
        };

        var getWorldX = function(context){
            return context.x + getX();
        };

        var getWorldY = function(context){
            return context.y + getY();
        }

        var isDown = function(){
            return down;
        };

        var setMouseDown = function(){
            down = true;
        };

        var setMouseUp = function(){
            for (var i = clickObservers.length - 1; i >= 0; i--) {
                clickObservers[i](Vector.create(x,y));
            };
            down = false;
        };

        var clickObservers = [];
        var onClick = function(cb){
            clickObservers.push(
                function(){
                    cb(Vector.create(x,y));
                }
            );
        }


        var init = function(){
            canvas.addEventListener('mousemove', update, false);
            canvas.addEventListener('mousedown', setMouseDown, false);
            canvas.addEventListener('mouseup', setMouseUp, false);
        };

        return {
            init : init,
            getX : getX,
            getY : getY,
            getWorldX : getWorldX,
            getWorldY : getWorldY,
            isDown : isDown,
            onClick : onClick
        }
    }
}(utils.Mouse, math.Vector));