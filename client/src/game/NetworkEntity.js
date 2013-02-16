var game = game || {};
game.NetworkEntity = game.NetworkEntity || {};

(function(ns){
    ns.create = function(id){
      var x = 0;
      var y = 0;
      var w = 20;
      var h = 20;

      var id = id;

      var draw = function(context){
        if (y > (context.y + 480 + 32) || y < (y -32)){
            return;
        };
        context.strokeStyle = "rgb(255,0,0);";
        context.strokeRect(x, y, w, h);
      };

      var update =  function(pos){
        x = pos.x;
        y = pos.y;
      };

      return {
          id :id,
          update : update,
          draw : draw
      };
    }
}(game.NetworkEntity));