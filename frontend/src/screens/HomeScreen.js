import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';


const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products')
      setProducts(res.data.products)
      console.log(res)


      // const { data } = await axios.get('/api/products')
      // setProducts(data.products)
      // console.log(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
       <h1>Lastest product</h1>
       <Row>
        {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
        ))}
       </Row>
    </>
  )
}

export default HomeScreen