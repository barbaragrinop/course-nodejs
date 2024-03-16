const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      try {
        cb(JSON.parse(fileContent));
      } catch (err) {
        return cb([]);
      }
    }
  });
};

module.exports = class Product {
  constructor(title, imgUrl, description, price) {
    this.title = title;
    this.imgUrl = imgUrl
    this.description = description
    this.price = price
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {

    getProductsFromFile(products => {
      const product = products.find(p => {
        if (p.id.toString() === id) {
          return p;
        }
      });
      cb(product);
    });
  }

  static deleteById(id, cb) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(p => p.id.toString() !== id);
      const product = products.find(p => p.id.toString() === id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
          cb(product);
        }
      });
    });
  }
};
