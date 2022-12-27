const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('public'));


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/products', (req, res)=>{
    res.sendFile(__dirname + '/views/products.html');
});

app.get('/productDetail', (req, res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/productCart', (req, res)=>{
    res.sendFile(__dirname + '/views/productCart.html');
});

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/views/login.html');
});
