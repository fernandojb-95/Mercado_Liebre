const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(req.body)
        let productCategory = req.body.category;
        const filePath = path.join(__dirname, '../public/img/products')
        callback(null, filePath);
    },
    filename: (req, file, callback) => {
        let productName = req.body.name;
        let imgName = `img-${productName.toLowerCase().replace(/ /g, '-')}-${Date.now().toString().slice(8)}${path.extname(file.originalname)}`;
        callback(null, imgName)
    }
})

const update = multer({storage: multerDiskStorage})

router.get('/detail/:id', productController.detail)

router.get('/edit/:id',productController.edit)

router.put('/:id', productController.update)

router.get('/create', productController.createForm)

router.post('/create', update.single('image') ,productController.create)

router.delete('/delete/:id', productController.delete)

router.get('/search', productController.search)


module.exports = router
