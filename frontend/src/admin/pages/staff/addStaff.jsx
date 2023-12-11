import React, { useContext, useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import BarChart from "../../../components/growthRate";
import LineChart from "../../../components/lineChart";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "../../../firebaseConfig";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce } from "react-activity";
import { API } from "../../../keys";

const db = getDatabase(app);

const AddStaff = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [anaData, setAnaData] = useState(null)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [userType, setUserType] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    // setOpen(true);
    // setScroll(scrollType);
    const jsonValue = JSON.parse(data)
    navigate('chart', {state:jsonValue})
    setAnaData(jsonValue)
  };

  
  const handleReset = () => {
    formRef.current.reset();
    setUsername(null)
    setEmail(null)
    setPassword(null)
    setUserType(null)
    
    // setValidated(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  

  const handleChangePassword = (text) => {
    setPassword(text.target.value)
  }
  const handleChangeUsername = (text) => {
    setUsername(text.target.value)
  }
  const handleChangeEmail = (text) => {
    setEmail(text.target.value)
  }
  const handleChangeAccountType = (text) => {
    setUserType(text.target.value)
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "btp", headerName: "Room Number", width: 200 },
    { field: "trueDepth", headerName: "Room Type", width: 200 },
    { field: "depth", headerName: "Customer", width: 200 },
    {
        field: "action", 
        headerName: "Action", 
        width: 200, 
        sortable: false, 
        disableClickEventBubbling: true,
        renderCell: (params) => {
            const onClick = (e) => {
              // setVisble(true)
              // e.stopPropagation(); // don't select this row after clicking
              const currentRow = params.row;
              // console.log(visible)
              return JSON.stringify(currentRow, null, 4);

            };
            // return <Button onClick={handleClickOpen('paper', onClick())}><BarChartOutlinedIcon style={{color:'#fff'}} /></Button>
          }
    },
  ];


  const addStaff = () => {
    if(!email){
      alert('Email is Required')
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
      alert('Enter a Valid email address')
    }else if(!username){
      alert('Enter a Valid username')
    }else if(!userType){
      alert('Enter a Valid account type')
    }else if(!password){
      alert('Enter a Valid password')
    }else{
      setLoading(true)
      const payload = {
        username: username,
        email: email,
        password: password,
        role: userType
      }
      axios.post(API+'user/register', payload)
        .then(res => {
          console.log(res.data.success)
          setLoading(false)
          alert('User created successfully')
          handleReset()
        }).catch(e => {
          // console.log(e.response.data)
          if(String(e?.response?.data?.error).includes('User already exists')){
            alert('User with the provided email already exists')
            setLoading(false)
            
          }else{
            setLoading(false)
            alert('An error occurred while creating the user')
          }
        })
    }
  }
    
 

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="CREATE STAFF" subtitle="Create new Staff Account" />
      {/* <LineChart /> */}
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
         <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh',  }}
        >
        <Grid item xs={5}>

            <Card className="shadow" style={{backgroundColor: colors.primary[400], }}>
                <Card.Body>

                    <Form ref={formRef}>
                    <Form.Group>
                        <Form.Label className="text-start">
                        Username
                        </Form.Label>
                        <Form.Control  type="text" placeholder="Enter staff username" value={username} onChange={handleChangeUsername} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-start">
                        Email
                        </Form.Label>
                        <Form.Control  type="email" placeholder="Enter email" value={email} onChange={handleChangeEmail} required= {true} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{marginTop: 10}} className="mb-3 text-start" controlId="formBasicEmail">
                        <Form.Label>Staff account type</Form.Label>
                        <Form.Control 
                        required= {true}
                        as="select"
                        // value={userType}
                        onChange={handleChangeAccountType}
                        arial-lable="Select Staff Type"
                        >
                        <option>Select account type</option>
                        <option value="ADMIN">Admin</option>
                        <option value="BARATTENDANT">Bar Attendant</option>
                        <option value="RESTAURANTMANAGER">Restaurant Manager</option>
                        <option value="RECEPTIONIST">Receptionist</option>
                        </Form.Control>

                    </Form.Group>
                    
                    <Form.Group style={{marginTop: 10}} >
                        <Form.Label className="text-start">
                        Password
                        </Form.Label>
                        <Form.Control  type="password" placeholder="Enter Password" value={password} onChange={handleChangePassword} />
                    </Form.Group>
                    <Button disabled={loading} variant="primary" onClick={addStaff} style={{padding:5, width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                        {!loading ? (
                          <div>
                            Add Staff
                          </div>
                          ) : (
                              <Bounce />
                            )}
                        </Button>
                    </Form>
                </Card.Body>
                </Card>
                </Grid>
                </Grid>
      </Box>
    </Box>
  );
};

export default AddStaff;
