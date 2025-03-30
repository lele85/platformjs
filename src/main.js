import { Level } from "./game/Level";
import { Mouse } from "./utils/Mouse";
import { Keyboard } from "./utils/Keyboard";
import { PlayerKeyboardProvider } from "./game/PlayerKeyboardProvider";
import { DateTime } from "./utils/DateTime";
import { Player } from "./game/Player";
import { LevelEditor } from "./game/LevelEditor";
import { MovingPlatform } from "./game/MovingPlatform";
import { PlayerState } from "./game/PlayerState";
import { Jump } from "./game/Jump";
import { WallJump } from "./game/WallJump";
import { Gravity } from "./game/Gravity";
import { SpeedLimits } from "./game/SpeedLimits";
import { PlayerInput } from "./game/PlayerInput";
import { Collider } from "./game/Collider";
import { LevelLimits } from "./game/LevelLimits";
import { Camera } from "./game/Camera";
import { MockKeyboard } from "./utils/MockKeyboard";
import { Vector } from "./math/Vector";
import level0 from "./assets/levels/000.txt?raw";

window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  if (!canvas || canvas instanceof HTMLCanvasElement === false) {
    throw new Error("Canvas not found");
  }
  // get webgl context
  var context = canvas.getContext("2d", { desynchronized: true });

  if (!context || context instanceof CanvasRenderingContext2D === false) {
    throw new Error("Context not found");
  }
  const ratio = window.devicePixelRatio || 1;
  canvas.width = 640 * ratio;
  canvas.height = 480 * ratio;
  canvas.style.width = 640 + "px";
  canvas.style.height = 480 + "px";
  context.imageSmoothingEnabled = false;
  context.scale(ratio, ratio);
  var worldOffset = new Vector(0, 0);

  // Parse level string
  var levelDefinition = level0
    .split("\n")
    .map((row) => row.split("").map(Number));

  var level = new Level({
    definition: levelDefinition,
  });
  level.build();
  var mouse = new Mouse({
    canvas: canvas,
  });
  mouse.init();

  var actionKeyMap = {
    LEFT: "ArrowLeft",
    JUMP: "Space",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    INVERT_GRAVITY: "KeyG",
    SWITCH_PLAYER: "KeyC",
    EDITOR_ADD_MODE: "KeyA",
    EDITOR_REMOVE_MODE: "KeyR",
    DUMP_LEVEL: "KeyD",
  };

  var keyboard = new Keyboard({
    eventSource: window,
    actionKeyMap: actionKeyMap,
  });
  keyboard.init();

  var mockKeyboard = new MockKeyboard();
  mockKeyboard.init();

  var player_keyboard_provider = new PlayerKeyboardProvider({
    keyboards: {
      PLAYER_1: keyboard,
      PLAYER_2: mockKeyboard,
    },
  });

  var levelEditor = new LevelEditor(level, mouse, worldOffset);

  var platform = new MovingPlatform();

  var player_state = new PlayerState({
    player_id: "PLAYER_1",
  });

  var player_state2 = new PlayerState({
    player_id: "PLAYER_2",
  });

  var jump = new Jump({
    player_id: "PLAYER_1",
    player_state: player_state,
    keyboard_provider: player_keyboard_provider,
  });

  var jump2 = new Jump({
    player_id: "PLAYER_2",
    player_state: player_state2,
    keyboard_provider: player_keyboard_provider,
  });

  var wall_jump = new WallJump({
    player_id: "PLAYER_1",
    player_state: player_state,
    keyboard_provider: player_keyboard_provider,
  });

  var wall_jump2 = new WallJump({
    player_id: "PLAYER_2",
    player_state: player_state2,
    keyboard_provider: player_keyboard_provider,
  });

  var gravity = new Gravity({
    observers: [
      jump,
      jump2,
      player_state,
      player_state2,
      wall_jump,
      wall_jump2,
    ],
    keyboard: keyboard,
  });

  var speed_limits = new SpeedLimits({
    up: 1000,
    down: 1000,
  });

  var player_input_1 = new PlayerInput({
    player_id: "PLAYER_1",
    keyboard_provider: player_keyboard_provider,
  });
  var player_input_2 = new PlayerInput({
    player_id: "PLAYER_2",
    keyboard_provider: player_keyboard_provider,
  });

  var player_collider_1 = new Collider({
    x: 40,
    y: 2500,
    w: 20,
    h: 20,
    debug: true,
    color: "red",
  });

  var player_collider_2 = new Collider({
    x: 200,
    y: 1500,
    w: 20,
    h: 20,
    debug: true,
    color: "blue",
  });

  var level_limits_1 = new LevelLimits({
    level: level,
    collider: player_collider_1,
  });

  var level_limits_2 = new LevelLimits({
    level: level,
    collider: player_collider_2,
  });

  var player = new Player({
    collider: player_collider_1,
    platform: platform,
    player_state: player_state,
    // prettier-ignore
    speed_influencers: [
      jump,
      speed_limits,
      player_input_1,
      gravity,
      wall_jump,
    ],
    level_limits: level_limits_1,
  });

  var player2 = new Player({
    collider: player_collider_2,
    platform: platform,
    player_state: player_state2,
    speed_influencers: [
      jump2,
      speed_limits,
      player_input_2,
      gravity,
      wall_jump2,
    ],
    level_limits: level_limits_2,
  });

  var camera = new Camera({
    context: context,
    worldOffset: worldOffset,
    targets: [player_collider_1, player_collider_2],
    getBounds: level.getBounds.bind(level),
  });

  var updatables = [
    platform,
    jump,
    jump2,
    player,
    player2,
    camera,
    gravity,
    level_limits_1,
    level_limits_2,
    wall_jump,
    wall_jump2,
  ];
  var drawables = [
    // prettier-ignore
    player,
    player2,
    level,
    platform,
  ];
  var last_frame_ticks = DateTime.now();
  var current_frame_ticks = last_frame_ticks;
  var dt;

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  var mainloop = function (context) {
    current_frame_ticks = DateTime.now();
    dt = (current_frame_ticks - last_frame_ticks) / 1000;

    if (dt < 0.05) {
      // Clear the canvas
      context.clearRect(
        worldOffset.x,
        worldOffset.y,
        camera.camera_w,
        camera.camera_h
      );
      for (let i = updatables.length - 1; i >= 0; i--) {
        updatables[i].update(dt);
      }
      for (let j = drawables.length - 1; j >= 0; j--) {
        drawables[j].draw(context, worldOffset);
      }
      if (keyboard.isJustPressed("SWITCH_PLAYER")) {
        player_keyboard_provider.switchKeyboards("PLAYER_1", "PLAYER_2");
        camera.nextTarget();
      }
      if (keyboard.isJustPressed("EDITOR_ADD_MODE")) {
        levelEditor.changeMode("ADD");
      }
      if (keyboard.isJustPressed("EDITOR_REMOVE_MODE")) {
        levelEditor.changeMode("REMOVE");
      }
      if (keyboard.isJustPressed("DUMP_LEVEL")) {
        levelEditor.dump();
      }
    } else {
      console.log("skip frame");
    }
    last_frame_ticks = current_frame_ticks;
  };

  var recursiveAnim = ((context) => () => {
    mainloop(context);
    window.requestAnimationFrame(recursiveAnim);
  })(context);

  window.requestAnimationFrame(recursiveAnim);
};
