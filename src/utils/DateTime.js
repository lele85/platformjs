export const DateTime = {
  create: function () {
    window.performance = window.performance || {};

    window.performance.now = (function () {
      return (
        performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow ||
        function () {
          return new Date().getTime();
        }
      );
    })();

    return {
      now: function () {
        return window.performance.now();
      },
    };
  },
};
