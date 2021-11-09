import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import spriteBlue from './sprites24/blue.png';
import spriteCyan from './sprites24/cyan.png';
import spriteGreen from './sprites24/green.png';
import spriteOrange from './sprites24/orange.png';
import spritePink from './sprites24/pink.png';
import spriteRed from './sprites24/red.png';
import spriteYellow from './sprites24/yellow.png';

import soundGroundKick from './assets/groundKick.wav';
import soundLevelUp from './assets/levelUp.wav';
import soundLineClear from './assets/lineClear.wav';
import soundMoveBrick from './assets/moveBrick_old.wav';
import soundTetris from './assets/tetris.wav';
import soundGameOver from './assets/gameOver.wav';

import font from './assets/font.ttf';

import shapes from './Shapes';
import colors from './Colors';
import Piece from './Piece';
import Block from './Block';

import random from './utils/random';

class Sketch {
  /** @var {p5} */
  p5;

  blockSprites = [];
  retroFont = null;

  /** @var {number} */
  fieldWidth = 10;
  /** @var {number} */
  fieldHeight = 24;
  /** @var {number} */
  fieldBlockSize = Block.BLOCK_WIDTH;
  /** @var {?number[][]} */
  field = [];

  /** @var {?Piece} */
  currentPiece = null;
  /** @var {?Piece} */
  nextPiece = null;

  /** @var {number} */
  tickLength = 400;
  /** @var {number} */
  lastTick = 0;

  /** @var {number} */
  level = 0;
  /** @var {number} */
  score = 0;
  /** @var {number} */
  lines = 0;

  /** @var {boolean} */
  pause = false;
  /** @var {boolean} */
  gameOver = false;

  /** @param {p5} p5 */
  constructor (p5) {
    this.p5 = p5;
    this.p5.setup = this.setup.bind(this);
    this.p5.draw = this.draw.bind(this);
    this.p5.keyPressed = this.keyPressed.bind(this);
    this.p5.preload = this.preload.bind(this);

    // noinspection JSUndefinedPropertyAssignment
    // this.p5.updateWithProps = props => console.log(props);
  }

  preload () {
    this.blockSprites.push(this.p5.loadImage(spriteBlue));
    this.blockSprites.push(this.p5.loadImage(spriteCyan));
    this.blockSprites.push(this.p5.loadImage(spriteGreen));
    this.blockSprites.push(this.p5.loadImage(spriteOrange));
    this.blockSprites.push(this.p5.loadImage(spritePink));
    this.blockSprites.push(this.p5.loadImage(spriteRed));
    this.blockSprites.push(this.p5.loadImage(spriteYellow));

    this.retroFont = this.p5.loadFont(font);

    this.soundGroundKick = new Audio(soundGroundKick);
    this.soundLevelUp = new Audio(soundLevelUp);
    this.soundLineClear = new Audio(soundLineClear);
    this.soundMoveBrick = new Audio(soundMoveBrick);
    this.soundTetris = new Audio(soundTetris);
    this.soundGameOver = new Audio(soundGameOver);
  }

  setup () {
    this.p5.createCanvas(800, 600);
    this.p5.background(50);
    this.p5.frameRate(30);

    this.p5.textFont(this.retroFont);

    this.newGame();
  }

  draw () {
    this.heartBeat();

    this.p5.background(50);
    this.renderField(280, 10);
    this.renderGui();
  }

  newGame () {
    this.createField();

    this.drawNextPiece();
    this.useNextPiece();
    this.drawNextPiece();

    this.score = 0;
    this.level = 0;
    this.lines = 0;

    this.lastTick = this.p5.millis();

    this.gameStart = true;
    this.pause = false;
    this.gameOver = false;
  }

  heartBeat () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    let now = this.p5.millis();

    if (now - this.lastTick >= this.tickLength) {
      this.lastTick = now;

      this.clearLines();
      this.gravity();
      this.updateLevel();
    }
  }

  /**
   * @param {number} width
   * @param {number} height
   */
  createField (width = this.fieldWidth, height = this.fieldHeight) {
    this.field =
      (new Array(height).fill(null)).map(() => new Array(width).fill(null));
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  renderField (x, y) {
    this.p5.push();

    this.p5.noFill();
    this.p5.stroke(100);
    this.p5.strokeWeight(2);
    this.p5.rect(x, y, this.fieldWidth * this.fieldBlockSize, this.fieldHeight * this.fieldBlockSize);

    this.p5.noStroke();

    this.p5.fill(40);
    this.p5.rect(
      x + this.currentPiece.x * Block.BLOCK_WIDTH,
      y,
      this.currentPiece.getWidth() * Block.BLOCK_WIDTH,
      this.fieldHeight * this.fieldBlockSize
    );

    let that = this;
    this.field.forEach((fieldRow, blockY) => fieldRow.forEach(function (block, blockX) {
      if (block === null) {
        return;
      }

      that.p5.image(
        that.blockSprites[block],
        x + blockX * Block.BLOCK_WIDTH,
        y + blockY * Block.BLOCK_WIDTH,
        Block.BLOCK_WIDTH,
        Block.BLOCK_WIDTH
      );
    }));

    this.p5.pop();

    this.currentPiece.renderPiece(x, y, this.p5, this.blockSprites);
  }

  renderGui () {
    this.p5.push();

    this.p5.noStroke();
    this.p5.fill(255);
    this.p5.textSize(20);

    this.p5.textAlign(this.p5.RIGHT);
    this.p5.text('SCORE\n' + this.score, 250, 50);
    this.p5.text('LINES\n' + this.lines, 250, 150);

    this.p5.textAlign(this.p5.LEFT);
    this.p5.text('LEVEL \n' + this.level, 550, 50);
    this.p5.text('NEXT', 550, 380);

    this.p5.noFill();
    this.p5.stroke(100);
    this.p5.strokeWeight(2);
    this.p5.rect(550, 400, 120, 120);

    let xOffset = this.nextPiece.getWidth() / 2 * this.fieldBlockSize;
    let yOffset = this.nextPiece.getHeight() / 2 * this.fieldBlockSize;
    this.nextPiece.renderPiece(610 - xOffset, 460 - yOffset, this.p5, this.blockSprites);

    this.p5.noStroke();

    if (this.gameStart) {
      this.p5.fill(50, 220);
      this.p5.rect(0, 0, this.p5.width, this.p5.height);
      this.p5.fill(255);
      this.p5.textAlign(this.p5.CENTER);
      this.p5.textSize(64);
      this.p5.text('TETRIS', this.p5.width / 2, this.p5.height / 2);
      this.p5.textSize(20);
      this.p5.text('ROMAN DĄBAL & PIOTR KŁOSEK', this.p5.width / 2, this.p5.height - 20);
      this.p5.text('PRESS "R" TO START', this.p5.width / 2, this.p5.height / 2 + 50);
    }

    if (this.pause) {
      this.p5.fill(50, 220);
      this.p5.rect(0, 0, this.p5.width, this.p5.height);
      this.p5.fill(255);
      this.p5.textAlign(this.p5.CENTER);
      this.p5.textSize(64);
      this.p5.text('PAUSE', this.p5.width / 2, this.p5.height / 2);
      this.p5.textSize(20);
      this.p5.text('PRESS "P" TO RESUME', this.p5.width / 2, this.p5.height / 2 + 50);
    }

    if (this.gameOver) {
      this.p5.fill(50, 220);
      this.p5.rect(0, 0, this.p5.width, this.p5.height);
      this.p5.fill(255);
      this.p5.textAlign(this.p5.CENTER);
      this.p5.textSize(64);
      this.p5.text('GAME OVER', this.p5.width / 2, this.p5.height / 2);
      this.p5.textSize(20);
      this.p5.text('PRESS "R" TO TRY AGAIN', this.p5.width / 2, this.p5.height / 2 + 50);
    }

    this.p5.pop();
  }

  gravity () {
    if (this.currentPiece.moveDown(this.field)) {
      this.freezeCurrentBlock();
      this.useNextPiece();
    }

    // for (let y = this.fieldHeight - 2; y >= 0; y--) {
    //   for (let x = this.fieldWidth - 1; x >= 0; x--) {
    //     if (this.field[y][x] === null || this.field[y + 1][x] !== null) {
    //       continue;
    //     }
    //
    //     this.field[y + 1][x] = this.field[y][x];
    //     this.field[y][x] = null;
    //   }
    // }
  }

  clearLines () {
    let amountOfClearedLines = 0;

    for (let y = this.fieldHeight - 1; y >= 0; y--) {
      if (this.field[y].reduce((acc, block) => acc & (block !== null), true)) {
        this.field[y] = this.field[y].map(() => null);

        for (let z = y; z > 0; z--) {
          this.field[z] = [...this.field[z - 1]];
        }

        y++;
        amountOfClearedLines++;
      }
    }

    if (amountOfClearedLines) {
      this.playSound(amountOfClearedLines === 4 ? this.soundTetris : this.soundLineClear);
      this.score += amountOfClearedLines * amountOfClearedLines * (this.level + 1) * 100;
      this.lines += amountOfClearedLines;
    }
  }

  freezeCurrentBlock () {
    this.playSound(this.soundGroundKick);

    let x = this.currentPiece.x;
    let y = this.currentPiece.y;

    for (let _y = 0; _y < this.currentPiece.getHeight(); _y++) {
      for (let _x = 0; _x < this.currentPiece.getWidth(); _x++) {
        if (this.currentPiece.blocks[_y][_x] !== null) {
          this.field[y + _y][x + _x] = this.currentPiece.blocks[_y][_x].color;
        }
      }
    }
  }

  useNextPiece () {
    this.currentPiece = this.nextPiece;
    this.currentPiece.x = Math.floor((this.fieldWidth - this.currentPiece.getWidth()) / 2);
    this.currentPiece.y = 0;

    this.drawNextPiece();

    if (this.currentPiece.isColliding(this.currentPiece.x, this.currentPiece.y, this.field)) {
      this.playSound(this.soundGameOver);
      this.gameOver = true;
    }

    this.lastTick = this.p5.millis();
  }

  drawNextPiece () {
    this.nextPiece =
      new Piece(0, 0, this.fieldWidth, this.fieldHeight, shapes[random(0, shapes.length)], random(0, colors.length));
  }

  /** @param {HTMLAudioElement} sound */
  playSound (sound) {
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().then();
  }

  updateLevel () {
    let currentLevel = this.level;

    this.level = Math.floor(this.lines / 10);
    this.tickLength = 400 - (this.level * 30);

    if (currentLevel !== this.level) {
      this.playSound(this.soundLevelUp);
    }
  }

  actionMoveLeft () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    this.playSound(this.soundMoveBrick);
    this.currentPiece.moveLeft(this.field);
  }

  actionMoveRight () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    this.playSound(this.soundMoveBrick);
    this.currentPiece.moveRight(this.field);
  }

  actionSpinBrickClock () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    this.playSound(this.soundMoveBrick);
    this.currentPiece.rotate(-1, this.field);
  }

  actionSpinBrickCounterclockwise () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    this.playSound(this.soundMoveBrick);
    this.currentPiece.rotate(1, this.field);
  }

  actionSoftDrop () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    if (this.currentPiece.moveDown(this.field)) {
      this.freezeCurrentBlock();
      this.useNextPiece();
    } else {
      this.playSound(this.soundMoveBrick);
    }
  }

  actionHardDrop () {
    if (this.pause || this.gameOver || this.gameStart) {
      return;
    }

    if (this.currentPiece.drop(this.field)) {
      this.freezeCurrentBlock();
      this.useNextPiece();
    }
  }

  actionHoldBrick () {
    console.log('Przytrzymaj klocek');
  }

  actionPauseGame () {
    if (this.gameOver || this.gameStart) {
      return;
    }

    this.pause = !this.pause;
  }

  keyPressed () {
    console.log(this.p5.keyCode);

    switch (this.p5.keyCode) {
      case 37:
        this.actionMoveLeft();
        break;
      case 39:
        this.actionMoveRight();
        break;
      case 38:
      case 88:
        this.actionSpinBrickClock();
        break;
      case 17:
      case 90:
        this.actionSpinBrickCounterclockwise();
        break;
      case 40:
        this.actionSoftDrop();
        break;
      case 32:
        this.actionHardDrop();
        break;
      case 16:
      case 67:
        this.actionHoldBrick();
        break;
      case 80:
        this.actionPauseGame();
        break;
      case 82:
        this.newGame();
        this.gameStart = false;
        break;
      default:
        break;
    }
  }
}

export default function App () {
  return (
    <div className="renderer">
      <ReactP5Wrapper sketch={p5 => new Sketch(p5)}/>
    </div>
  );
}
