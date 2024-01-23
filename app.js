const http = require('http')
const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
    console.log('This always runs!')
    next();
})

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!')
    res.send('<h1>The add product page!</h1>') // Send a response
})

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>') // Send a response
})


app.listen(3000)
