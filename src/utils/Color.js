export default class Color {
  /** @var {number} */
  r = 0;
  /** @var {number} */
  g = 0;
  /** @var {number} */
  b = 0;

  /**
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  constructor (r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

