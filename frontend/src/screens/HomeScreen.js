import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from '../features/products/productSlice.js'

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products);
  const { isLoading, isError, message, products } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
   
  // const products = []

  // import axios from 'axios';
  // // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   const fetchProducts = async () => {

  //     // const res = await axios.get('/api/products')
  //     // setProducts(res.data.products)
  //     // console.log(res)

  //     // const { data } = await axios.get('/api/products')
  //     // setProducts(data.products)
  //     // console.log(data)
  //   }
  //   fetchProducts()
  // }, [])

  return (
    <>
      <h1>Lastest product</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h3>{message}</h3>
      ) : (
        <Row>
          {products && products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product  product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
