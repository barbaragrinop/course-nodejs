const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
      });
    }).catch(err => {
      console.log("error in fetching all products from db", err)
    })

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render('shop/', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
      });
    }).catch(err => {
      console.log("error in fetching all products from db", err)
    })
}


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([row]) => {
      res.render('shop/product-detail', {
        product: row[0],
        pageTitle: row.title,
        path: '/products'
      });
    }).catch(err => {
      console.log("error in fetching product by id", err)
    })

}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cart.products.find(prod => prod.id === product.id).qty
          })
        }
      }
      console.log('cartProducts', cartProducts)
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your orders'
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}
