const express = require('express')
const products = require('./data/products')


const app = express()

// app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send("API is running....")
})


app.get('/api/products', (req, res) => {
    res.json({products})
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product)       //res.data
    // res.json({product}) res.data.products
})


app.listen(5000, console.log(`Server running on port 5000`))