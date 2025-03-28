import { PlayerState } from "./PlayerState";

export class SpriteSheet {
  /**
   *
   * @param {{position: {x: number, y: number}, url: string, player_state:PlayerState }} options
   */
  constructor({ position, url, player_state }) {
    this.player_state = player_state;
    this.position = position;
    this.url = url;
    this.img = new Image();
    this.loop = 500;
    this.current_time = 0;
    this.current_frame = 0;
    this.frames = 4;
    this.frame_time = this.loop / this.frames;
    this.loaded = false;
  }

  /**
   *
   * @param {number} dt
   */
  update(dt) {
    this.current_time += dt * 1000;
    this.current_frame = Math.floor(this.current_time / this.frame_time);
    if (this.current_time > 500) {
      this.current_time = 0;
      this.current_frame = 0;
    }
  }

  load() {
    this.img.onload = () => {
      this.loaded = true;
    };
    this.img.src = this.url;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.loaded) {
      let offset = this.player_state.walking == "LEFT" ? 20 : 0;
      if (this.player_state.gravity_versor.y == 1) {
        offset = this.player_state.walking == "LEFT" ? 0 : 20;
        ctx.save();
        ctx.translate(this.position.x + 10, this.position.y + 10);
        ctx.rotate(Math.PI);
        ctx.translate(-this.position.x - 10, -this.position.y - 10);
      }
      ctx.drawImage(
        this.img,
        this.current_frame * 20,
        offset,
        20,
        20,
        this.position.x,
        this.position.y,
        20,
        20
      );
      ctx.restore();
    }
  }
}
