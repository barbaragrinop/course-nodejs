const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const expressHbs = require('express-handlebars')
const app = express()

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.engine('handlebars', expressHbs({
    layoutsDir: 'views/handlebars/layouts/',
    defaultLayout: 'main-layout',
    extname: 'handlebars'
}))

// app.set('view engine', 'pug'); //add pug

app.set('view engine', 'handlebars'); //add handlebars
app.set('views', 'views'); //add pug

app.use(bodyparser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) // common html
    // res.status(404).render('pug/404', { pageTitle: 'Page Not Found' }) // pug 
    res.status(404).render('handlebars/404', { pageTitle: 'Page Not Found' }) // handlebards
})

app.listen(3000)