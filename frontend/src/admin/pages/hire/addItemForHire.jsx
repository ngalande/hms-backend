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


const AddItemForHire = () => {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState(null)
  const [anaData, setAnaData] = useState(null)
  const [itemName, setItemName] = useState(null)
  const [itemQuantity, setItemQuantity] = useState(null)
  const [itemPrice, setItemPrice] = useState(null)
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



  const handleChangeItemName = (text) => {
    setItemName(text.target.value)
  }
  const handleChangeItemPrice = (text) => {
    setItemPrice(text.target.value)
  }
  const handleChangeItemQuantity = (text) => {
    setItemQuantity(text.target.value)
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


 const addItem = () => {
  if(!itemName){
    alert('Please enter an item name')
  }else if(!itemQuantity){
    alert('Please enter item quantity')
  }
  else if(!itemPrice){
    alert('Please enter Item Price')
  }else{
    setLoading(true)
    const payload = {
        item_name: itemName,
        item_quantity: itemQuantity,
        item_price: itemPrice,
        availability: 'InStock'
    }
    axios.post(API+'hire/create-hirestockitem', payload)
      .then(res => {
        setLoading(false)
        setItemName(null)
        setItemQuantity(null)
        setItemPrice(null)
        alert('Item created successfully')
      }).catch(e => {
        console.log(e.response.data)
        setLoading(false)
        alert('An error occurred while creating room, please try again')
      })
  }
 }

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="ADD ITEMS FOR HIRE" subtitle="Create new item for hire" />
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
              <Form>
              <Form.Group>
                  <Form.Label className="text-start">
                    Item Name
                  </Form.Label>
                  <Form.Control required type="text" placeholder="Enter item name" value={itemName} onChange={handleChangeItemName} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start mt-2">
                    Item Quantity
                  </Form.Label>
                  <Form.Control
                    required
                    type="number" 
                    placeholder="Enter Item Quantity" 
                    value={itemQuantity} 
                    onChange={handleChangeItemQuantity} 
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start mt-2" >
                    Item Price
                  </Form.Label>
                  <Form.Control required type="number" placeholder="Enter item price" value={itemPrice} onChange={handleChangeItemPrice}  />
                </Form.Group>
                
                  <Button variant="primary" onClick={addItem} style={{padding:5, width:'50%', marginTop: 20}}>
                  {!loading ? (
                            <div>
                              Add Item
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

export default AddItemForHire;
