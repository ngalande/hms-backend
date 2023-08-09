import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../../theme";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import AutoDelete from "@mui/icons-material/AutoDelete";
import HotelIcon from '@mui/icons-material/Hotel';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LuggageIcon from '@mui/icons-material/Luggage';
import ArticleIcon from '@mui/icons-material/Article';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import Geocode from "react-geocode";
import StatBox from "../../../components/StatBox";
import app from "../../../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../components/shared/authContext";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCookies } from "react-cookie";
import axios from "axios";
import { API } from "../../../keys";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(null)
  const [users, setUsers] = useState(null)
  const [notusers, setNotUsers] = useState({})
  const [transactionCount, setTransactionCount] = useState(null)
  const [avRooms, setAvRooms] = useState(null)
  const [rooms, setRooms] = useState(null)
  const [reRooms, setReRooms] = useState(null)
  const [bookedRooms, setBookedRooms] = useState(null)
  const [totalBalances, setTotlaBalances] = useState('')
  const [revenue, setRevenue] = useState('')
  const [Data, setData] = useState([]);
  const [addr, setAddr] = useState([])
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const [cookies, setCookies, removeCookie] = useCookies(["token", "user_role"]);

  const status ={
    state:{
      full: 'Full',
      empty: 'Empty',
      half: 'Partly Filled'
    },
    
  }
  const columns = [
    // { field: "id", headerName: "Id" },
    {
      field: "name",
      headerName: "Room Name",
     flex:1,
      cellClassName: "name-column--cell",
      // renderCell : (params) => {
      //   const currentRow = params.row;
      //   return currentRow.btp + '%'
      // }
    },
    // { field: "lat", headerName: "Location",flex:1 },
    { field: "room_type", headerName: "Room Type",flex:1 },
    { field: "number", headerName: "Room Number",flex:1,
    },
    { field: "status", headerName: "Room Status",flex:1 },
    { field: "capacity", headerName: "Room Capacity",flex:1 },
    { 
      field: "amount", 
      headerName: "Amount", 
     flex:1,
      renderCell: (params) => {
        return <span>{Number(params.row?.amount).toLocaleString(undefined, {maximumFractionDigits:2})}</span>
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
    
  ];
  

  useEffect(()=>{
    // console.log(avRooms)
      if(!cookies){
        logout()
        navigate('/login')
        // console.log(user.email)
      }else if(cookies.user_role){
        if(cookies.user_role !== 'ADMIN'){
          logout()
          navigate('/login')
        }
      }


  },[])


  useEffect(() => {
		axios.get(API+'hotel/get-rooms')
      .then(res => {
        console.log(res.data)
        let allRooms = res.data
        let availableRooms = allRooms.filter(r => r.status === 'UNRESERVED')
        let bookedRooms = allRooms.filter(r => r.status === 'BOOKED')
        let reservedRooms = allRooms.filter(r => r.status === 'RESERVED')
        setAvRooms(availableRooms)
        setRooms(allRooms)
        setReRooms(reservedRooms)
        setBookedRooms(bookedRooms)
      }).catch(e => {
        console.log(e)
      })
	}, []);



 








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
        <Header title="DASHBOARD" subtitle="Welcome to Hotel Management System Admin Dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={avRooms ? avRooms?.length : 0}
              subtitle="Available Rooms"
              progress={50/100}
              // increase="+21%"
              icon={
                <HotelIcon
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
            <StatBox
              title={ bookedRooms ? bookedRooms?.length : 0}
              subtitle="Booked Rooms"
              // progress={50/100}
              // increase="+5%"
              icon={
                <BedroomParentIcon
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
            <StatBox
              title={ reRooms ? reRooms?.length : 0}
              subtitle="Reserved Rooms"
              // progress={50/100}
              // increase="+5%"
              icon={
                <BedroomParentIcon
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

        {/* <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        > */}
         
          {/* <Grid xs={12} sm={12} md={6}> */}
          <Box m="20px">
            
            </Box>
          {/* </Grid> */}
          
          
        {/* </Grid> */}
        
      </Grid>
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                All Rooms
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
                {/* {users ? (

                  <DataGrid rows={users} columns={columns} />
                ):(
                  <></>
                )} */}
                {rooms ? (

                  <DataGrid rows={rooms} columns={columns} />
                ):(
                  <DataGrid rows={notusers} columns={columns} />
                )}
              </Box>
            </Box>
    </Box>
  );
};

export default AdminDashboard;
