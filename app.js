const http = require('http')
const express = require('express')

const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.urlencoded({extended: false}))

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!')
    res.send(   
        '<form action="/product" method="POST">' + 
            '<input type="text" name="title"/>' + 
            '<button type="submit">Add product</button> '+ 
        '</form>'
    )
})


app.post('/product', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})


app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>') // Send a response
})


app.listen(3000)
