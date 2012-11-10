var utils = utils || {};
utils.Keyboard = utils.Keyboard || {};

(function(ns){
    ns.create = function(options){
        var actionKeyMap = options.actionKeyMap || {};

        var firstKeyDown = true;
        var keyPressed = {};
        var justPressed = {};
        var firstEventMap = {};
        var justReleased = {};

        var onKeyDown = function(ev){
            keyPressed[ev.keyCode] = true;
            if (firstEventMap[ev.keyCode]) {
                justPressed[ev.keyCode] = true;
                firstEventMap[ev.keyCode] =  false;
            } else {
                justPressed[ev.keyCode] = false;
            };
        };

        var onKeyUp = function(ev){
            keyPressed[ev.keyCode] = false;
            justPressed[ev.keyCode] = false;
            firstEventMap[ev.keyCode] = true;
            justReleased[ev.keyCode] =  true;
        };

        var init = function(){
            window.addEventListener('keydown', onKeyDown, true);
            window.addEventListener('keyup', onKeyUp, false);
        };

        var isJustPressed = function(action){
            if (justPressed[actionKeyMap[action]] === true) {
                justPressed[actionKeyMap[action]] = false;
                return true;
            }
            return false;
        };


        var isHeld =  function(action){
            return keyPressed[actionKeyMap[action]];
        };

        var isJustReleased = function(action){
            if (justReleased[actionKeyMap[action]] === true) {
                justReleased[actionKeyMap[action]] = false;
                return true;
            }
            return false;
        };

        return {
            init : init,
            isJustPressed : isJustPressed,
            isHeld : isHeld,
            isJustReleased : isJustReleased,
        }
    };

    ns.createMock = function(){
        var mockKeyboard = {
            init : function(){return false;},
            isJustPressed : function(){return false;},
            isHeld : function(){return false;},
            isJustReleased : function(){return false;},
            init : function(){}
        };
        return mockKeyboard;
    };
}(utils.Keyboard));