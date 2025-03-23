// @ts-check
export class MockKeyboard {
  constructor() {}

  init() {}
  destroy() {}

  /**
   *
   * @returns {false}
   */
  isJustPressed() {
    return false;
  }

  /**
   *
   * @returns {false}
   */
  isHeld() {
    return false;
  }

  /**
   *
   * @returns {false}
   */
  isJustReleased() {
    return false;
  }
}
