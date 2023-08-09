import React, { useContext, useState, useEffect } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Bounce } from "react-activity";

import { Col, Row, Container, Card, Form,Button } from "react-bootstrap";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import BarChart from "../../../components/growthRate";
import LineChart from "../../../components/lineChart";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { getDatabase, onValue, ref, set } from "firebase/database";
import app from "../../../firebaseConfig";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import { API } from "../../../keys";
import axios from "axios";

const db = getDatabase(app);


const BookRoom = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('BOOKED')
  const [email, setEmail] = useState(null)
  const [price, setPrice] = useState(null)
  const [phone, setPhone] = useState(null)
  const [paid, setPaid] = useState(null)
  const [netPrice, setNetPrice] = useState(null)
  const [duration, setDuration] = useState(null)
  const [username, setUsername] = useState(null)
  const [rooms, setRooms] = useState([])
  const [roomType, setRoomType] = useState(null)
  const [roomId, setRoomId] = useState(null);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);




  useEffect(() => {
		axios.get(API+'hotel/get-rooms')
      .then(res => {
        let response = res.data
        let data = response.filter(r => r.status == 'UNRESERVED' )
        console.log(data)
        // let itemId = data.map(a => console.log(a.id))
        setRooms(data)
      }).catch(e => {
        console.log(e)
      })
	}, []);



  const handleChangeUsername = (text) => {
    setUsername(text.target.value)
  }
  const handleChangeEmail = (text) => {
    setEmail(text.target.value)
  }
  const handleChangeRoomType = (text) => {
    if(text.target.value != 1){
      let jsonValue= JSON.parse(text.target.value)
      setPrice(jsonValue.amount)
      console.log(jsonValue.amount)
      setRoomId(jsonValue.id)
      setRoomType(jsonValue.name)
    }else{
      console.log(text.target.value)
      setPrice(0)
      setRoomType(null)
    }
  }
  const handleChangeDuration = (text) => {
    setDuration(text.target.value)
    let total = price * Number(text.target.value)
      setNetPrice(total)
   
  }

  const handleChangeNetPrice = (text) => {
    
   
  }
  const handleChangePhone = (text) => {
    setPhone(text.target.value)
  }
  const handleChangeStatus = (text) => {
    if(text.target.value == 'BOOKED'){
      setPaid('Paid')
      setStatus(text.target.value)
    }else{
      setPaid('NotPaid')
      setStatus(text.target.value)
    }
  }

  const bookRoom = async() => {
    if(!username || !email || roomType==1 || !duration || !phone || !status){
      alert('Please ensure that all fields are filled')
    }else{
      let total = price * Number(duration)
      console.log(status)
      setNetPrice(total)
      const payload = {
        customer_name: username,
        customer_email: email,
        roomtype: roomType,
        duration: duration,
        net_amount: total,
        customer_phone_number: phone,
        paid_status: `${status == 'BOOKED' ? 'Paid' : 'NotPaid'}`,
        status:status
    }
    console.log(payload)
      setLoading(true)
      axios.post(API+'hotel/create-roomreservation/'+roomId, payload)
        .then(res => {
          setLoading(false)
          // console.log(res.data)
          axios.get(API+'hotel/get-rooms')
            .then(res => {
              let response = res.data
              let data = response.filter(r => r.status == 'UNRESERVED' )
              console.log(data)
              // let itemId = data.map(a => console.log(a.id))
              setRooms(data)
            }).catch(e => {
              console.log(e)
            })
          alert(`Room ${status} successfully`)
          // setUsername(null)
          // setEmail(null)
          // setRoomType(null)
          // setRoomId(null)
          // setDuration(null)
          // setPrice(null)
          // setPhone(null)
          // setPaid(null)
          // setStatus(null)
        }).catch(e => {
          setLoading(false)
          console.log(e.response.data)
          if(e.response.data.error.includes('Room already booked')){
            alert('Room already booked')
            // setUsername(null)
            // setEmail(null)
            // setRoomType(null)
            // setRoomId(null)
            // setDuration(null)
            // setPrice(null)
            // setPhone(null)
            // setPaid(null)
            // setStatus(null)
          }else{
            // setUsername(null)
            // setEmail(null)
            // setRoomType(null)
            // setRoomId(null)
            // setDuration(null)
            // setPrice(null)
            // setPhone(null)
            // setPaid(null)
            // setStatus(null)
            alert(`Failed to ${status} a room, please try again`)
          }
        })
    }
  }



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  return (
    <Box m="20px" p='30px'>
      <Header title="BOOK ROOM" subtitle="Room Reservation Service" />
      
      <Box
                m="8px 0 0 0"
                height="80vh"
                width='100%'
                
        alignItems="center"
        justify="center"
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
        <Card className="shadow "  style={{backgroundColor: colors.primary[400]}}>
          <Card.Body>
          {rooms.length ? (
            <Form>
          <Form.Group>
                        <Form.Label className="text-start">
                            Customer Name
                        </Form.Label>
                        <Form.Control required={true} type="text" placeholder="Enter customer name" value={username} onChange={handleChangeUsername} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-start mt-2">
                            Customer Email
                        </Form.Label>
                        <Form.Control required={true} type="text" placeholder="Enter customer email" value={email} onChange={handleChangeEmail} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-start mt-2">
                            Customer Phone Number
                        </Form.Label>
                        <Form.Control required={true} type="number" placeholder="Enter customer phone number" value={phone} onChange={handleChangePhone} />
                    </Form.Group>
                    <Form.Group className=" text-start mt-2" controlId="formBasicEmail">
                        <Form.Label>Room Type</Form.Label>
                        <Form.Control 
                         
                        as="select"
                        required={true}
                        // value={userType}
                        onChange={handleChangeRoomType}
                        arial-lable="Select Room Type"
                        >
                        <option value={1}>Select Room Type</option>
                        {rooms?.map(room => {
                          return (<option key={room.id} value={JSON.stringify(room)}>{room.name} ~ Price: {room.amount} </option> )
                        })}
                        </Form.Control>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-start mt-2">
                           Duration
                        </Form.Label>
                        <Form.Control required={true} type="text" placeholder="Enter number of days" value={duration} onChange={handleChangeDuration} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-start mt-2">
                           Total Amount
                        </Form.Label>
                        <Form.Control disabled={true} required={true} type="text" placeholder="Enter number of days" value={netPrice} onChange={handleChangeNetPrice} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start mt-2" controlId="formBasicEmail">
                        <Form.Label>Reservation Type</Form.Label>
                        <Form.Control 
                          required={true}
                        as="select"
                        // value={userType}
                        onChange={handleChangeStatus}
                        arial-lable="Select Reservation Type"
                        >
                        {/* <option value={1}>Select Reservation Type</option> */}
                        <option value={'BOOKED'}>BOOK</option>
                        <option value={'RESERVED'}>RESERVE</option>
                        
                        </Form.Control>

                    </Form.Group>
                    <Button disabled={loading} onClick={bookRoom} variant="primary"  style={{padding:5, width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                        {!loading ? (
                          <div>
                            Book Room
                          </div>
                          ) : (
                              <Bounce />
                            )}
                        </Button>       
          </Form>
          ):(
            <p>No Available Rooms to book or reserve</p>
          )}
          
          </Card.Body>
        </Card>
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BookRoom;
