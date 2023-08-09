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
import LuggageIcon from '@mui/icons-material/Luggage';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import ArticleIcon from '@mui/icons-material/Article';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { DataGrid } from "@mui/x-data-grid";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import InventoryIcon from '@mui/icons-material/Inventory';
import Header from "../../../components/Header";
import Geocode from "react-geocode";
import StatBox from "../../../components/StatBox";
import app from "../../../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../components/shared/authContext";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCookies } from "react-cookie";
import { API } from "../../../keys";
import axios from "axios";

const BarDashboard = () => {
  const [userCount, setUserCount] = useState(null)
  const [users, setUsers] = useState(null)
  const [notusers, setNotUsers] = useState({})
  const [profit, setProfit] = useState(null)
  const [sales, setSales] = useState(null)
  const [selling, setSelling] = useState(null)
  const [totalCost, setTotalCost] = useState(null)
  const [stock, setStock] = useState('')
  const [revenue, setRevenue] = useState('')
  const [Data, setData] = useState([]);
  const [addr, setAddr] = useState([])
  const { logout } = useContext(AuthContext);
  const [cookies, setCookies, removeCookie] = useCookies(["token", "user_role"]);

  const navigate = useNavigate();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);

  const columns = [
    // { field: "id", headerName: "Id" },
    {
      field: "item_name",
      headerName: "Stock Name",
      flex:1,
      cellClassName: "name-column--cell"
    },
    // { field: "lat", headerName: "Location",flex:1 },
    { field: "item_quantity", headerName: "Quantity Sold",flex:1 },
    { 
      field: "item_price", 
      headerName: "Cost of Sales", 
      flex:1,
      renderCell: (params) => {
        const netPrice = stock?.find(s => s.id == params.row?.item_id)
        return <span>{`K ${Number(netPrice?.item_price * params.row?.item_quantity).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
    { 
      field: "net_amount", 
      headerName: "Sales",flex:1,
      renderCell: (params) => {
        const netPrice = stock?.find(s => s.id == params.row?.item_id)
        return <span>{`K ${Number(netPrice?.net_amount).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
    {
      field: "action", 
      headerName: "Gross Profit", 
      sortable: false, 
      flex: 1 ,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        if(stock){
          const netPrice = stock?.find(s => s.id == params.row?.item_id)
          // setProfit()
          // console.log(netPrice?.item_price * params.row?.item_quantity)
        return <span>{`K ${Number(params.row?.net_amount - netPrice?.item_price * params.row?.item_quantity).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>


        }else{
          return <p></p>
        }
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
    // console.log(cookies.token)
      if(!cookies.token){
        logout()
        navigate('/login')
        // console.log(user.email)
      }else if(cookies.user_role){
        if(cookies.user_role !== 'BARATTENDANT'){
          logout()
          navigate('/login')
        }
      }


  },[])

  useEffect(() => {
		axios.get(API+'bar/get-purchaseditems')
      .then(res => {
        setSales(res.data)
        

      }).catch(e => {
        console.log(e)
      })
	}, []);

  useEffect(() => {
		axios.get(API+'bar/get-stockitems')
      .then(res => {
        setStock(res.data)
      }).catch(e => {
        console.log(e)
      })
	}, []);

  useEffect(() => {
		let totalSellingPrice = 0
    let totalCostPrice = 0
    for(let i = 0; i< sales?.length; i++){
      totalSellingPrice += sales[i]?.net_amount
      totalCostPrice += sales[i]?.item_price * sales[i]?.item_quantity
    }
    setTotalCost(totalCostPrice)
    setSelling(totalSellingPrice)
    setProfit(totalSellingPrice - totalCostPrice)
    // console.log(totalSellingPrice - totalCostPrice)
	}, [stock, sales]);


 



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
        <Header title="DASHBOARD" subtitle="Welcome to Hotel Management Bar Dashboard" />
 
        
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
               title={`K ${selling ? Number(selling).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
               subtitle="Total Sales"
              progress={50/100}
              // increase="+21%"
              icon={
                <PointOfSaleIcon
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
              title={`K ${totalCost ? Number(totalCost).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Cost of Sales"
              // progress={50/100}
              // increase="+5%"
              icon={
                <InventoryIcon
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
              title={`K ${Number(profit).toLocaleString(undefined, {maximumFractionDigits:2})}`}
              subtitle="Total Gross Profit"
              progress="0.50"
              // increase="+21%"
              icon={
                <CurrencyExchangeIcon
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
                Sales
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
                {sales ? (

                  <DataGrid rows={sales} columns={columns} />
                ):(
                  <DataGrid rows={notusers} columns={columns} />
                )}
              </Box>
            </Box>
    </Box>
  );
};

export default BarDashboard;
