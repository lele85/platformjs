var game = game || {};
game.Portal = game.Portal|| {};

(function(Portal, Collider){
    var TILE_DIMENSION = 32;
    Portal.create = function(i,j, player){
        var portal = {};

        var collider = Collider.create({
            x: i*TILE_DIMENSION,
            y: j*TILE_DIMENSION,
            w: TILE_DIMENSION*1,
            h: TILE_DIMENSION*2,
            color : "#ff0000"
        });

        portal.x = collider.x;
        portal.y = collider.y;

        portal.draw = collider.draw;

        portal.target = {};

        portal.bind = function(otherPortal){
            var other_x = otherPortal.x;
            var other_y = otherPortal.y;
            otherPortal.target.x = collider.x;
            otherPortal.target.y = collider.y;
            portal.target.x = other_x;
            portal.target.y = other_y;
        };

        portal.update = function(player){
            if (player.collider.collides(collider).x < -10){
                player.collider.x = portal.target.x + 30;
                player.collider.y = portal.target.y;
            } else if (player.collider.collides(collider).x > 10 && player.collider.collides(collider).x != 0){
                player.collider.x = portal.target.x - 30;
                player.collider.y = portal.target.y;
            };
        };
    	
        return portal;
    };
}(game.Portal, game.Collider));