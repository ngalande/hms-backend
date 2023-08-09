import React, { useContext, useState, useEffect } from "react";
import { Box, Button as Btn, Grid, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import { Bounce } from "react-activity";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { getDatabase, onValue, ref } from "firebase/database";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import app from "../../../firebaseConfig";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";
import { useRef } from "react";

const db = getDatabase(app);


const BarSales = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [netPrice, setNetPrice] = useState(null)
  const [items, setItems] = useState(null)
  const [itemQuantity, setitemQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [itemName, setItemName] = useState(null)
  const [quantityCompare, setQuantityCompare] = useState(null);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const handleReset = () => {
    formRef.current.reset()
    setPrice(null)
    setNetPrice(null)
    setItemName(null)
    setitemQuantity(null)
  }

  useEffect(() => {
		axios.get(API+'bar/get-stockitems')
      .then(res => {
        let items = res.data
        let data = items.filter(i => i.item_quantity > 0)
        // let itemId = data.map(a => console.log(a.id))
        setItems(data)
      }).catch(e => {
        console.log(e)
      })
	}, []);

  const handleChangeItemName = (text) => {
    if(text.target.value != 1){ let jsonValue= JSON.parse(text.target.value)
      setPrice(jsonValue.net_amount)
      setQuantityCompare(jsonValue.item_quantity)
      console.log(jsonValue.net_amount)
      setItemName(jsonValue.id)
      if(itemQuantity){
        setNetPrice(itemQuantity*jsonValue.net_amount)
      }
    }else{
      setPrice(0)
      setNetPrice(0)
      setItemName(null)
    }
  }
  const handleChangeItemQuantity = (text) => {
    setitemQuantity(text.target.value)
    setNetPrice(price * text.target.value)
  }
  const handleChangeItemPrice = (text) => {
    setPrice(text.target.value)
  }

  const handleSale = () => {
    console.log(itemName)
    if(!itemQuantity){
      alert('Enter Item Qunatity')
    }else if(itemName == 1 || !itemName){
      alert('Select Item to purchase')
    }else if(itemQuantity > quantityCompare){
      alert('Item quantity exceeds the stock available')
    }else{
      setLoading(true)
      const payload = {
        item_quantity: itemQuantity,
        net_amount: netPrice
      }
      axios.post(API+'bar/purchase-item/'+itemName, payload )
        .then(res => {
          
          // console.log(res.data)
          axios.get(API+'bar/get-stockitems')
            .then(res => {
              let items = res.data
              let data = items.filter(i => i.item_quantity > 0)
              // let itemId = data.map(a => console.log(a.id))
              setItems(data)
            }).catch(e => {
              console.log(e)
            })
            setLoading(false)
          alert('Item purchased successfully')
        }).catch(e => {
          console.log(e)
          setLoading(false)
          alert('Failed to place order, Please try again')
        })
    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
 

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="POINT OF SALE " subtitle="Bar Sales" />
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
                    {items ? (
                      <Form ref={formRef}>
                      <Form.Group style={{marginTop: 10}} className="mb-3 text-start" controlId="formBasicEmail">
                          <Form.Label>Item Name</Form.Label>
                          <Form.Control 
                           
                          as="select"
                          // value={userType}
                          onChange={handleChangeItemName}
                          arial-lable="Select Item Name"
                          >
                          <option value={1}>Select Item Name</option>
                          {items?.map(item => {
                            return (<option key={item.id} value={JSON.stringify(item)}>{item.item_name} ~ Available: {item.item_quantity}</option> )
                          })}
                          </Form.Control>
  
                      </Form.Group>
                      
                      <Form.Group>
                          <Form.Label className="text-start">
                              Item Quantity
                          </Form.Label>
                          <Form.Control  type="number" placeholder="Enter Stock Quantity" value={itemQuantity} onChange={handleChangeItemQuantity} />
                      </Form.Group>
                      <Form.Group style={{marginTop: 10}} >
                          <Form.Label className="text-start">
                              Item Price
                          </Form.Label>
                          <Form.Control disabled={true} type="text" placeholder="Enter Stock Price" value={netPrice} />
                      </Form.Group>
                      <Button disabled={loading} variant="primary" onClick={handleSale} style={{padding:5, width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                          {!loading ? (
                            <div>
                              Purchase
                            </div>
                            ) : (
                                <Bounce />
                              )}
                          </Button>
                      </Form>
                    ):(
                      <p>No Items to purchase</p>
                    )}
                    
                </Card.Body>
                </Card>
                </Grid>
                </Grid>
      </Box>
    </Box>
  );
};

export default BarSales;
