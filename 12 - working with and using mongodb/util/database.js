const mongodb = require("mongodb")

const MongoCliente = mongodb.MongoClient

const mongoConnect = (callback) => {
    MongoCliente.connect('mongodb+srv://devbarbarahellen:root@cluster0.uyrr0rd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(client => {
            console.log('Connected!')
            callback(client)
        })
        .catch(err => console.log('err', err))
}

module.exports = mongoConnect