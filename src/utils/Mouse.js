var utils = utils || {};
utils.Mouse = utils.Mouse || {};

(function(ns){
    ns.create = function(options){
        // OPTS
        //  canvas : related canvas

        var x = 0;
        var y = 0;
        var down = false;
        var canvas = options.canvas;

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

        var isDown = function(){
            return down;
        };

        var setMouseDown = function(){
            down = true;
        };
        var setMouseUp = function(){
            down = false;
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
            isDown : isDown
        }
    }
}(utils.Mouse));