import { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'


const Paymentscreen = () => {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  useEffect(() => {
    const shippingDetails = JSON.parse(localStorage.getItem('shippingAddress'))
    if (!shippingDetails.address) {
      navigate('/shipping')
    }
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault()
    localStorage.setItem('paymentMethod', paymentMethod)
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit-Card"
            id="PayPal"
            name="PaymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
       
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
        
      </Form>
    </FormContainer>
  )
}

export default Paymentscreen

