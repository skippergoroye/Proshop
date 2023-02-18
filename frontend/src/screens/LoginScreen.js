import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col  } from "react-bootstrap";
import { toast } from "react-toastify"
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'


    const dispatch = useDispatch()

    const userLoginDetails = useSelector((state) => state.userLogin);
    const { isLoading, isError, isSuccess, message, userInfo } = userLoginDetails

    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.name]: e.target.value,
      }))
  }

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || userInfo ) {
      navigate(redirect)
      toast.success("Login Successfull");
    }
  }, [navigate, isSuccess, isError, message, userInfo, redirect])

  const submitHandler = (e) => {
  e.preventDefault();

  const userData = {
      email,
      password,
  };
  dispatch(login(userData));
  // toast.success(data.message);
  // toast.success("Login Successful")
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isError && <Message variant='danger'>{message}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
              type="email" 
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={onChange}
              ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password Address</Form.Label>
          <Form.Control 
              type="password" 
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={onChange}
              ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
