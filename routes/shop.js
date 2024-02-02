const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");
const adminData = require("./admin");

router.get("/", (req, res, next) => {
    // res.render('pug/shop', { prods: adminData.products, pavgeTitle: 'Shop', path: '/' }) //by default it looks for views folder

    res.render("handlebars/shop", {
        prods: adminData.products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: adminData.products && adminData.products.length > 0,
        activeShop: true,
        activeAddProduct: false,
        productCSS: true,
    });
    //by default it looks for views folder
    // handlebars cant handle any logic, so we need to pass the hasProducts variable to the view
});

module.exports = router;
