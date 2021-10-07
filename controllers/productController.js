const path = require('path');
const fs = require('fs');

const productsPath = path.join(__dirname, '../data/productsDataBase.json');

const productController = {
    detail: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const IdProduct = req.params.id;
        const detail = products.find(article => article.id == IdProduct)
        res.render('detail', {detail})
    },
    edit: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        const IdProduct = req.params.id;
        const detail = products.find(article => article.id == IdProduct)
        res.render('product-edit-form', {product: detail})
    },
	update: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image,
		};
		let newProducts = products.map(product =>{
			if(product.id == productToEdit.id){
				return product = {...productToEdit}
			}
			return product
		});
		fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
    },
    createForm: (req, res) => {
        res.render('product-create-form')
    },
    create: (req,res) =>{
        console.log(req.body)
        const imageFile = req.file ? req.file.filename : "default-image.png";
        const newProduct = {
            id: products[products.length -1].id + 1,
            ...req.body,
            image: imageFile 
        }
        products.push(newProduct)
        fs.writeFileSync(productsPath, JSON.stringify(products, null, ' '));
		res.redirect('/');
    },
    delete: (req,res) => {
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        let id = req.params.id;
        let newProducts = products.filter(product => product.id != id)
        fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
    },
    search: (req, res) =>{
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
        let search = req.query.search.toLowerCase();
        let searchProducts = products.filter(product => {
            return product.name.toLowerCase().includes(search)
        })
        res.render('search', {products: searchProducts, search: search})
    }
}

module.exports = productController;