import { Keyboard } from "../utils/Keyboard.js";
import { MockKeyboard } from "../utils/MockKeyboard.js";

export class PlayerKeyboardProvider {
  /**
   *
   * @param {{ keyboards: { [key: string]: MockKeyboard | Keyboard } }} options
   */
  constructor(options) {
    this.keyboards = options.keyboards;
  }

  /**
   *
   * @param {string} player
   * @returns {MockKeyboard | Keyboard}
   */
  getKeyboard(player) {
    return this.keyboards[player] || new MockKeyboard();
  }

  /**
   *
   * @param {string} player
   * @param {string} other_player
   */
  switchKeyboards(player, other_player) {
    var player_keyboard = this.getKeyboard(player);
    var other_player_keyboard = this.getKeyboard(other_player);
    this.keyboards[other_player] = player_keyboard;
    this.keyboards[player] = other_player_keyboard;
  }
}
