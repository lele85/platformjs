var utils = utils || {};
utils.SocketKeyboardEventSource = utils.SocketKeyboardEventSource || {};

(function(ns){

    var id = 0;

    ns.create = function(options){
        var socket = options.socket;
        var assigned_id = id++;
        socket.emit('register_client', assigned_id);
        var addEventListener = function(event, cb){
            socket.on(event+"_"+assigned_id, cb);
        };

        return {
            addEventListener : addEventListener
        };
    };
}(utils.SocketKeyboardEventSource));