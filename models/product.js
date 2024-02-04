const products = []
const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename), 'data', 'products.json'
    //where is the file located and the name of the file
);

const getProductsFromFile = (callbackFunction) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return callbackFunction([]);
        }
        callbackFunction(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() { //save the product to the file products.json in the data folder

        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        });
    }

    static fetchAll(callbackFunction) {
        getProductsFromFile(callbackFunction);
    }

}