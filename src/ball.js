import { detectCollision } from './collisionDetection.js';

export default class Ball {
  constructor(game) {
    this.image = document.getElementById('ball');
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.size = 16;
    this.reset();
  }
  reset() {
    this.position = { 
      x: this.game.player.position.x + this.game.player.width / 2,
      y: this.game.player.position.y - this.game.player.height
    };
    this.speed = { x: 2, y: 4 };
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // wall on left or right
    if(this.position.x  + this.size >= this.gameWidth || this.position.x <= 0) {
      this.speed.x = -this.speed.x;
    }
    // wall on top
    if(this.position.y <= 0) {
      this.speed.y = -this.speed.y;
    }
    // hit bottom
    if(this.position.y + this.size >= this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
    if(detectCollision(this,this.game.player)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.player.position.y - this.size;
    }
  }
}