const path = require('path');
const fs = require('fs');

// const productsPath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
const mainController ={
    index: (req, res) =>{
        const productsPath = path.join(__dirname, '../data/productsDataBase.json');
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
        res.render('home', {products})
    }
}

module.exports = mainController;