const express = require('express')
const path = require('path')
const router = express.Router()

const rootDir = require('../util/path')
const adminData = require('./admin')


router.get('/', (req, res, next) => {
    res.render('pug/shop', { prods: adminData.products, pageTitle: 'Shop', path: '/' }) //by default it looks for views folder
})

module.exports = router 