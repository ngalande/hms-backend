import { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail} from 'firebase/auth'
import { ref, child, get,getDatabase } from "firebase/database";
// import Dots from "react-activity/dist/Dots";
import { Bounce } from "react-activity";
import app from '../firebaseConfig'
import { Button as Btn } from "@mui/material";


const auth = getAuth(app)
export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const user =  auth.currentUser;
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      // console.log(user.email)
      if(user){
        navigate('/home')
      }
    })
  },[])


    const handleChangeEmail = (text) => {
      setEmail(text.target.value)
      // console.log(email)
    }
    const handleChangePassword = (text) => {
      setPassword(text.target.value)
    }



  async  function handleForgotPassword (){
    // blessingsngalande10@gmail.com
    // const dbRef = ref(getDatabase());
    // setLoading(true)
    // sendPasswordResetEmail(auth, email).then((res)=>{
    //     alert('Password Reset Email has been sent')
    //     setEmail(null)
    //     setLoading(false)
    // }).catch((error)=>{
    //     setLoading(false)
    //     let code = error.message
    //     if(code.includes('user-not-found')){
    //         alert('The Provided Email is not registered to any account')
    //     }else if(code.includes('invalid-email')){
    //         alert('Enter a Valid email')
    //     }else if(code.includes('missing-email')){
    //         alert('Enter an email')
    //     }else{
    //         alert('Error occured')
    //     }
        
    //     console.log(code)
    // })
    
    }



  return (
    <div style={{backgroundColor:'#001133'}}>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          {/* <div className="border border-3 border-primary"></div> */}
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
              <img
                  className="rounded mx-auto d-block"
                  alt="logo"
                  width="150px"
                  height="150px"
                  src={require('../assets/images/logo.png')}
                  style={{ cursor: "pointer", borderRadius: "50%", }}
                />
                <h2 className="text-center mb-2 text-uppercase ">Reset Password</h2>
                <p className=" mb-5 text-start">Please enter your registerd email to reset password!</p>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
                    </Form.Group>

                    
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                      <p className="small">
                        <Btn onClick={()=> navigate('/login')}>
                          <a className="text-primary" >
                            SignIn ?
                          </a>
                        </Btn>
                      </p>
                    </Form.Group>
                     {!loading ? (

                        <Button disabled={loading} variant="primary" onClick={handleForgotPassword} style={{padding:5, width:'100%'}}>
                          Reset
                        </Button>
                        ) : (
                        <Button disabled={loading} variant="primary" style={{padding:5, width:'100%'}}>
                          <Bounce />
                        </Button>
                        )}
                  </Form>
                  
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
    );
  }
  
  