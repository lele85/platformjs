var utils = utils || {};
utils.DateTime = utils.DateTime || {};

(function (ns) {
  ns.create = function (options) {
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
  };
})(utils.DateTime);
