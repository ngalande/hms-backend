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
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { getDatabase, onValue, ref } from "firebase/database";
import { Bounce } from "react-activity";

import { useNavigate } from "react-router-dom";
import { API } from "../../../keys";
import axios from "axios";
import { useRef } from "react";



const BarAddStock = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [itemName, setItemName] = useState(null)
  const [itemQuantity, setitemQuantity] = useState(null)
  const [itemPrice, setItemPrice] = useState(null)
  const [itemSellingPrice, setItemSellingPrice] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const formRef = useRef(null);
  const handleReset = () => {
    formRef.current.reset()
    setItemName(null)
    setitemQuantity(null)
    setItemPrice(null)
    setitemQuantity(null)
    setItemSellingPrice(null)
  }
  const handleChangeItemName = (text) => {
    setItemName(text.target.value)
  }
  const handleChangeItemQuantity = (text) => {
    setitemQuantity(text.target.value)
  }
  const handleChangeItemPrice = (text) => {
    setItemPrice(text.target.value)
  }
  const handleChangeItemSellingPrice = (text) => {
    setItemSellingPrice(text.target.value)
  }


  useEffect(() => {
    console.log(user)
  }, [])
  const handleAddStock = () => {
    if(!itemName || !itemQuantity || !itemPrice || !itemSellingPrice){
      alert('Please ensure that all fields are filled')
    }else{
      setLoading(true)
      const payload = {
        item_name: itemName,
        item_quantity: itemQuantity,
        item_price: itemPrice,
        net_amount: itemSellingPrice,
        availabilty: 'InStock',
        status: 'Retail'
      }
      axios.post(API+'bar/create-stockitem', payload )
        .then(res => {
          setLoading(false)
          handleReset()
          alert('New Stock added successfully')
          console.log(res.data)
        }).catch(e => {
          console.log(e.response.data)
          setLoading(false)
          handleReset()
          alert('Failed to add new stock, might be because you tried to add stock with a name that already exists. Please try again')
        })

    }
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
 

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="ADD NEW STOCK" subtitle="Add New Stock in Bar" />
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
                            Item Name
                        </Form.Label>
                        <Form.Control  type="text" placeholder="Enter stock name" value={itemName} onChange={handleChangeItemName} />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label className="text-start mt-2">
                            Item Quantity
                        </Form.Label>
                        <Form.Control  type="number" placeholder="Enter Stock Quantity" value={itemQuantity} onChange={handleChangeItemQuantity} />
                    </Form.Group>
                    <Form.Group style={{marginTop: 10}} >
                        <Form.Label className="text-start">
                            Cost Price
                        </Form.Label>
                        <Form.Control  type="number" placeholder="Enter Stock Cost Price" value={itemPrice} onChange={handleChangeItemPrice} />
                    </Form.Group>
                    <Form.Group style={{marginTop: 10}} >
                        <Form.Label className="text-start">
                            Selling Price
                        </Form.Label>
                        <Form.Control  type="number" placeholder="Enter Stock Selling Price" value={itemSellingPrice} onChange={handleChangeItemSellingPrice} />
                    </Form.Group>
                    <Button disabled={loading} variant="primary" onClick={handleAddStock} style={{padding:5, width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                        {!loading ? (
                          <div>
                            Add Stock
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

export default BarAddStock;
