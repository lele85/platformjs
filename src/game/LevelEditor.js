// @ts-check
import { toTileSpace, toWorldSpace, Vector } from "../math/Vector";
import { Mouse } from "../utils/Mouse";
import { Level } from "./Level";

export class LevelEditor {
  /**
   * @type {Level}
   */
  level;
  /**
   * @type {Mouse}
   */
  mouse;
  /**
   * @type {Vector}
   */
  worldOffset;

  /**
   *
   * @param {Level} level
   * @param {Mouse} mouse
   * @param {Vector} worldOffset
   */
  constructor(level, mouse, worldOffset) {
    this.level = level;
    this.mouse = mouse;
    this.worldOffset = worldOffset;
    /**
     * @type {EditorMode}
     */
    this.mode = "ADD";
    this.execute = this.execute.bind(this);
    this.init();
  }

  /**
   *
   * @param {EditorMode} mode
   * @param {Vector} position
   */
  execute(mode, position) {
    var tileSpaceCoords = toTileSpace(
      this.worldOffset,
      toWorldSpace(this.worldOffset, position)
    );
    switch (mode) {
      case "ADD":
        this.level.addCollider(tileSpaceCoords.x, tileSpaceCoords.y);
        break;
      case "REMOVE":
        this.level.removeCollider(tileSpaceCoords.x, tileSpaceCoords.y);
        break;
      default:
        console.warn(`Unknown mode: ${mode}`);
        break;
    }
  }

  /**
   *
   * @param {EditorMode} newMode
   */
  changeMode(newMode) {
    this.mode = newMode;
  }

  init() {
    this.mouse.onClick((position) => {
      this.execute(this.mode, position);
    });
  }
}
