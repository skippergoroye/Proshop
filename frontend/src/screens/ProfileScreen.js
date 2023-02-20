import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col  } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";


//Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../features/auth/authSlice";


const ProfileScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userProfileDetails = useSelector((state) => state.userDetails);
    const { isLoading, isError, message } = userProfileDetails


    const userLoginDetails = useSelector((state) => state.userLogin);
    const { userInfo } = userLoginDetails


    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { isSuccess } = userUpdateProfile


    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    })
    const [text, setText] = useState('')

    const { name, email, password, confirm_password } = formData 

    const handleChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
    }

  useEffect(() => {
    if(!userInfo ) {
      navigate('/login')
    } else {
      if(!userInfo.name){
        dispatch(getUserDetails('profile'))
      } else{
        setFormData((prev) =>({
          ...prev,
          name: userInfo.name  ,
          email: userInfo.email,
        }))
      }
    }
  }, [dispatch, navigate, isSuccess, userInfo, userInfo.name, userInfo.email])


  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== confirm_password) {
        setText('Password do not match')
    } else {
        dispatch(updateUserProfile({ id: userInfo._id, name, email, password }))
    }
  };


  return (
     <Row>
       <Col md={3}>
          <h2>User Profile</h2>
          {text && <Message variant='danger'>{text}</Message>}
          {isError && <Message variant='danger'>{message}</Message>}
          {isSuccess && <Message variant='success'>Profile Updated</Message>}
          {isLoading && <Loader />}


          <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="name" 
                    name="name"
                    value={name}
                    placeholder="Enter Name"
                    onChange={handleChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                    type="email" 
                    name="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={handleChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password Address</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={handleChange}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirm_password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    name="confirm_password"
                    value={confirm_password}
                    placeholder="Confirm Password"
                    onChange={handleChange}
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
