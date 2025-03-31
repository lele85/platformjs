import { Level } from "./Level";
import { Mouse } from "../utils/Mouse";
import { Keyboard } from "../utils/Keyboard";
import { PlayerKeyboardProvider } from "./PlayerKeyboardProvider";
import { PlayerState } from "./PlayerState";
import { Jump } from "./Jump";
import { WallJump } from "./WallJump";
import { Vector } from "../math/Vector";
import { LevelEditor } from "./LevelEditor";
import { MovingPlatform } from "./MovingPlatform";
import { Gravity } from "./Gravity";
import { SpeedLimits } from "./SpeedLimits";
import { PlayerInput } from "./PlayerInput";
import { Collider } from "./Collider";
import { LevelLimits } from "./LevelLimits";
import { Player } from "./Player";
import { Camera } from "./Camera";
import { MockKeyboard } from "../utils/MockKeyboard";
import { parse } from "yaml";

/**
 *
 * @param {*} config
 * @returns
 */
const parseLevel = (config) => {
  const players = [];
  const definition = [];
  const lines = config.level.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "") {
      continue;
    }
    const playerA = line.indexOf("A");
    const playerB = line.indexOf("B");
    if (playerA !== -1) {
      players.push({
        x: playerA,
        y: i,
      });
    }
    if (playerB !== -1) {
      players.push({
        x: playerB,
        y: i,
      });
    }
    definition.push(
      line.split("").map((/** @type {string} */ cell) => Number(cell))
    );
  }

  return {
    players,
    definition,
  };
};

export class Scene {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   * @param {string} config
   */
  constructor(canvas, context, config) {
    this.worldOffset = new Vector(0, 0);
    const c = parse(config);
    const { players, definition } = parseLevel(c);

    var level = new Level({
      definition: definition,
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

    this.keyboard = new Keyboard({
      eventSource: window,
      actionKeyMap: actionKeyMap,
    });
    this.keyboard.init();

    var mockKeyboard = new MockKeyboard();
    mockKeyboard.init();

    this.player_keyboard_provider = new PlayerKeyboardProvider({
      keyboards: {
        PLAYER_1: this.keyboard,
        PLAYER_2: mockKeyboard,
      },
    });

    this.levelEditor = new LevelEditor(level, mouse, this.worldOffset);

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
      keyboard_provider: this.player_keyboard_provider,
    });

    var jump2 = new Jump({
      player_id: "PLAYER_2",
      player_state: player_state2,
      keyboard_provider: this.player_keyboard_provider,
    });

    var wall_jump = new WallJump({
      player_id: "PLAYER_1",
      player_state: player_state,
      keyboard_provider: this.player_keyboard_provider,
    });

    var wall_jump2 = new WallJump({
      player_id: "PLAYER_2",
      player_state: player_state2,
      keyboard_provider: this.player_keyboard_provider,
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
      keyboard: this.keyboard,
    });

    var speed_limits = new SpeedLimits({
      up: 1000,
      down: 1000,
    });

    var player_input_1 = new PlayerInput({
      player_id: "PLAYER_1",
      keyboard_provider: this.player_keyboard_provider,
    });
    var player_input_2 = new PlayerInput({
      player_id: "PLAYER_2",
      keyboard_provider: this.player_keyboard_provider,
    });

    var player_collider_1 = new Collider({
      x: players[0].x * 32,
      y: players[0].y * 32,
      w: 20,
      h: 20,
      debug: true,
      color: "red",
    });

    var player_collider_2 = new Collider({
      x: players[1].x * 32,
      y: players[1].y * 32,
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

    this.camera = new Camera({
      context: context,
      worldOffset: this.worldOffset,
      targets: [player_collider_1, player_collider_2],
      getBounds: level.getBounds.bind(level),
    });

    this.updatables = [
      this.keyboard,
      platform,
      jump,
      jump2,
      player,
      player2,
      this.camera,
      gravity,
      level_limits_1,
      level_limits_2,
      wall_jump,
      wall_jump2,
    ];
    this.drawables = [
      // prettier-ignore
      player,
      player2,
      level,
      platform,
    ];
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    if (this.keyboard.isJustPressed("SWITCH_PLAYER")) {
      this.player_keyboard_provider.switchKeyboards("PLAYER_1", "PLAYER_2");
      this.camera.nextTarget();
    }
    if (this.keyboard.isJustPressed("EDITOR_ADD_MODE")) {
      this.levelEditor.changeMode("ADD");
    }
    if (this.keyboard.isJustPressed("EDITOR_REMOVE_MODE")) {
      this.levelEditor.changeMode("REMOVE");
    }
    if (this.keyboard.isJustPressed("DUMP_LEVEL")) {
      this.levelEditor.dump();
    }
    for (let i = this.updatables.length - 1; i >= 0; i--) {
      this.updatables[i].update(dt);
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    // Clear the canvas
    context.clearRect(
      this.worldOffset.x,
      this.worldOffset.y,
      this.camera.camera_w,
      this.camera.camera_h
    );
    for (let i = this.drawables.length - 1; i >= 0; i--) {
      this.drawables[i].draw(context, this.worldOffset);
    }
  }
}
