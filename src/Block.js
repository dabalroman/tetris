export default class Block {
  static BLOCK_WIDTH = 24;

  /** @var number */
  x;
  /** @var number */
  y;
  /** @var number */
  color;

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} color
   */
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  setPosition (x, y) {
    this.x = x;
    this.y = y;
  }
};
