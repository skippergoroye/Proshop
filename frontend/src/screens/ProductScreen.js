import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from 'axios'


const ProductScreen = () => {
  
  
  const [product, setProduct] = useState([])
  
  // const { id } = useParams()
  const params = useParams();


  useEffect(() => {
    const fetchSingleProduct = async () => {
      const res = await axios.get(`/api/products/${params.id}`)
      setProduct(res.data)
      // console.log(res)

      
      // const { data } = await axios.get(`/api/products/${params.id}`)
      // setProduct(data)
      // console.log(data)
    }
    fetchSingleProduct()
  }, [params.id])



  // const { id } = useParams();
  // const product = products.find((p) => p._id === id);
  // console.log(product)

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>

            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>

            <ListGroupItem>Price: ${product.price}</ListGroupItem>

            <ListGroupItem>Description: ${product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button 
                     className="btn-block"
                     type='button'
                     disabled={product.countInStock === 0}
              >
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
    // <div>{product.name}</div>
  );
};

export default ProductScreen;




