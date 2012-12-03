var utils = utils || {};
utils.SocketKeyboardEventSource = utils.SocketKeyboardEventSource || {};

(function(ns){
    ns.create = function(options){
        
        var socket = options.socket;

        var addEventListener = function(event, cb){
            socket.on(event, cb);
        };

        return {
            addEventListener : addEventListener
        };
    };
}(utils.SocketKeyboardEventSource));