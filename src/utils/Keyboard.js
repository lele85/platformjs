export class Keyboard {
  /**
   * @type {ActionKeyMap}
   */
  actionKeyMap = {};
  /**
   * @type {ActionState}
   */
  keyPressed = {};
  /**
   * @type {ActionState}
   */
  justPressed = {};
  /**
   * @type {ActionState}
   */
  justReleased = {};
  /**
   * @type {KeyboardEventSource}
   */
  eventSource = {
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  /**
   *
   * @param {{actionKeyMap: ActionKeyMap, eventSource: KeyboardEventSource}} params
   */
  constructor({ actionKeyMap, eventSource }) {
    this.actionKeyMap = actionKeyMap;
    this.eventSource = eventSource;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  init() {
    this.eventSource.addEventListener("keydown", this.onKeyDown, true);
    this.eventSource.addEventListener("keyup", this.onKeyUp, false);
  }

  destroy() {
    this.eventSource.removeEventListener("keydown", this.onKeyDown, true);
    this.eventSource.removeEventListener("keyup", this.onKeyUp, false);
  }

  /**
   *
   * @param {KeyboardEvent} ev
   */
  onKeyDown(ev) {
    if (!this.keyPressed[ev.code]) {
      // If the key was not pressed before, it is "justPressed"
      this.justPressed[ev.code] = true;
    } else {
      // Otherwise, it is not "justPressed"
      this.justPressed[ev.code] = false;
    }
    this.keyPressed[ev.code] = true; // Key is now pressed
  }

  /**
   *
   * @param {KeyboardEvent} ev
   */
  onKeyUp(ev) {
    this.keyPressed[ev.code] = false;
    this.justPressed[ev.code] = false;
    this.justReleased[ev.code] = true;
  }

  /**
   *
   * @param {string} action
   * @returns
   */
  isJustPressed(action) {
    if (this.justPressed[this.actionKeyMap[action]] === true) {
      this.justPressed[this.actionKeyMap[action]] = false;
      return true;
    }
    return false;
  }

  /**
   *
   * @param {string} action
   * @returns
   */
  isHeld(action) {
    return this.keyPressed[this.actionKeyMap[action]];
  }

  /**
   *
   * @param {string} action
   * @returns
   */
  isJustReleased(action) {
    if (this.justReleased[this.actionKeyMap[action]] === true) {
      this.justReleased[this.actionKeyMap[action]] = false;
      return true;
    }
    return false;
  }
}
