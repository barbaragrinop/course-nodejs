const http = require('http')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.set('view engine', 'pug'); //add pug
app.set('views', 'views'); //add pug

app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('pug/404', { pageTitle: 'Page Not Found' })
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000)