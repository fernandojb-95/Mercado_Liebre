const express = require('express')
const path = require('path');
const app = express();
const port = process.env.PORT;
const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const methodOverride = require('method-override')

app.use(express.static(path.resolve(__dirname , './public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port || 3000, () => {
    console.log(`Server running at port ${port || 3000}`)
})

app.use('/', mainRoutes);
app.use('/product', productRoutes)
app.use('/user', userRoutes);

