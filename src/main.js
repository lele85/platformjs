window.onload = function(){

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.y = 0;
    context.x = 0;


    var levelDefinition =
        [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];


    var level = game.Level.create({
        definition : levelDefinition
    });
    level.build();
    var mouse = utils.Mouse.create({
        "canvas" : canvas
    });
    mouse.init();

    var keyboard = utils.Keyboard.create({
        actionKeyMap : {
            "LEFT" : 37,
            "JUMP": 32,
            "RIGHT" : 39,
            "DOWN": 40,
            "CAMERA_UP":87,
            "CAMERA_DOWN":83,
            "INVERT_GRAVITY":71
        }
    });
    keyboard.init();

    var platform = game.MovingPlatform.create();
    var jump =  game.Jump.create();
    var player_state =  game.PlayerState.create();
    var gravity =  game.Gravity.create([jump, player_state]);
    var player =  game.Player.create(keyboard,level,platform, gravity, jump, player_state);
    var camera = game.Camera.create(context, player.collider, level.getBounds);


    var mainloop =  function() {
        context.clearRect(context.x - 300,context.y,1000,480);
        platform.update();
        player.update();
        camera.update();
        
        level.draw(context);
        
        player.draw(context);
        platform.draw(context);
    };

    var animFrame =
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

    var recursiveAnim = function() {
        mainloop();
        animFrame(recursiveAnim);
    }

    animFrame(recursiveAnim);
    };