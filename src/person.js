const colors = require('colors');
const { table } = require('table');

const Product = require('./product');
const formatPrice = require('./format-price');

module.exports = class Person {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;

    /** @type {Product[]} */
    this._purchasedProducts = [];

    /** @type {Product[]} */
    this._usedProducts = [];
  }

  get name() {
    return this._name;
  }

  get purchasedProducts() {
    return this._purchasedProducts;
  }

  get usedProducts() {
    return this._usedProducts;
  }

  /**
   * @param {Product} product
   */
  purchase(product) {
    this._purchasedProducts.push(product);
  }

  /**
   * @param {Product} product
   */
  use(product) {
    this._usedProducts.push(product);
    product.addUser();
  }

  getTotalExpenses() {
    return this._purchasedProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }

  getTotalUsedProductsCost() {
    return this._usedProducts.reduce(
      (sum, product) => sum + product.getPerUserPrice(),
      0
    );
  }

  getDetails() {
    const totalProducts = Array.from(
      new Set([...this.purchasedProducts, ...this.usedProducts])
    );

    const productsTable = table([
      [
        'Product name',
        'Price',
        'Users count',
        'Price per user',
        'Was bought?',
        'Is used?'
      ],
      ...totalProducts.map(product => [
        product.name,
        formatPrice(product.price),
        product.usersCount,
        formatPrice(product.getPerUserPrice()),
        this.purchasedProducts.indexOf(product) === -1
          ? colors.red('No')
          : colors.green('Yes'),
        this.usedProducts.indexOf(product) === -1
          ? colors.red('No')
          : colors.green('Yes')
      ])
    ]);

    return [colors.bold.bgRed.white(this.name), productsTable].join('\n');
  }
};
