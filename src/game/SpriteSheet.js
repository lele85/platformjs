export const SpriteSheet = {
  create: (options) => {
    var position = options.position;

    var spriteSheet = {};
    spriteSheet.draw = function () {};
    var url = options.url;
    var img = new Image();

    var loop = 500;
    var current_time = 0;
    var current_frame = 0;
    var frames = 4;
    var frame_time = loop / frames;

    spriteSheet.update = function (dt) {
      current_time += dt * 1000;
      current_frame = Math.floor(current_time / frame_time);
      if (current_time > 500) {
        current_time = 0;
        current_frame = 0;
      }
    };

    img.onload = function () {
      spriteSheet.draw = function (ctx) {
        ctx.drawImage(
          img,
          current_frame * 20,
          20,
          20,
          20,
          position.x,
          position.y,
          20,
          20
        );
      };
    };

    img.src = url;

    return spriteSheet;
  },
};
