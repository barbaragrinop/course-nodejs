const express = require("express");
const path = require("path");
const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
    res.render("ejs/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        activeShop: false,
        activeAddProduct: true,
        formCSS: true,
        productCSS: true,
    }); //by default it looks for views folder
});

router.post("/product", (req, res) => {
    products.push({ title: req.body.title });
    res.redirect("/");
});

exports.routes = router;
exports.products = products;
