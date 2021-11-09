import Block from './Block';
import colors from './Colors';
import random from './utils/random';

export default class Piece {
  /** @var Block[] */
  blocks;

  /** @var shape */
  shape;

  /** @var number */
  x;
  /** @var number */
  y;

  /** @var number */
  fieldWidth = 0;
  /** @var number */
  fieldHeight = 0;

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} fieldWidth
   * @param {number} fieldHeight
   * @param {{name: string, structure: number[][]}} shape
   * @param {?number} color
   */
  constructor (x, y, fieldWidth, fieldHeight, shape, color = null) {
    this.x = x;
    this.y = y;
    this.fieldWidth = fieldWidth;
    this.fieldHeight = fieldHeight;
    this.shape = shape;

    this.buildFromShape(this.shape, color);
  }

  /**
   * @param {{name: string, structure: number[][]}} shape
   * @param {?number} color
   */
  buildFromShape (shape, color = null) {
    this.blocks = [];

    if (color === null) {
      color = random(0, colors.length);
    }

    this.blocks = shape.structure.map(
      (structureLane, y) =>
        structureLane.map((block, x) => (block === 1) ? new Block(x, y, color) : null)
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {p5} p5
   * @param {Image[]} blockSprites
   * @param {number} scale
   */
  renderPiece (x, y, p5, blockSprites, scale = 1) {
    p5.push();

    let that = this;

    this.blocks.forEach(function (blocksLane) {
      blocksLane.forEach(function (block) {
        if (block !== null) {
          p5.image(
            blockSprites[block.color],
            x + (block.x + that.x) * Block.BLOCK_WIDTH,
            y + (block.y + that.y) * Block.BLOCK_WIDTH,
            Block.BLOCK_WIDTH,
            Block.BLOCK_WIDTH
          );
        }
      });
    });

    p5.pop();
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {?number[][]} field
   */
  isColliding (x, y, field) {
    if (x < 0 || x > this.fieldWidth - this.getWidth() || y < 0 || y > this.fieldHeight - this.getHeight()) {
      return true;
    }

    for (let _y = 0; _y < this.getHeight(); _y++) {
      for (let _x = 0; _x < this.getWidth(); _x++) {
        if (this.blocks[_y][_x] !== null && field[y + _y][x + _x] !== null) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * @param {number} direction
   * @param {?number[][]} field
   */
  rotate (direction, field) {
    let rotatedBlock = (new Array(this.getWidth()).fill(null)).map(() => new Array(this.getHeight()).fill(null));

    for (let y = 0; y < this.getHeight(); y++) {
      for (let x = 0; x < this.getWidth(); x++) {
        let _x = direction === 1 ? this.getWidth() - x - 1 : x;
        let _y = direction === -1 ? this.getHeight() - y - 1 : y;

        if (this.blocks[_y][_x] !== null) {
          rotatedBlock[x][y] = new Block(y, x, this.blocks[_y][_x].color);
        }
      }
    }

    let temp = this.blocks;
    this.blocks = rotatedBlock;

    if (this.isColliding(this.x, this.y, field)) {
      this.blocks = temp;
    }
  }

  /** @param {?number[][]} field */
  moveLeft (field) {
    if (!this.isColliding(this.x - 1, this.y, field)) {
      this.x--;
    }

    return false;
  }

  /** @param {?number[][]} field */
  moveRight (field) {
    if (!this.isColliding(this.x + 1, this.y, field)) {
      this.x++;
    }

    return false;
  }

  /** @param {?number[][]} field */
  moveDown (field) {
    if (this.isColliding(this.x, this.y + 1, field)) {
      return true;
    }

    this.y++;
    return false;
  }

  drop (field) {
    while (this.moveDown(field) !== true) {}

    return true;
  }

  /** @return {number} */
  getWidth () {
    return this.blocks[0].length;
  }

  /** @return {number} */
  getHeight () {
    return this.blocks.length;
  }
}
