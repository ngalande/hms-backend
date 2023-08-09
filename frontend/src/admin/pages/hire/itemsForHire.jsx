import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Card, Form, Button as Btn } from "react-bootstrap";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import BarChart from "../../../components/growthRate";
import LineChart from "../../../components/lineChart";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import StatBox from "../../../components/StatBox";
import { BedroomBabyOutlined, Hotel } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { Bounce } from "react-activity";


const ItemsForHire = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [items, setItems] = useState(null)
  const [bookings, setBookings] = useState(null)
  const [sellingPrice, setSellingPrice] = useState(null)
  const [costPrice, setCostPrice] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [reservationType, setReservationType] = useState(null)
  const [bookType, setBookType] = useState(null)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    setOpen(true);
    const jsonValue = JSON.parse(data)
    setData(jsonValue)
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
        console.log(e.response.data)
      })
	}, []);


    const handleChangeReservation = (text) => {
        setReservationType(text.target.value)
      }


  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "Id" },
    { field: "item_name", headerName: "Item Name",flex:1 },
    { field: "item_quantity", headerName: "Item Quantity",flex:1 },
    { 
      field: "item_price", 
      headerName: "Item Price",
      flex:1, 
      renderCell: (params) => {
        // const item = stock?.find(s => s.id == params.row?.item_id)
        return <span>{Number(params.row?.item_price).toLocaleString(undefined, {maximumFractionDigits:2})}</span>

        // return <p>{`K ${params.row?.net_amount}`}</p>
      } 
    },
    { 
      field: "createdAt", 
      headerName: "Date",
      flex:1,
      renderCell: (params) => {
        let newString = String(params.row.createdAt)
        // const item = reservedRooms?.find(s => s.room_id == params.row?.id)
        return <span>{newString.substring(0, newString.indexOf('T'))}</span>
      } 
    },
    // {
    //     field: "action", 
    //     headerName: "Action", 
    //     sortable: false, 
    //     flex: 1 ,
    //     disableClickEventBubbling: true,
    //     renderCell: (params) => {
    //         const onClick = (e) => {
    //           // setVisble(true)
    //           // e.stopPropagation(); // don't select this row after clicking
    //           const currentRow = params.row;
    //           // console.log(visible)
    //           return JSON.stringify(currentRow, null, 4);
  
    //         };
    //         return <Button onClick={handleClickOpen('paper', onClick())}><EditIcon style={{color:'#fff'}} /></Button>
    //       }
    // },
   
  ];

 

  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="ITEMS FOR HIRE" subtitle="Manage Items for Hire" />
        <Box>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            // fullWidth ={true}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title" style={{fontSize: 20}}>Edit Booking</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <Card className="shadow" style={{backgroundColor: colors.primary[400], width: '60vh'}}>
                  <Card.Body>
                  <Form.Group>
                        <Form.Label className="text-start mt-2">
                            Reservation Type
                        </Form.Label>
                        <Form.Control 
                         
                        as="select"
                        required={true}
                        // value={userType}
                        onChange={handleChangeReservation}
                        arial-lable="Select Reservation Type"
                        >
                        <option value={1}>Select Room Type</option>
                        <option value={bookType ? bookType[0] : ''}>{bookType ? bookType[0] : ''}</option> 
                        <option value={bookType ? bookType[1] : ''}>{bookType ? bookType[1] : ''}</option> 
                        </Form.Control>
                      </Form.Group>
                    <Btn disabled={loading}  variant="primary" color="blue" style={{padding:5, color: '#fff', backgroundColor: 'blue', width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                      {!loading ? (
                        <>
                          Update
                        </>
                      ) : (
                        <Bounce />
                      )}
                    </Btn>
                  </Card.Body>
                </Card>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="primary" style={{padding:5, width:'20%'}}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
        
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        
        
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
           
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
         
          <Grid xs={12} sm={12} md={6}>
          <Box m="20px">
            
            </Box>
          </Grid>
          
          
        </Grid>
      </Grid>
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Items Available for Hire
              </Typography>
              <Box
                m="8px 0 0 0"
                height="80vh"
                width='100%'
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
        {items ? (

          <DataGrid 
            rows={items} 
            columns={columns} 
            />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default ItemsForHire;
