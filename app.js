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

app.get('/login.html', (req, res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/products.html', (req, res)=>{
    res.sendFile(__dirname + '/views/products.html');
});

app.get('/productDetail.html', (req, res)=>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/productCart.html', (req, res)=>{
    res.sendFile(__dirname + '/views/productCart.html');
});
