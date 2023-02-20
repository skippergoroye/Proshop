import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { Row, Col, ListGroup, Image, Form, Button, ListGroupItem, Card } from "react-bootstrap";
// import {addItem} from '../features/cart/cartSlice';
// import { getSingleProducts } from "../features/products/productSlice";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from '../features/cart/cartSlice';
import { addToCart } from "../features/cart/cartSlice";

const CartScreen = () => {

  const dispatch = useDispatch();
  // const params = useParams();
  
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  
  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart);
  const { cart } = cartItems;

  // console.log(cart)
  

 



  // const removeFromCartHandler = (id) => {
  //   // dispatch(removeItem(id))
  //   console.log('remove')
  // }

  const checkoutHandler = () => {
    navigate('/shipping')
    // console.log('checkout')
  }

 

  return (
    <Row>
      <Col md={8}>
        <h1>Shooping Cart</h1>
        {/* cartItems && cartItems */}
        {cart && Array.isArray(cart) && cart?.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">GO Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart && Array.isArray(cart) && cart?.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) =>
                        dispatch(
                          // addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={()=> {dispatch(removeItem(item._id))}}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              {/* <h2>Subtotal ({cart.reduce((acc, item)=> acc + item.qty, 0)}) items</h2> */}
              <h2>SubTotal ({cart && Array.isArray(cart) && cart?.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
              ${cart && Array.isArray(cart) && cart?.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroupItem>

            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cart?.length === 0} onClick={checkoutHandler}>
                Proceed To checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  );
};

export default CartScreen;
