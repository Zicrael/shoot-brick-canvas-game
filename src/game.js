import Player from "./player.js";
import InputHandler from "./input.js";
import Ball from './ball.js';
import { buildLevel, level1, level2 } from './levels.js'; 

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  GAMEFINISHED: 5
}

export default class Game { 
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.player = new Player(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2];
    this.currentLevel = 1;
    new InputHandler(this.player, this);
  }
  start() {
    if(
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    ) {
      return false;
    }
    this.bricks = buildLevel(this, this.levels[this.currentLevel - 1]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.player];
    this.gamestate = GAMESTATE.RUNNUNG;
  }
  update(deltaTime) {
    if(this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }
    if(
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.GAMEFINISHED
    ) {
      return false;
    } else if(this.bricks.length === 0) {
        if(this.levels.length !== this.currentLevel) {
          this.currentLevel++;
          this.gamestate = GAMESTATE.NEWLEVEL;
          this.start();
        } else {
          this.gamestate = GAMESTATE.GAMEFINISHED;
        }
    } else {
      [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
      this.bricks = this.bricks.filter((brick) => {return !brick.markedForDeletion});
    }
  }
  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
    if(this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("Game paused", this.gameWidth / 2, this.gameHeight / 2);
    } else if(this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("Press spacebar to start", this.gameWidth / 2, this.gameHeight / 2);
    } else if(this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    } else if(this.gamestate === GAMESTATE.GAMEFINISHED) {
      ctx.rect(0,0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("GAME FINISHED, THANK YOU FOR PLAYING", this.gameWidth / 2, this.gameHeight / 2);
    }
  }
  togglePause() {
    if(this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}