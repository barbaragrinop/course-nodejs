const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  }).catch(err => {
    console.log("error in fetching all products from db", err)
  })
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  }).catch(err => {
    console.log("error in fetching all products from db", err)
  })
}


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    }).catch(err => {
      console.log("error in fetching product by id", err)
    })

}

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts().then(cartProducts => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    }).catch(err => console.log("error in fetching products from cart", err))
  })

}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
    .then((orders) => {
      console.log('orders', orders)
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders',
        orders: orders
      });
    }).catch(err => console.log("error in fetching getOrders", err))

}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity = 1

  let fetchedCart;
  req.user.getCart()
    .then(cart => {

      if (!cart) {
        return req.user.createCart()
      }

      return cart
    })
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })

    })
    .then(productsFromCart => {
      console.log('productsFromCart', productsFromCart)
      let product;

      if (productsFromCart.length > 0) {
        product = productsFromCart[0] //product already in cart
      }


      if (product) {
        let oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1

        return product
      }
      return Product.findByPk(prodId)
    }).then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
    }).then(() => {
      res.redirect('/cart')
    })

    .catch(err => console.log("error in fetching product by id", err))
}


exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts()
    })
    .then((products) => {
      req.user.createOrder()
        .then((order) => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product
          }))
        }).catch(err => console.log("error in creating order", err))
    })
    .then((result) => {
      return fetchedCart.setProducts(null)
    }).then(() => res.redirect('/orders'))
    .catch(err => console.log("error in postOrder ", err))

}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } })
    }).then(filteredCart => {
      const product = filteredCart[0]
      product.cartItem.destroy()
    }).then(() => {
      console.log('Item removed from cart succesfully')
      res.redirect('/cart')
    }).catch(err => console.log("error in deleting product from cart", err))
}

