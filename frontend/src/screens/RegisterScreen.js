import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col  } from "react-bootstrap";
import { toast } from "react-toastify"
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const redirect = location.search ? location.search.split('=')[1] : '/'


    const dispatch = useDispatch()

    const userRegisterDetails = useSelector((state) => state.userLogin);
    const { isLoading, isError, isSuccess, message, userInfo } = userRegisterDetails

    const [text, setText] = useState(null)

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    });

    const { name, email, password, confirm_password } = formData;

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState, 
        [e.target.name]: e.target.value,
      }))
  }

  useEffect(() => {
    // if(isError) {
    //   toast.error(message)
    // }

    if(isSuccess || userInfo ) {
      navigate(redirect)
      toast.success("Register Successfull");
    }
  }, [navigate, isSuccess, isError, message, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            confirm_password,
        };

        if(password !== confirm_password) {
            setText('Password do not match')
        } else {
            dispatch(register(userData))
        }
    };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {text && <Message variant='danger'>{text}</Message>}
      {isError && <Message variant='danger'>{message}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
               <Form.Control 
                type="name" 
                name="name"
                value={name}
                placeholder="Enter Name"
                onChange={onChange}
                ></Form.Control>
            </Form.Group>

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

            <Form.Group controlId="confirm_password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="password" 
                name="confirm_password"
                value={confirm_password}
                placeholder="Confirm Password"
                onChange={onChange}
                ></Form.Control>
            </Form.Group>

        <Button type='submit' variant='primary'>
            Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have An account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
