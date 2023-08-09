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


const HireItem = () => {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState(null)
  const [items, setItems] = useState(null)
  const [itemName, setItemName] = useState(null)
  const [itemPrice, setitemPrice] = useState(null)
  const [initPrice, setInitPrice] = useState(null)
  const [secPrice, setSecPrice] = useState(null)
  const [itemDes, setItemDes] = useState(null)
  const [duration, setDuration] = useState(null)
  const [itemQuantity, setItemQuantity] = useState(null)
  const [itemId, setItemId] = useState(null)
  const [cusPhone, setCusPhone] = useState(null)
  const [cusEmail, setCusEmail] = useState(null)
  const [cusName, setCusName] = useState(null)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    // setOpen(true);
    // setScroll(scrollType);
    const jsonValue = JSON.parse(data)
    navigate('chart', {state:jsonValue})
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
    axios.get(API+'hire/get-hirestockitems')
      .then(res => {
        setItems(res.data)
      }).catch(e => {
        console.log(e)
      })
  }, [])
  



  const handleChangeDuration = (text) => {
    setDuration(text.target.value)
    setitemPrice(text.target.value * secPrice)
  }
  const handleChangeItemName = (text) => {
    if(text.target.value != 1){
      let jsonValue= JSON.parse(text.target.value)
      console.log(jsonValue)
      setInitPrice(jsonValue.item_price)
      setItemId(jsonValue.id)
      setItemQuantity(null)
    }else{
      console.log(text.target.value)
      setInitPrice(0)
      setItemName(null)
    }
  }
  const handleChangeItemPrice = (text) => {

  }
  const handleChangeDes = (text) => {
    setItemDes(text.target.value)
  }
  const handleChangeCusName = (text) => {
    setCusName(text.target.value)
  }
  const handleChangeCusPhone= (text) => {
    setCusPhone(text.target.value)
  }
  const handleChangeCusEmail = (text) => {
    setCusEmail(text.target.value)
  }
  const handleChangeItemQuantity = (text) => {
    setItemQuantity(text.target.value)
    setSecPrice(text.target.value * initPrice)
  }



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


 const hire = () => {
  if(!itemQuantity){
    alert('Please enter Item Quantity')
  }
  else if(!itemDes){
    alert('Please enter Item Description')
  }
  else if(!itemPrice){
    alert('Please enter item price')
  }else if(!duration){
    alert('Please enter Duration')
  }
  else if(!cusName){
    alert('Please enter Customer Name')
  }
  else if(!cusPhone){
    alert('Please enter Customer Phone number')
  }else if(!cusEmail){
    alert('Please enter customer email')
  }else{
    setLoading(true)
    const payload = {
      customer_phone_number: cusPhone,
      customer_email: cusEmail,
      customer_name: cusName,
      item_quantity: itemQuantity,
      description: itemDes,
      net_amount:itemPrice,
      duration: duration,
    }
    axios.post(API+'hire/hire-item/'+itemId, payload)
      .then(res => {
        setLoading(false)
        alert('Item created successfully')
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
      <Header title="HIRE ITEMS" subtitle="Hire an item" />
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
                <Form.Group className=" text-start mt-2" controlId="formBasicEmail">
                  <Form.Label>Item For Hire</Form.Label>
                  <Form.Control 
                    as="select"
                    required={true}
                    // value={userType}
                    onChange={handleChangeItemName}
                    arial-lable="Select Item to Hire"
                    >
                    <option value={1}>Select Item to hire</option>
                    {items?.map(item => {
                      return (<option key={item.id} value={JSON.stringify(item)}>{item.item_name} ~ Price: {item.item_price} </option> )
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start mt-2">
                    Quantity
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
                    Duration
                  </Form.Label>
                  <Form.Control required type="number" placeholder="Enter Customer phone number" value={duration} onChange={handleChangeDuration} />
                </Form.Group>
                <Form.Group className=" ">
                  <Form.Label className="text-start mt-2">
                    Total Price
                  </Form.Label>
                  <Form.Control disabled type="number" placeholder="Enter Customer Name" value={itemPrice} onChange={handleChangeItemPrice} />
                </Form.Group>
                <Form.Group className=" ">
                  <Form.Label className="text-start mt-2">
                    Item Description
                  </Form.Label>
                  <Form.Control required type="text" placeholder="Enter Customer Name" value={itemDes} onChange={handleChangeDes} />
                </Form.Group>
                <Form.Group className=" ">
                  <Form.Label className="text-start mt-2">
                    Customer Name
                  </Form.Label>
                  <Form.Control required type="text" placeholder="Enter Customer Name"  value={cusName} onChange={handleChangeCusName} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start mt-2" >
                    Customer Phone Number
                  </Form.Label>
                  <Form.Control required type="number" placeholder="Enter Customer phone number" value={cusPhone} onChange={handleChangeCusPhone} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start mt-2" >
                    Customer Email
                  </Form.Label>
                  <Form.Control  required type="text" placeholder="Enter Customer email" value={cusEmail} onChange={handleChangeCusEmail} />
                </Form.Group>
                
                  <Button variant="primary" onClick={hire} style={{padding:5, width:'50%', marginTop: 20}}>
                  {!loading ? (
                            <div>
                              Hire Item
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

export default HireItem;
