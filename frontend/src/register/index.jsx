import { useContext, useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button as Btn } from "@mui/material";
import {signInWithEmailAndPassword, onAuthStateChanged, getAuth} from 'firebase/auth'
import { ref, child, get,getDatabase } from "firebase/database";
import Dots from "react-activity/dist/Dots";
import Bounce from "react-activity/dist/Bounce";
import app from '../firebaseConfig'
import { CssBaseline, ThemeProvider } from "@mui/material";
import axios from "axios";
import AuthContext from "../components/shared/authContext";
import { LoadingContext } from "../components/shared/authContext";
import { keys } from "../components/shared/variables";

const auth = getAuth(app)
export default function Register() {
    const [loading, setLoading] = useContext(LoadingContext);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [email, setEmail] = useState('')
    // const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const { register } = useContext(AuthContext)
    const { user } = useContext(AuthContext);

    useEffect(()=>{
      setLoading(false)
      // console.log('user')
      const checkUser = async() => {
        if(await user){
          if(user.type == 'admin'){
            navigate('/admin/home')
          }else if(user.type == 'reception'){
            navigate('/rec/home')
          }else if(user.type == 'bar'){
            navigate('/bar/home')
          }else if(user.type == 'restaurant'){
            navigate('/res/home')
          }else if(user.type == 'user'){
            navigate('/user/home')
          }
          console.log(await user.type)
        }
      }
      checkUser()

  },[user])


    const handleChangeEmail = (text) => {
      setEmail(text.target.value)
      // console.log(email)
    }
    const handleChangeUsername = (text) => {
      setUsername(text.target.value)
      // console.log(email)
    }
    const handleChangePassword = (text) => {
      setPassword(text.target.value)
    }
    const handleChangeConfPassword = (text) => {
      setConfPassword(text.target.value)
    }



  async  function handleRegister (){

      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        alert('Enter a Valid email address')
      }else if(!password){
        alert('Password is required')
      }else if(password !== confPassword){
        alert('Passwords must match')
      }else{

        // setLoading(true)
        // console.log(payload)
        await register(email, username, password, role)
        }
      }





  return (
    <div style={{backgroundColor:'#001133', height: '100%'}}>
      
    <Container style={{backgroundColor:'#001133', }}>
    
      <Row className="vh-90 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          {/* <div className="border border-3 border-primary"></div> */}
          <Card className="shadow" style={{marginTop: 20, marginBottom: 60}}>
            <Card.Body>
          {/* <CssBaseline /> */}
              <div className="mb-3 mt-md-4">
              <img
                  className="rounded mx-auto d-block"
                  alt="logo"
                  width="200px"
                  height="200px"
                  src={require('../assets/images/logo.png')}
                  style={{ cursor: "pointer", borderRadius: "50%", }}
                />
                {/* <h2 className="fw-bold mb-5 text-uppercase text-center">Tokpay</h2> */}
                {/* <br></br> */}
                <div className="mb-3 mt-3">
                <p className=" mb-3 text-start">Welcome! Please register an account</p>
                  <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start">
                        Username
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter username" value={username} onChange={handleChangeUsername} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start">
                        Email address
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter Password" value={password} onChange={handleChangePassword} />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="Confirm Password" value={confPassword} onChange={handleChangeConfPassword} />
                    </Form.Group>
                      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label>User Role</Form.Label>
                      <Form.Control 
                       as="select"
                       value={role}
                       onChange={e => {
                         console.log("Type is: ", e.target.value);
                         setRole(e.target.value);
                       }}
                      arial-lable="Select user type"
                      >
                        <option>Select User Role</option>
                        {/* <option value="admin">Admin</option> */}
                        <option value="ADMIN">ADMIN</option>

                      </Form.Control>

                    </Form.Group>
                    
                    
                    {/* <Form.Group
                      // className="mb-2"
                      // controlId="formBasicCheckbox"
                    >
                      <p className="small">
                        <Btn onClick={()=> navigate('/forgot')}>

                          <a className="text-primary" >
                            Forgot password?
                          </a>
                        </Btn>
                      </p>
                    </Form.Group> */}
                     {!loading ? (

                        <Button disabled={loading} variant="primary" onClick={handleRegister} style={{padding:5, width:'100%'}}>
                          Register
                        </Button>
                        ) : (
                        <Button disabled={loading} variant="primary"style={{padding:5, width:'100%'}}>
                          <Bounce />
                        </Button>
                        )}
                        <Form.Group
                      style={{marginTop: 20}}
                      className="mb-2"
                      controlId="formBasicCheckbox"
                    >
                      <p className="small">
                          <p>Already have an account? 

                            <Btn onClick={()=> navigate('/login')}>
                              <a className="text-primary" >
                                LOGIN
                              </a>
                            </Btn>
                          </p>
                      </p>
                    </Form.Group>
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
  
  