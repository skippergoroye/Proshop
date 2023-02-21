import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps"
import { saveShippingAddress } from '../features/cart/cartSlice';

//Redux
import { useDispatch, useSelector } from "react-redux";




const ShippingScreen = () => {

  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  
  const dispatch = useDispatch()
  // const [formData, setFormData] = useState({
  //   address: '',
  //   city: '',
  //   postalCode: '',
  //   country: '',
  // })

  // const { address, city, postalCode, country } = formData


  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: [e.target.value]
  //   }))
  // }

  
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
    console.log('submit')
  }


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
                <Form.Control 
                type="text" 
                name="address"
                value={address}
                placeholder="Enter Address"
                required
                onChange={(e) => setAddress(e.target.value)}
                // onChange={onChange}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
                <Form.Control 
                type="text" 
                name="city"
                value={city}
                placeholder="Enter City"
                required
                onChange={(e) => setCity(e.target.value)}
                // onChange={onChange}
                ></Form.Control>
            </Form.Group>


            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                type="text" 
                name="postalCode"
                value={postalCode}
                placeholder="Enter Postal Code"
                required
                onChange={(e) => setPostalCode(e.target.value)}
                // onChange={onChange}
                ></Form.Control>
            </Form.Group>

            
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
                <Form.Control 
                type="text" 
                name="country"
                value={country}
                placeholder="Enter Country"
                required
                onChange={(e) => setCountry(e.target.value)}
                // onChange={onChange}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Continue
            </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen