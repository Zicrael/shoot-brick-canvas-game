export default class Player {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 125;
    this.height = 15;
    this.maxSpeed = 5;
    this.speed = 0;
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10,
    };
  }
  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  draw(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update(deltaTime) {
    this.position.x += this.speed;
    if(this.position.x <= 0 + 10) {
      this.position.x = 0 + 10;
    }
    if(this.position.x  + this.width >= this.gameWidth - 10) {
      this.position.x = this.gameWidth - this.width - 10;
    }
  }
  stop() {
    this.speed = 0;
  }
}