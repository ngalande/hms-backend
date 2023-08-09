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
import Chart from "./chart";
import { useNavigate } from "react-router-dom";

const db = getDatabase(app);


const Analysis = () => {
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
		const query = ref(db, '/esp-data');
		//getData()
		return onValue(query, async(snapshot) => {
			const data =  (await snapshot.val()) ?? [];

			if (snapshot.exists()) {
				//getTemp(data.temp)
        //const SData = Object.entries(data)
        console.log(data)
        // console.log(isLoaded)
				setData(data)
        
        //console.log('Data: ',Data)
		
			}else{
        console.log('error')
      }
     

		});
	}, []);



  const SData = Object.entries(Data)
  const aData = [];
  SData.forEach(([key, value]) => {
    //console.log(key); // 'one'
    // 1
    aData.push(value);
    // console.log(aData)
  });


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "btp", headerName: "Battery Percentage", width: 200 },
    { field: "trueDepth", headerName: "Fill-Level", width: 200 },

    {
        field: "action", 
        headerName: "Action", 
        width: 200, 
        sortable: false, 
        disableClickEventBubbling: true,
        renderCell: (params) => {
            const onClick = (e) => {
              // setVisble(true)
              // e.stopPropagation(); // don't select this row after clicking
              const currentRow = params.row;
              // console.log(visible)
              return JSON.stringify(currentRow, null, 4);

            };
            return <Button onClick={handleClickOpen('paper', onClick())}><BarChartOutlinedIcon style={{color:'#fff'}} /></Button>
          }
    },
  ];

 

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="ANALYTICS" subtitle="Smart Bin Volume" />
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
        {aData ? (

          <DataGrid rows={aData} columns={columns} />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Analysis;
