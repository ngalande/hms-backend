import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import StatBox from "../../../components/StatBox";
import { BedroomBabyOutlined, Hotel } from "@mui/icons-material";

const db = getDatabase(app);


const Reports = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [anaData, setAnaData] = useState(null)
  const [bookings, setBookings] = useState(null)
  const [sellingPrice, setSellingPrice] = useState(null)
  const [costPrice, setCostPrice] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [myStatus, setMyStatus] = useState(null);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    // setOpen(true);
    // setScroll(scrollType);
    const jsonValue = JSON.parse(data)
    // navigate('chart', {state:jsonValue})
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
		axios.get(API+'hotel/get-allreservations')
      .then(res => {
        let totalCostPrice = 0
        let totalSellingPrice = 0
        for(let i = 0; i< res.data.length; i++){
          if(res.data[i].paid_status == 'Paid'){

            totalCostPrice += res.data[i].amount
          }
        }
        for(let i = 0; i< res.data.length; i++){
          if(res.data[i].paid_status == 'Paid'){
            totalSellingPrice += res.data[i].net_amount
            
          }
        }
        setCostPrice(totalCostPrice)
        setSellingPrice(totalSellingPrice)
        // console.log(sellingPrice)
        setBookings(res.data)
      }).catch(e => {
        console.log(e.response.data)
      })
	}, []);





  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "Id" },
    { field: "room_type", headerName: "Room Type",flex:1 },
    { field: "customer_name", headerName: "Customer Name",flex:1 },
    { field: "duration", headerName: "Duration",flex:1 },
    { field: "paid_status", headerName: "Paid Status",flex:1 },
    { 
      field: "status", 
      headerName: "Status",
      flex:1 ,
      renderCell: (params) => {
        let text = ''
        // if(params.row.paid_status == 'Paid'  && params.row.status == 'UNRESERVED'){
        //   return 'CHECKED OUT';
        // }else if(params.row.paid_status == 'Paid'  && params.row.status == 'BOOKED'){
        //   return 'BOOKED';
        // }else if(params.row.cancelled_status == 'Valid'){
        //   console.log(params.row.paid_status)
        //   return 'RESERVED';
        // }else{
        //   return 'UNRESERVED'
        // }

        return <span>{params.row.paid_status == 'Paid'  && params.row.status == 'UNRESERVED' ? ('CHECKED OUT') : (params.row.paid_status == 'Paid' && params.row.status == 'BOOKED'? 'BOOKED': (params.row.paid_status == 'NotPaid' && params.row.status =='RESERVED' ? 'RESERVED' : 'UNRESERVED'))}</span>
      }
    },
    { 
      field: "cancelled_status", 
      headerName: "Cancellation",
      flex:1,
      renderCell: (param) => {
        return <span>{param.row?.cancelled_status == 'NotCancelled' ? 'Valid' : 'Cancelled'} </span>
      }
    },

    { 
      field: "net_amount", 
      headerName: "Total Revenue",
      flex:1,
      renderCell: (params) => {
        // const item = stock?.find(s => s.id == params.row?.item_id)
        return <span>{`K ${Number(params.row?.net_amount).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>
        // return <span>{Number(params.row?.amount).toLocaleString(undefined, {maximumFractionDigits:2})}</span>

      } 
    },
    // { field: 'updatedAt', sortingOrder: 'desc', }
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
        <Header title="REPORTS" subtitle="Reception reports" />

        
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
            <StatBox
              title={`K ${sellingPrice ? Number(sellingPrice).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Total Revenue"
              progress="0.50"
              // increase="+21%"
              icon={
                <CurrencyExchange
                  sx={{ color: colors.greenAccent[600], fontSize: "46px" }}

                />
              }
            />
          </Box>
        </Grid>
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
                All Reservations and Bookings
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
        {bookings ? (

          <DataGrid 
            rows={bookings} 
            columns={columns} 
            initialState={{
              sorting:{
                sortModel:[{ field: 'updatedAt', sort: 'asc'}]
              }
            }}
            />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default Reports;
