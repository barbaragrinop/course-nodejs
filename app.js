const http = require('http')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')


app.use(bodyparser.urlencoded({extended: false}))

app.use(adminRoutes)
app.use(shopRoutes)



app.listen(3000)