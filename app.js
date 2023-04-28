const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3001, () => {
    console.log('Server on-line on port 3001');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/product.html'));
});
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});
app.get('/faqs', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/faqs.html'));
});