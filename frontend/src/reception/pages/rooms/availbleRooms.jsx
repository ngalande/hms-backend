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



const AvailableRooms = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [anaData, setAnaData] = useState(null)
  const [enquiries, setEnquiries] = useState(null)
  const [subject, setSubject] = useState(null)
  const [message, setMessage] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const [avRooms, setAvRooms] = useState(null)
  const [rooms, setRooms] = useState(null)
  const [reRooms, setReRooms] = useState(null)
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    // setOpen(true);
    // setScroll(scrollType);
    const jsonValue = JSON.parse(data)
    navigate('chart', {state:jsonValue})
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
		axios.get(API+'hotel/get-rooms')
      .then(res => {
        let allRooms = res.data
        let availableRooms = allRooms.filter(r => r.status === 'UNRESERVED')
        let reservedRooms = allRooms.filter(r => r.status === 'RESERVED')
        setAvRooms(availableRooms)
        setRooms(allRooms)
        setReRooms(reservedRooms)
      }).catch(e => {
        console.log(e)
      })
	}, []);




  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
  
 

  return (
    <Box m="20px">
      <Header title="AVAILABLE ROOMS" subtitle="Available Rooms in Hotel" />
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Available Rooms
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
               


        {avRooms ? (

          <DataGrid rows={avRooms} columns={columns} />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
    </Box>
  );
};


export default AvailableRooms;
