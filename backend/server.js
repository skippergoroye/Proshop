import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
dotenv.config()

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
    const singleTask = products.find(product => product._id === req.params.id);
    res.json({singleTask})
    // const product = products.find(p => p._id === req.params._id);
    // res.json(product)       // res.data
    // res.json({product}) res.data.products
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
