import React, { useContext, useState, useEffect } from "react";
import { Box, Button as Btn, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import { Bounce } from "react-activity";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";


const AddRoom = () => {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState(null)
  const [anaData, setAnaData] = useState(null)
  const [rName, setRName] = useState(null)
  const [rType, setRType] = useState(null)
  const [rNumber, setRNumber] = useState(null)
  const [rCapacity, setRCapacity] = useState(null)
  const [roomTypeID, setRoomTypeID] = useState(null)
  const [rPrice, setRPrice] = useState(null)
  const [usedRoomNumbers, setUsedRoomNumbers] = useState(null)
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

  useEffect(() => {
    console.log(roomTypes)
    axios.get(API+'hotel/get-roomtypes')
      .then(res => {
        setRoomTypes(res.data)
        console.log(res.data)
      }).catch(e => {
        console.log(e)
      })
  }, [])


  useEffect(() => {
    axios.get(API+'hotel/get-rooms')
      .then(res => {
        let data = res.data.map(v => {
          return v.number
        })
        setUsedRoomNumbers(data)
        console.log(usedRoomNumbers.toString())
      }).catch(e => {
        console.log(e)
      })
  }, [])
  



  const handleChangeRName = (text) => {
    setRName(text.target.value)
  }
  const handleChangeRType = (text) => {
    if(text.target.value != 1){
      let jsonValue= JSON.parse(text.target.value)
      console.log(jsonValue.amount)
      setRPrice(jsonValue?.amount)
      setRType(jsonValue?.room_type_name)
      setRoomTypeID(jsonValue?.id)
    }else{
      setRPrice(null)
      setRType(null)
    }
  }
  const handleChangeRNumber = (text) => {
    let exists = usedRoomNumbers?.some(v => {
      return v == text.target.value
    })
    if(exists){
      // alert('That room number has already been used')
    }
    setRNumber(text.target.value)
  }
  const handleChangeRCapacity = (text) => {
    setRCapacity(text.target.value)
  }
  const handleChangeRPrice = (text) => {
    setRPrice(text.target.value)
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


 const addRoom = () => {
  let exists = usedRoomNumbers?.some(v => {
    return v == rNumber
  })
  if(!rName){
    alert('Please enter a room name')
  }else if(rType == 1){
    console.log(rType)
    alert('Please enter a room type')
  }
  else if(!rNumber){
    alert('Please enter a room number')
  }
  else if(!rCapacity){
    alert('Please enter a room capacity')
  }
  else if(!rPrice){
    alert('Please enter a room price')
  }else if(exists){
    alert('That room number has already been used')
  }
  else{
    setLoading(true)
    const payload = {
      name: rName,
      room_type: rType,
      number:rNumber,
      capacity: rCapacity,
      status:"UNRESERVED"
    }
    axios.post(API+'hotel/create-room/'+roomTypeID, payload)
      .then(res => {
        setLoading(false)
        axios.get(API+'hotel/get-rooms')
         .then(res => {
           let data = res.data.map(v => {
             return v.number
           })
           setUsedRoomNumbers(data)
           console.log(usedRoomNumbers.toString())
         }).catch(e => {
           console.log(e)
         })
        alert('Room created successfully')
      }).catch(e => {
        console.log(e.response.data)
        setLoading(false)
        if(String(e?.response?.data?.error).includes('Validation error')){
          alert('Room number is already in use')
        }else{

          alert('An error occurred while creating room, please try again')
        }
      })
  }
 }

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="ADD ROOM" subtitle="Add new Rooms" />
      {/* <LineChart /> */}
      <Box
        m="8px 0 0 0"
        height="80vh"
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

        <Card className="shadow" style={{backgroundColor: colors.primary[400], }} >
          <Card.Body>
            {roomTypes ? (
              <Form>
              <Form.Group>
                  <Form.Label className="text-start">
                    Room Name
                  </Form.Label>
                  <Form.Control required type="text" placeholder="Enter room name" value={rName} onChange={handleChangeRName} />
                </Form.Group>
                <Form.Group style={{marginTop: 10}} className="mb-3 text-start" controlId="formBasicEmail">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control 
                     required
                    as="select"
                    arial-lable="Select Staff Type"
                    onChange={handleChangeRType}
                  >
                    <option value={1}>Select Room Type</option>
                    {roomTypes?.map(room => {
                      return (<option key={room.id} value={JSON.stringify(room)}>{room.room_type_name}</option> )
                    })}
                  </Form.Control>
  
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start">
                    Room Number
                  </Form.Label>
                  <Form.Control
                    required
                    type="text" 
                    placeholder="Enter room number" 
                    value={rNumber} 
                    onChange={handleChangeRNumber} 
                    isInvalid={usedRoomNumbers?.some(v => {
                      return v == rNumber
                    })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a room number other than {usedRoomNumbers?.toString()}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className=" ">
                  <Form.Label className="text-start mt-2">
                    Room Capacity
                  </Form.Label>
                  <Form.Control required type="number" placeholder="Enter room capacity" value={rCapacity} onChange={handleChangeRCapacity}  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start mt-2" >
                    Room Price
                  </Form.Label>
                  <Form.Control disabled required type="number" placeholder="Enter room Pricing" value={rPrice} onChange={handleChangeRPrice}  />
                </Form.Group>
                  <Button variant="primary" onClick={addRoom} style={{padding:5, width:'50%', marginTop: 20}}>
                  {!loading ? (
                            <div>
                              Add Room
                            </div>
                            ) : (
                                <Bounce />
                              )}
                  </Button>
              </Form>
            ):(
              <p>Add room type first</p>
            )}
            
          </Card.Body>
        </Card>
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddRoom;
