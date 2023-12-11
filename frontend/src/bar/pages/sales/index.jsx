import React, { useContext, useState, useEffect } from "react";
import { Box, Button as Btn, Grid, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { getDatabase, onValue, ref } from "firebase/database";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { Bounce } from "react-activity";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import { API } from "../../../keys";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBRow,
  MDBTooltip,
  MDBTypography,
  MDBTable, MDBTableBody, MDBTableHead 
  } from "mdb-react-ui-kit";
  import Modal from '@mui/material/Modal';
  import CloseIcon from '@mui/icons-material/Close';
  import { useReactToPrint } from 'react-to-print';


const BarSales = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(null)
  const [itemQuantity, setitemQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [itemId, setItemId] = useState(null)
  const [quantityCompare, setQuantityCompare] = useState(null);
  const [netPrice, setNetPrice] = useState(null)
  const [itemName, setItemName] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openRec, setOpenRec] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseRec = () => setOpenRec(false);
  const formRef = useRef(null);
  const handleReset = () => {
    formRef.current.reset()
    setPrice(null)
    setNetPrice(null)
    setItemId(null)
    setitemQuantity(null)
  }
  useEffect(() => {
		axios.get(API+'bar/get-stockitems')
      .then(res => {
        let data = res.data
        // let itemId = data.map(a => console.log(a.id))
        setItems(res.data)
      }).catch(e => {
        console.log(e)
      })
	}, []);

  useEffect(() => {
    const totalNetAmount = cartItems.reduce((total, item) => total + item.net_amount, 0);
    setTotal(totalNetAmount)
  }, [cartItems])
  

  const handleChangeItemName = (text) => {
    if(text.target.value != 1){ let jsonValue= JSON.parse(text.target.value)
      setPrice(jsonValue.net_amount)
      setQuantityCompare(jsonValue.item_quantity)
      console.log(jsonValue.net_amount)
      setItemId(jsonValue.id)
      setItemName(jsonValue.item_name)
      if(itemQuantity){
        setNetPrice(itemQuantity*jsonValue.net_amount)
      }
      
    }else{
      setPrice(0)
      setNetPrice(0)
      setItemId(null)
    }
  }
  const handleChangeItemQuantity = (text) => {
    setitemQuantity(text.target.value)
    setNetPrice(price * text.target.value)
  }

  const handleAddToCart = () => {
    if(itemQuantity > quantityCompare){
      alert('Item is out of stock')
    }else{
      const item = {
        item_quantity: itemQuantity,
        net_amount: netPrice,
        item_id: itemId,
        item_name: itemName
      }
      setCartItems(prevValues => [...prevValues, item]);

    }
    // axios.get(API+'bar/get-stockitems')
    //   .then(res => {
    //     let data = res.data
    //     // let itemId = data.map(a => console.log(a.id))
    //     setItems(res.data)
    //   }).catch(e => {
    //     console.log(e)
    //   })
    handleReset()
  }

  const handleOpenCart = () => {
    setOpen(true);
    // const handleClose = () => setOpen(false);
  }

  const handleRemove = (itemId) =>{
    const updatedCartItems = cartItems.filter(item => item.item_id !== itemId);

    // Update the state with the new array
    setCartItems(updatedCartItems);
  }


  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  
  const handleSale = (event) => {
    // console.log(itemId)
    if(cartItems.length <= 0){
      alert('Cart is empty. Add items to cart first')
    // }
    // else if(itemQuantity > quantityCompare){
    //   alert('Error!! The selected quantity is more than what is available in stock')
    }else{
      // if(!itemId || itemId == 1){
      //   alert('Select an item to purchase')
      // }else{
        // console.log(cartItems)
        // const payload = {
          //   item_quantity: itemQuantity,
          //   net_amount: netPrice
          // }
          setLoading(true)
        axios.post(API+'bar/purchase-item/', cartItems )
          .then(res => {
            setLoading(false)
            axios.get(API+'bar/get-stockitems')
              .then(res => {
                let data = res.data
                // let itemId = data.map(a => console.log(a.id))
                setItems(res.data)
              }).catch(e => {
                console.log(e)
              })
              // handleReset()
              handleClose()
              setOpenRec(true)
              // setCartItems([])
              // console.log(res.data)
            alert('Item purchased successfully')
            console.log(res.data)
          }).catch(e => {
            console.log(e)
            setLoading(false)
            alert('Failed to place order, Please try again')
          })
      // }
    }
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  return (
    <Box m="20px" >
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
                  <div onClick={handleOpenCart} style={{justifyContent:'right', alignItems:'center', display:'flex', cursor:'pointer'}}>
                  <ShoppingBagIcon style={{width:30, height:30}} />
                  <div style={{ position:'relative', top:-10, left:-6, backgroundColor:'#0373fc', borderRadius:10, width: 18, justifyContent:'center', alignItems:'center', display:'flex', fontWeight:'bold', fontSize:16}}>{cartItems.length}</div>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <section className=" w-100 gradient-custom">
                    <MDBContainer className="py-5 ">
                      <MDBRow className="justify-content-center my-4">
                        
                        <MDBCol md="4">
                          <MDBCard className="mb-4">
                            <MDBCardHeader>
                              <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                              <MDBTypography tag="h5" className="mb-0 text-black ">
                                Summary
                              </MDBTypography>
                              <div onClick={handleClose} style={{cursor:'pointer'}}>
                                <CloseIcon style={{color: '#000'}} />
                              </div>

                              </div>
                            </MDBCardHeader>
                            <MDBCardBody>
                              <MDBListGroup flush>
                              <MDBListGroupItem
                                  className="d-flex justify-content-between align-items-center border-0 px-0 pb-0 text-dark fw-bold ">
                                  Product
                                  <span>Quantity</span>
                                  <span>Amount</span>
                                  <span>Remove</span>
                                </MDBListGroupItem>
                                {cartItems?.map(item => {
                                  return (<MDBListGroupItem
                                    className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    
                                    <span>{item.item_name}</span>
                                    <span>{item.item_quantity}</span>
                                    <span>K{item.net_amount}</span>
                                    <div onClick={() => handleRemove(item.item_id)} style={{cursor:'pointer'}}>
                                      <DeleteForeverIcon style={{color: '#000'}} />
                                    </div>
                                  </MDBListGroupItem> )
                                })}
                                
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center  border-bottom border-start-0 border-end-0 px-0">
                                 
                                </MDBListGroupItem>
                                <MDBListGroupItem
                                  className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                  <div>
                                    <strong>Total amount</strong>
                                    <strong>
                                      <p className="mb-0">(including VAT)</p>
                                    </strong>
                                  </div>
                                  <span>
                                    <strong>K{total}</strong>
                                  </span>
                                </MDBListGroupItem>
                              </MDBListGroup>
                              <Button disabled={loading} variant="primary" onClick={handleSale} style={{padding:5, marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                              {!loading ? (
                                <div style={{display:'flex', flexDirection:'row', }}>
                                    <AttachMoneyIcon />
                                    <div style={{marginLeft:0.5}}>
                                      Sale
                                    </div>

                                </div>
                                ) : (
                                    <Bounce />
                                  )}
                                  </Button>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </section>
                </Modal>
               
                  
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
                     <Button disabled={loading} variant="primary" onClick={handleAddToCart} style={{padding:5, width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                         
                          <div style={{display:'flex', flexDirection:'row', }}>
                              <AddShoppingCartIcon />
                              <div style={{marginLeft:0.5}}>
                                Add to cart
                              </div>

                          </div>
                           
                         </Button>
                     </Form>
                  ):(
                    <p>No Items to purchase</p>
                  )}
                    
                </Card.Body>

                <Modal
                  open={openRec}
                  onClose={handleCloseRec}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <section ref={componentRef} style={{
                    // width:'50%', 
                    display:'flex', 
                    justifyContent:'center', 
                    alignItems:'center',
                    // height:'100vh',
                    }}>
                    <MDBContainer className="py-5 ">
                      <MDBRow className="justify-content-center my-4">
                        
                        <MDBCol md="4">
                          <MDBCard className="mb-4">
                            <MDBCardHeader>
                              <div style={{flexDirection:'row', display:'flex', justifyContent:'space-between'}}>
                              <MDBTypography tag="h5" className="mb-0 text-black ">
                                INVOICE
                              </MDBTypography>
                              <div onClick={handleCloseRec} style={{cursor:'pointer'}}>
                                <CloseIcon style={{color: '#000'}} />
                              </div>

                              </div>
                            </MDBCardHeader>
                            <MDBCardBody>
                              <MDBListGroup flush>
                              <MDBListGroupItem
                                  className="d-flex  flex-column border-0 px-0 pb-0 text-dark fw-bold ">
                                  <span>Invoice Number:</span>
                                  <span>Cashier:</span>
                                  <span>Customer:</span>
                                </MDBListGroupItem>
                              <MDBTable>
                                <MDBTableHead>
                                  <tr>
                                    <th className="border-0">ITEM</th>
                                    <th className="border-0">QTY</th>
                                    {/* <th className="border-0">PRICE</th> */}
                                    <th className="border-0">TOTAL</th>
                                  </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                  {cartItems.map((item, index) => (
                                    <tr key={index}>
                                      <td className="border-0">{item.item_name}</td>
                                      <td className="border-0">{item.item_quantity}</td>
                                      {/* <td className="border-0">K{item.item_price}</td> */}
                                      <td className="border-0">K{item.net_amount}</td>
                                    </tr>
                                  ))}
                                </MDBTableBody>
                              </MDBTable>
                                <MDBListGroupItem
                                  className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                  <div>
                                    <strong>Total amount</strong>
                                    <strong>
                                      <p className="mb-0">(including VAT)</p>
                                    </strong>
                                  </div>
                                  <span>
                                    <strong>K{total}</strong>
                                  </span>
                                </MDBListGroupItem>
                              </MDBListGroup>
                              <Button disabled={loading} variant="primary" onClick={handlePrint} style={{padding:5, marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                              {/* {!loading ? ( */}
                                <div style={{display:'flex', flexDirection:'row', }}>
                                    {/* <AttachMoneyIcon /> */}
                                    <div style={{marginLeft:0.5}}>
                                      Print Receipt
                                    </div>

                                </div>
                                {/* ) : (
                                    <Bounce />
                                  )} */}
                                  </Button>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </section>
                </Modal>
                </Card>

                </Grid>
                </Grid>
      </Box>
    </Box>
  );
};

export default BarSales;
