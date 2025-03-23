var game = game || {};
game.Camera = game.Camera || {};

(function (Camera) {
  Camera.create = function (params) {
    var context = params.context;
    var targets = params.targets;
    var getBounds = params.getBounds;
    var active = 0;

    var that = {};
    var CAMERA_SPEED = 300;
    var camera_w = 640;
    var semi_camera_w = camera_w / 2;
    var camera_h = 480;
    var semi_camera_h = camera_h / 2;
    var current_target = targets[0];

    that.update = function () {
      var targetCameraY = current_target.y;
      var targetCameraYBottomLimit = getBounds().h - semi_camera_h;
      var targetCameraYTopLimit = semi_camera_h;
      if (targetCameraY > targetCameraYBottomLimit) {
        targetCameraY = targetCameraYBottomLimit;
      }
      if (targetCameraY < targetCameraYTopLimit) {
        targetCameraY = targetCameraYTopLimit;
      }
      var targetToCameraDistance = targetCameraY - semi_camera_h - context.y;
      var dy = (targetToCameraDistance * CAMERA_SPEED) / getBounds().h;

      var targetCameraX = current_target.x;
      var targetCameraXLeftLimit = semi_camera_w;
      if (targetCameraX < targetCameraXLeftLimit) {
        targetCameraX = targetCameraXLeftLimit;
      }
      var targetToCameraXDistance = targetCameraX - semi_camera_w - context.x;
      var dx = (targetToCameraXDistance * CAMERA_SPEED) / camera_w;
      context.translate(-dx, -dy);
      context.x += dx;
      context.y += dy;
    };

    that.nextTarget = function () {
      active = (active + 1) % targets.length;
      current_target = targets[active];
    };

    return that;
  };
})(game.Camera);
