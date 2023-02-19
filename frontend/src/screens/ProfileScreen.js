import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col  } from "react-bootstrap";
// import { toast } from "react-toastify"
import Message from "../components/Message";
import Loader from "../components/Loader";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../features/auth/authSlice";

const ProfileScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userProfileDetails = useSelector((state) => state.userDetails);
    const { isLoading, isError, isSuccess, message } = userProfileDetails

    const userLoginDetails = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginDetails


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [text, setText] = useState('')

    // const [formData, setFormData] = useState({
    //   name: "",
    //   email: "",
    //   password: "",
    //   confirm_password: "",
    // });
    // const { name, email, password, confirm_password } = formData 

    // const handleChange = (e) => {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value
    //   }))
    // }





  useEffect(() => {
    // if(isError) {
    //   toast.error(message)
    // }

    if(!userInfo ) {
      navigate('/login')
    } else {
        if(!userInfo.name){
          dispatch(getUserDetails('profile'))
        } else{
          setName(userInfo.name)
          setEmail(userInfo.email)
        }
    }
  }, [dispatch, navigate, isSuccess, userInfo, userInfo.name, userInfo.email])


  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
        setText('Password do not match')
    } else {
        dispatch()
    }
  };


  return (
     <Row>
       <Col md={3}>
          <h2>User Profile</h2>
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
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type="email" 
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password Address</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirm_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

            <Button type='submit' variant='primary'>
                Update
            </Button>
          </Form>

        </Col>
        <Col md={9}>
           <h2>My Orders</h2>
        </Col>
     </Row>
  );
};

export default ProfileScreen;
