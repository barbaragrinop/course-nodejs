const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title: title,
    price: price,
    imgUrl: imageUrl,
    description: description,
    userId: req.user.id
  }).then(result => {
    console.log('Product created!')
    res.redirect('/admin/products')
  }).catch(err => console.log("postAddProduct", err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imgUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imgUrl = updatedImgUrl;
    product.description = updatedDesc;
    return product.save()
  }).then(result => {
    console.log('Product Updated')
    res.redirect('/admin/products')
  }).catch(err => console.log("error in posteditProduct", err))
}


exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product.findByPk(prodId).then(product => {

    if (!product) {

      return res.redirect('/');

    }


    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => console.log("error in getEditProduct", err));

};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log("error in fetching all products admin/getProducts db", err);
    })
};



exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId).then(product => {
    return product.destroy(product)
  }).then(() => {
    console.log('Product Destroyed')
    res.redirect('/admin/products')
  }).catch(err => console.log("error in postDeleteProduct", err))
}