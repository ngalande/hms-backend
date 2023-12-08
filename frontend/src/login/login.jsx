import { useContext, useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button as Btn } from "@mui/material";
import Bounce from "react-activity/dist/Bounce";
import AuthContext from "../components/shared/authContext";
import { useCookies } from "react-cookie";
import logo from '../assets/images/logo.png'

export default function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const { login, logout } = useContext(AuthContext)
    const [cookies, setCookies, removeCookie] = useCookies(["token", "user_role"]);

    useEffect(()=>{
      // console.log('user')
        if(!cookies){
          logout()
          navigate('/login')
          // console.log(user.email)
        }else if(cookies.user_role){
          if(cookies.user_role !== 'ADMIN'){
            logout()
            navigate('/login')
          }
        }
  
  
    },[])
  
    useEffect(()=>{
      console.log(cookies.token)
        if(cookies){
          if(cookies.user_role == 'RECEPTIONIST'){
            navigate("rec/home");
          }else if(cookies.user_role == 'ADMIN'){
            navigate("admin/home");
          }else if(cookies.user_role == 'BARATTENDANT'){
            navigate("bar/home");
          }else if(cookies.user_role == 'RESTAURANTMANAGER'){
            navigate("res/home");
          }else if(cookies.user_role == 'USER'){
            navigate("user/home");
          }
        }

  },[])
  useEffect(() => {
    // console.log(loading)
  }, [loading])


    const handleChangeEmail = (text) => {
      setEmail(text.target.value)
      // console.log(email)
    }
    const handleChangePassword = (text) => {
      setPassword(text.target.value)
    }



  async  function handleSignin (){

      if(!email){
        alert('Email is Required')
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        alert('Enter a Valid email address')
      }else{

        setLoading(true)
        let payload = {
          email: email,
          password: password
        }
        // console.log(payload)
        login(email, password, (res) => {
          console.log(res)
          setLoading(false)
        })
        }
      }





  return (
    <div style={{backgroundColor:'#001133', height:'100vh' }}>
      
    <Container style={{backgroundColor:'#001133', display:'flex', justifyContent:'center', alignItems:'center', height:'100vh',  }}>
    
      <Row className="d-flex justify-content-center align-items-center" style={{width:'80%'}} >
        <Col md={8} lg={6} xs={12}>
          {/* <div className="border border-3 border-primary"></div> */}
          <Card className="shadow" style={{display:'flex', justifyContent:'center', alignItems:'center', }}>
            <Card.Body>
          {/* <CssBaseline /> */}
              <div className="mb-3 mt-md-4">
              <img
                  className="rounded mx-auto d-block"
                  alt="logo"
                  width="200px"
                  height="200px"
                  src={logo}
                  style={{ cursor: "pointer", borderRadius: "50%", }}
                />
                {/* <h2 className="fw-bold mb-5 text-uppercase text-center">Tokpay</h2> */}
                {/* <br></br> */}
                <div className="mb-3 mt-3">
                <p className=" mb-3 text-start">Please enter your Email and Password!</p>
                  <Form onSubmit={handleSignin}>
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start">
                        Email
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" value={password} onChange={handleChangePassword} />
                    </Form.Group>
                    {/* <Form.Group
                      className="mb-2"
                      controlId="formBasicCheckbox"
                    >
                      <p className="small">
                        <Btn onClick={()=> navigate('/forgot')}>

                          <a className="text-primary" >
                            Forgot password?
                          </a>
                        </Btn>
                      </p>
                    </Form.Group> */}


                        <Button disabled={loading} variant="primary" onClick={handleSignin} style={{padding:5, width:'100%'}}>
                        {!loading ? (
                          <div>
                            Login
                          </div>
                          ) : (
                              <Bounce />
                            )}
                        </Button>
                        
                    {/* <Form.Group
                      style={{marginTop: 20}}
                      className="mb-2"
                      controlId="formBasicCheckbox"
                    >
                      <p className="small">
                          <p>Don't have an account yet? 

                            <Btn onClick={()=> navigate('/register')}>
                              <a className="text-primary" >
                                SIGN UP
                              </a>
                            </Btn>
                          </p>
                      </p>
                    </Form.Group> */}
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
  
  