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
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import StatBox from "../../../components/StatBox";
import app from "../../../firebaseConfig";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../components/shared/authContext";
import { useNavigate } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCookies } from "react-cookie";
import { API } from "../../../keys";
import axios from "axios";


const db = getDatabase(app);
const AdminReports = () => {
  const [userCount, setUserCount] = useState(null)
  const [reservations, setReservations] = useState(null)
  const [sellingPrice, setSellingPrice] = useState(null)
  const [notusers, setNotUsers] = useState({})
  const [avRooms, setAvRooms] = useState(null)
  const [rooms, setRooms] = useState(null)
  const [reRooms, setReRooms] = useState([])
  const [hiredItems, setHiredItems] = useState(null)
  const { logout } = useContext(AuthContext);
    
  const [totalHire, setTotalHire] = useState(null)
  const [barProfit, setbarProfit] = useState(null)
  const [resProfit, setresProfit] = useState(null)
  const [sellingBar, setSellingBar] = useState(null)
  const [sellingRes, setSellingRes] = useState(null)
  const [totalCostBar, setTotalCostBar] = useState(null)
  const [totalCostRes, setTotalCostRes] = useState(null)
  const [expenses, setExpenses] = useState(null)
  const [totalExp, setTotalExp] = useState(null)
  const [profitRes, setProfitRes] = useState(null)
  const [profitBar, setProfitBar] = useState(null)
  const [stock, setStock] = useState(null)
  const [ResStock, setResStock] = useState(null)
  const [sales, setSales] = useState([])
  const [ResSales, setResSales] = useState([])
  const [cookies, setCookies, removeCookie] = useCookies(["token", "user_role"]);

  const navigate = useNavigate();
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
    // { field: 'updatedAt', sortingOrder: 'desc', }
   
  ];

  const barColumns = [
    {
      field: "item_name",
      headerName: "Stock Name",
      flex:1
    },
    { field: "item_quantity", headerName: "Quantity Sold", flex:1 },
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
        return <span>{`K ${Number(params.row?.net_amount).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
    {
      field: "action", 
      headerName: "Gross Profit", 
      sortable: false, 
      flex: 1 ,
      // width: 300,
      disableClickEventBubbling: true,
      renderCell: (params) => {
          const netPrice = stock?.find(s => s.id == params.row?.item_id)
          return <span>{`K ${Number(params.row?.net_amount - netPrice?.item_price * params.row?.item_quantity).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

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

  const RestaurantColumns = [
    {
      field: "item_name",
      headerName: "Stock Name",
      flex:1
    },
    { field: "item_quantity", headerName: "Quantity Sold", flex:1 },
    { 
      field: "item_price", 
      headerName: "Cost of Sales", 
      flex:1,
      renderCell: (params) => {
        const netPrice = ResStock?.find(s => s.id == params.row?.item_id)
        return <span>{`K ${Number(netPrice?.item_price * params.row?.item_quantity).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
    { 
      field: "net_amount", 
      headerName: "Sales",flex:1,
      renderCell: (params) => {
        // const netPrice = stock?.find(s => s.id == params.row?.item_id)
        return <span>{`K ${Number(params.row?.net_amount).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
    {
      field: "action", 
      headerName: "Gross Profit", 
      sortable: false, 
      flex: 1 ,
      // width: 300,
      disableClickEventBubbling: true,
      renderCell: (params) => {
          const netPrice = ResStock?.find(s => s.id == params.row?.item_id)
          return <span>{`K ${Number(params.row?.net_amount - netPrice?.item_price * params.row?.item_quantity).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

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
  const hiredColumns = [
    { field: "item_name", headerName: "Item Name",flex:1 },
    { field: "item_quantity", headerName: "Item Qquantity",flex:1 },
    { field: "description", headerName: "Description",flex:1 },
    { field: "duration", headerName: "Duration",flex:1 },
    { field: "customer_name", headerName: "Customer Name",flex:1 },
    { field: "customer_phone_number", headerName: "Customer Phone",flex:1 },
    { field: "customer_email", headerName: "Customer Email",flex:1 },

    { 
      field: "net_amount", 
      headerName: "Total Price",
      flex:1,
      renderCell: (params) => {
        // const item = stock?.find(s => s.id == params.row?.item_id)
        return <span>{Number(params.row?.net_amount).toLocaleString(undefined, {maximumFractionDigits:2})}</span>

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

   
  ];
  const ExpColumns = [
    // { field: "id", headerName: "Id" },
    { field: "expense_name", headerName: "Expense Name",flex:1 },
    { field: "description", headerName: "Description",flex:1 },
    { 
      field: "amount", 
      headerName: "Expense Amount", 
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
    // console.log(sellingPrice + totalHire + profitBar + profitRes)
      if(!cookies.token){
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
		axios.get(API+'restaurant/get-stockitems')
      .then(res => {
        setResStock(res.data)
      }).catch(e => {
        console.log(e)
      })
	}, []);
  useEffect(() => {
		axios.get(API+'restaurant/get-purchaseditems')
      .then(res => {
        setResSales(res.data)
      }).catch(e => {
        console.log(e)
      })
	}, []);
  useEffect(() => {
		axios.get(API+'hotel/get-rooms')
      .then(res => {
        let allRooms = res.data
        let availableRooms = allRooms.filter(r => r.status === 'UNRESERVED')
        let reservedRooms = allRooms.filter(r => r.status === 'RESERVED' || r.status === 'BOOKED')
        setAvRooms(availableRooms)
        setRooms(allRooms)
        setReRooms(reservedRooms)
      }).catch(e => {
        console.log(e)
      })
	}, []);
  useEffect(() => {
		let totalSellingPriceBar = 0
    let totalCostPriceBar = 0
    let totalSellingPriceRes = 0
    let totalCostPriceRes = 0
    for(let i = 0; i< sales?.length; i++){
      totalSellingPriceBar += sales[i]?.net_amount
      totalCostPriceBar += sales[i]?.item_price * sales[i]?.item_quantity
    }
    for(let i = 0; i< ResSales?.length; i++){
      totalSellingPriceRes += ResSales[i]?.net_amount
      totalCostPriceRes += ResSales[i]?.item_price * ResSales[i]?.item_quantity
    }
    setSellingRes(totalSellingPriceBar)
    setTotalCostRes(totalCostPriceBar)

    setSellingRes(totalSellingPriceRes)
    setTotalCostRes(totalCostPriceRes)
    // setbarProfit
    setProfitBar(totalSellingPriceBar - totalCostPriceBar)
    setProfitRes(totalSellingPriceRes - totalCostPriceRes)
    // console.log(totalSellingPrice - totalCostPrice)
	}, [stock, sales]);

  useEffect(() => {
		axios.get(API+'hotel/get-allreservations')
      .then(res => {
        let allReservations = res.data
        setReservations(allReservations)
        let totalSellingPrice = 0
        for(let i = 0; i< res.data?.length; i++){
          if(res.data[i].paid_status == 'Paid'){
            totalSellingPrice += res.data[i].net_amount
            
          }
        }
        setSellingPrice(totalSellingPrice)
      }).catch(e => {
        console.log(e)
      })
	}, []);
  useEffect(() => {
		axios.get(API+'hire/get-allhireditems')
      .then(res => {
       setHiredItems(res.data)
       let totalAmount = res.data.map((i) => { 
        return i.net_amount
      })
      setTotalHire(totalAmount.reduce((a,b) => a+b, 0))
      }).catch(e => {
        console.log(e.response.data)
      })
	}, []);
  useEffect(() => {
		axios.get(API+'expenditure/get-allexpenditure')
      .then(res => {
        setExpenses(res.data)
        let data = 0
        let totalAmount = res.data.map((i) => { 
          return i.amount
        })
        setTotalExp(totalAmount.reduce((a,b) => a+b, 0))
      }).catch(e => {
        console.log(e.response.data)
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
        <Header title="REPORTS" subtitle="Hotel Reports" />

        
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
              title={`K ${sellingPrice ? Number(sellingPrice).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Total Accomodation Revenue"
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
              title={`K ${profitBar ? Number(profitBar).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Bar Total Profits"
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
            <StatBox
              title={`K ${profitRes ? Number(profitRes).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Restaurant Total Profits"
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
            <StatBox
              title={`K ${totalExp ? Number(totalExp).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Total Expenditure"
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
            <StatBox
              title={`K ${totalHire ? Number(totalHire).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}`}
              subtitle="Total Hire Amount"
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
            <StatBox
            
              title={`K ${Number(sellingPrice + totalHire + profitBar + profitRes).toLocaleString(undefined, {maximumFractionDigits:2})}`}
              subtitle="Gross Profit"
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
            <StatBox
              title={`K ${Number((sellingPrice + totalHire + profitBar + profitRes) - totalExp).toLocaleString(undefined, {maximumFractionDigits:2})}`}
              subtitle="Net Profit"
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

          <Box m="20px">
            
            </Box>
        
      </Grid>
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Accomodation Reports
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
                {reservations ? (

                  <DataGrid rows={reservations} columns={columns} />
                ):(
                  <DataGrid rows={notusers} columns={columns} />
                )}
              </Box>
            </Box>
                   {/* BAR REPORT */}
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Bar Profit and Loss Report
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
                {sales ? (

                  <DataGrid rows={sales} columns={barColumns} />
                ):(
                  <DataGrid rows={notusers} columns={barColumns} />
                )}
              </Box>
            </Box>
            {/* RESTAURANT REPORT */}
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Restaurant Profit and Loss Report
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

                  <DataGrid rows={ResSales} columns={RestaurantColumns} />
                ):(
                  <DataGrid rows={notusers} columns={RestaurantColumns} />
                )}
              </Box>
            </Box>
            {/* HIRED REPORT */}
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Hired Items Report
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
        {hiredItems ? (

          <DataGrid 
            rows={hiredItems} 
            columns={hiredColumns} 
            initialState={{
              sorting:{
                sortModel:[{ field: 'updatedAt', sort: 'asc'}]
              }
            }}
            />
        ):(
          <DataGrid rows={notusers} columns={hiredColumns} />
        )}
      </Box>
      </Box>
      {/* EXPENSES REPORT */}
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Expenses Report
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
        {expenses ? (

          <DataGrid 
            rows={expenses} 
            columns={ExpColumns} 
            
            />
        ):(
          <DataGrid rows={notusers} columns={ExpColumns} />
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default AdminReports;
