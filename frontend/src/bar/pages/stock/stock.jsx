import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
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
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";




const BarStock = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [stock, setStock] = useState(null)
  const [enquiries, setEnquiries] = useState(null)
  const [subject, setSubject] = useState(null)
  const [message, setMessage] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
		axios.get(API+'bar/get-stockitems')
      .then(res => {
        console.log(res.data)
        setStock(res.data)
      }).catch(e => {
        console.log(e.response.data)
      })
	}, []);


  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "Id" },
    { field: "item_name", headerName: "Stock Name",flex:1 },
    { 
      field: "item_price", 
      headerName: "Cost of Sales", 
      flex:1,
      renderCell: (params) => {
        return <span>{`K ${Number(params.row?.item_price).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
     { 
      field: "net_amount", 
      headerName: "Sales",flex:1,
      renderCell: (params) => {
        return <span>{`K ${Number(params.row?.net_amount).toLocaleString(undefined, {maximumFractionDigits:2})}`}</span>

      }
    },
    { field: "item_quantity", headerName: "Quantity",flex:1 },
    { field: "availabilty", headerName: "Availability",flex:1 },
    { field: "status", headerName: "Status",flex:1 },
    { 
      field: "createdAt", 
      headerName: "Created At",
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
      <Header title="STOCK" subtitle="Manage Stock in Bar" />
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
        {/* {enquiries ? (

          <DataGrid rows={enquiries} columns={columns} />
        ):(
          <></>
        )} */}
        {stock ? (

          <DataGrid rows={stock} columns={columns} />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default BarStock;
