const express = require('express')
const path = require('path');

const app = express();
const port = process.env.PORT;
app.use(express.static(path.resolve(__dirname , './public')))
app.listen(port || 3000, () => {
    console.log(`Server running at port ${port || 3000}`)
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'))
} )

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'))
} )

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'))
} )