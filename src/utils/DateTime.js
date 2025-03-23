export class DateTime {
  /**
   *
   * @returns {DOMHighResTimeStamp}
   */
  static now() {
    return window.performance.now();
  }
}
