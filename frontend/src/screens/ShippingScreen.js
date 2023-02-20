import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

//Redux
import { useDispatch, useSelector } from "react-redux";

const ShippingScreen = () => {

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const { address, city, postalCode, country } = formData


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value]
    }))
  }



  const submitHandler = (e) => {
    e.preventDefault()

    console.log('submit')
  }




  return (
    <FormContainer>
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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