const fs = require('fs');
const path = require('path')

const Product = {
    
    fileName: path.join(__dirname, '../data/products.json'),

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function() {
        return this.getData();
    },

    generateId: function() {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct) {
            return lastProduct.id + 1;
        } else {
            return 1;
        }
    },

    findByPk: function(id) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id == id);
        return productFound;
    },

    findByField: function(field, text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] == text);
        return productFound;
    },

    create: function (productData) {
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ... productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },

    delete: function (id) {
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(product => product.id != id)
        fs.writeFileSync(this.fileName, JSON.stringify(finalProducts, null, ' '));
        return true;
    },

    edit: function(productData) {
        let allProducts = this.findAll();
        let productIndex = allProducts.findIndex(product => product.id == productData.id);
        allProducts[productIndex] = productData;
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return productData;
    }

}

module.exports = Product;