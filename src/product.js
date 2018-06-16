module.exports = class Product {
  /**
   * @param {string} name
   * @param {number} price
   */
  constructor(name, price) {
    this._name = name;
    this._price = price;
    this._usersCount = 0;
  }

  get usersCount() {
    return this._usersCount;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  getPerUserPrice() {
    if (this._usersCount === 0) {
      throw new Error(`Product ${this._name} is not used by anyone`);
    }

    return this._price / this._usersCount;
  }

  addUser() {
    this._usersCount++;
  }
};
