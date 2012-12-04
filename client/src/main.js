window.onload = function(){
    
    var socket = io.connect('http://localhost:8080');
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.webkitImageSmoothingEnabled = false;
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

    var networkEventSource1 = utils.SocketKeyboardEventSource.create({
        socket : socket
    });
    var networkEventSource2 = utils.SocketKeyboardEventSource.create({
        socket : socket
    });

    var actionKeyMap = {
        "LEFT" : 37,
        "JUMP": 32,
        "RIGHT" : 39,
        "DOWN": 40,
        "CAMERA_UP":87,
        "CAMERA_DOWN":83,
        "INVERT_GRAVITY":71,
        "SWITCH_PLAYER" : 67,
        "EDITOR_ADD_MODE": 65,
        "EDITOR_REMOVE_MODE": 82
    };

    var keyboard = utils.Keyboard.create({
        eventSource : networkEventSource1,
        actionKeyMap : actionKeyMap
    });
    keyboard.init();

    var mockKeyboard = utils.Keyboard.create({
        eventSource : networkEventSource2,
        actionKeyMap : actionKeyMap
    });
    mockKeyboard.init();

    var player_keyboard_provider = game.PlayerKeyboardProvider.create({
        keyboards: {
            "PLAYER_1" : keyboard,
            "PLAYER_2" : mockKeyboard
        }
    });

    var levelEditor = game.LevelEditor.create(level, mouse, context);

    var platform = game.MovingPlatform.create();

    var player_state =  game.PlayerState.create({
        player_id : "PLAYER_1"
    });
    var player_state2 =  game.PlayerState.create({
        player_id : "PLAYER_2"
    });

    var jump =  game.Jump.create({
        player_id : "PLAYER_1",
        player_state : player_state,
        keyboard_provider : player_keyboard_provider
    });

    var jump2 =  game.Jump.create({
        player_id : "PLAYER_2",
        player_state : player_state2,
        keyboard_provider : player_keyboard_provider
    });

    var wall_jump =  game.WallJump.create({
        player_id : "PLAYER_1",
        player_state : player_state,
        keyboard_provider : player_keyboard_provider
    });

    var wall_jump2 =  game.WallJump.create({
        player_id : "PLAYER_2",
        player_state : player_state2,
        keyboard_provider : player_keyboard_provider
    });
    
    var gravity =  game.Gravity.create(
        {
            observers:[jump, jump2, player_state, player_state2, wall_jump, wall_jump2],
            keyboard: keyboard
        });

    var speed_limits = game.SpeedLimits.create({
        up: 1000,
        down: 1000
    });

    var player_input_1 = game.PlayerInput.create({
        player_id : "PLAYER_1",
        keyboard_provider : player_keyboard_provider,
        keyboard : keyboard
    });
    var player_input_2 = game.PlayerInput.create({
        player_id : "PLAYER_2",
        keyboard_provider : player_keyboard_provider,
        keyboard : mockKeyboard
    });

    var player_collider_1 = game.Collider.create({
            x : 40,
            y : 2000,
            w : 20,
            h : 20,
            debug : false
    });

    var player_collider_2 = game.Collider.create({
            x : 200,
            y : 1500,
            w : 20,
            h : 20,
            debug : false
    });

    var spriteSheet = game.SpriteSheet.create({
        url:"assets/walk2.png",
        position : player_collider_1,
        player_state : player_state
    });

    var spriteSheet2 = game.SpriteSheet.create({
        url:"assets/walk2.png",
        position : player_collider_2,
        player_state : player_state2
    });

    var level_limits_1 = game.LevelLimits.create({
        level : level,
        collider : player_collider_1
    });

    var level_limits_2 = game.LevelLimits.create({
        level : level,
        collider : player_collider_2
    });

    var player =  game.Player.create({
        sprite : spriteSheet,
        collider : player_collider_1,
        platform : platform,
        player_state : player_state,
        speed_influencers : [jump,speed_limits,player_input_1,gravity, wall_jump],
        mouse : mouse,
        level_limits : level_limits_1
    });

    var player2 =  game.Player.create({
        sprite : spriteSheet,
        collider : player_collider_2,
        platform : platform,
        player_state : player_state2,
        speed_influencers : [jump2,speed_limits,player_input_2,gravity, wall_jump2],
        mouse : mouse,
        level_limits : level_limits_2
    });
    
    var camera = game.Camera.create({
        context : context,
        targets : [player_collider_1, player_collider_2],
        getBounds : level.getBounds
    });

    var updatables = [platform, jump, jump2, player, player2, camera, gravity, level_limits_1, level_limits_2, wall_jump, wall_jump2, spriteSheet, spriteSheet2];
    var drawables = [spriteSheet, spriteSheet2, level, player, player2, platform];
    
    var dateTime = utils.DateTime.create();
    var last_frame_ticks = dateTime.now();
    var current_frame_ticks = last_frame_ticks;
    var dt;

    

    var mainloop =  function() {
        current_frame_ticks = dateTime.now();
        dt = (current_frame_ticks - last_frame_ticks)/1000;
        if (dt < 0.02){
            context.clearRect(context.x - 300,context.y,1000,480);
            for (var i = updatables.length - 1; i >= 0; i--) {
                updatables[i].update(dt);
            };
            for (var j = drawables.length - 1; j >= 0; j--) {
                drawables[j].draw(context);
            };
            if (keyboard.isJustPressed("SWITCH_PLAYER")){
                player_keyboard_provider.switchKeyboards("PLAYER_1", "PLAYER_2");
                camera.nextTarget();
            };
            if (keyboard.isJustPressed("EDITOR_ADD_MODE")){
                levelEditor.changeMode("ADD");
            };
            if (keyboard.isJustPressed("EDITOR_REMOVE_MODE")){
                levelEditor.changeMode("REMOVE");
            };
        }
        last_frame_ticks = current_frame_ticks;
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