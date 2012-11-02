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
        "canvas" : canvas,
        "world" : context
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
            "INVERT_GRAVITY":71,
            "SWITCH_PLAYER" : 67,
            "EDITOR_ADD_MODE": 65,
            "EDITOR_REMOVE_MODE": 82,
        }
    });
    keyboard.init();

    var levelEditor = game.LevelEditor.create(level, mouse, context);

    var mockKeyboard = {
        init : function(){return false;},
        isJustPressed : function(){return false;},
        isHeld : function(){return false;},
        isJustReleased : function(){return false;},
    };

    var platform = game.MovingPlatform.create();
    var jump =  game.Jump.create();
    var jump2 = game.Jump.create();
    var player_state =  game.PlayerState.create();
    var player_state2 =  game.PlayerState.create();
    var gravity =  game.Gravity.create([jump, jump2, player_state, player_state2]);

    var speed_limits = game.SpeedLimits.create({
        up: 1000,
        down: 1000
    });
    var player_input_1 = game.PlayerInput.create({
        keyboard : keyboard
    });
    var player_input_2 = game.PlayerInput.create({
        keyboard : mockKeyboard
    });

    var player =  game.Player.create(keyboard,level,platform, gravity, jump, player_state, {x:40,y:2000},speed_limits, player_input_1);
    var player2 =  game.Player.create(mockKeyboard,level,platform, gravity, jump2, player_state2, {x:200,y:1500}, speed_limits, player_input_2);
    
    var camera = game.Camera.create(context, player.collider, level.getBounds);

    var updatables = [platform, player, player2, camera];
    var drawables = [level, player, player2, platform];

    var players = [player, player2];
    
    var active_player = 0;

    var mainloop =  function() {
        context.clearRect(context.x - 300,context.y,1000,480);
        for (var i = updatables.length - 1; i >= 0; i--) {
            updatables[i].update();
        };
        for (var j = drawables.length - 1; j >= 0; j--) {
            drawables[j].draw(context);
        };
        if (keyboard.isJustPressed("SWITCH_PLAYER")){
            active_player = ((active_player + 1) % 2);
            player.changeKeyboard(player2);
            camera.setTarget(players[active_player].collider);
        };
        if (keyboard.isJustPressed("EDITOR_ADD_MODE")){
            console.log("ADD");
            levelEditor.changeMode("ADD");
        };
        if (keyboard.isJustPressed("EDITOR_REMOVE_MODE")){
            console.log("REMOVE");
            levelEditor.changeMode("REMOVE");
        };
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