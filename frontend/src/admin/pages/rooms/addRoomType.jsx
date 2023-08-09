import React, { useContext, useState, useEffect } from "react";
import { Box, Button as Btn, Grid, Typography, useTheme } from "@mui/material";
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


const AddRoomType = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [anaData, setAnaData] = useState(null)
  const [roomName, setRoomName] = useState(null)
  const [roomNumber, setRoomNumber] = useState(null)
  const [roomPrice, setRoomPrice] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChangeRoomName = (text) => {
    setRoomName(text.target.value)
  }
  const handleChangeNumber = (text) => {
    setRoomNumber(text.target.value)
  }
  const handleChangePrice = (text) => {
    setRoomPrice(text.target.value)
  }









  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  const addRoomType = () => {
    if(!roomName){
      alert('Please enter a room type name')
    }else if(!roomPrice){
      alert('Please enter a room price')
    }
    else{
      setLoading(true)
      const payload = {
        room_type_name: roomName,
        amount: roomPrice
      }
      axios.post(API+'hotel/create-roomtype', payload)
        .then(res => {
          setLoading(false)
          setRoomName(null)
          setRoomPrice(null)
          alert('Room type created successfully')
        }).catch(e => {
          console.log(e.response.data)
          setLoading(false)
          if(String(e?.response?.data?.error).includes('Room Type Already exists')){
            alert('Room type is already exists')
          }else{
  
            alert('An error occurred while creating room, please try again')
          }
        })
    }
   }

 

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="ADD ROOM TYPE" subtitle="Add new Room Type" />
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

        <Card className="shadow" style={{backgroundColor: colors.primary[400], width:'60vh'}} >
          <Card.Body>

            <Form>

              <Form.Group className="mb-2 text-start" controlId="formBasicEmail">

                <Form.Label className="text-start">
                  Room Name
                </Form.Label>
                <Form.Control  type="text" placeholder="Enter room name" value={roomName} onChange={handleChangeRoomName} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-start mt-2 ">
                  Room Price
                </Form.Label>
                <Form.Control  type="number" placeholder="Enter room Pricing" value={roomPrice} onChange={handleChangePrice} />
              </Form.Group>
                <Button onClick={addRoomType} variant="primary" style={{padding:5, width:'50%', marginTop: 20}}>
                  {!loading ? (
                    <div>
                      Add Room Type
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

export default AddRoomType;
