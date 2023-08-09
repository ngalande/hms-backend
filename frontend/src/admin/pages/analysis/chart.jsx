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
import { useLocation } from "react-router-dom";
import { mockLineData2Weeks, mockLineData3Days, mockLineData4Weeks, mockLineData7Days } from "../../../data/mockData";

const db = getDatabase(app);


const Chart = () => {
  const [Data, setData] = useState([])
  const [anaData, setAnaData] = useState(null)
  const [enquiries, setEnquiries] = useState(null)

  const [chartData, setChartData] = useState(mockLineData7Days)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation()
  

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
    console.log(location)
		const query = ref(db, '/esp-data');
		//getData()
		return onValue(query, async(snapshot) => {
			const data =  (await snapshot.val()) ?? [];

			if (snapshot.exists()) {
				//getTemp(data.temp)
        //const SData = Object.entries(data)
        // console.log(data)
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
  const [selectColorbtn1, setSelectColorbtn1] = useState(colors.greenAccent[400])
  const [selectColorbtn2, setSelectColorbtn2] = useState(colors.greenAccent[400])
  const [selectColorbtn3, setSelectColorbtn3] = useState(colors.greenAccent[400])
  const [selectColorbtn4, setSelectColorbtn4] = useState(colors.greenAccent[400])
  const [init, setInit] = useState(true)
    function handleButton1(params) {
        setChartData(mockLineData3Days)
        setInit(false)
        setSelectColorbtn1(colors.blueAccent[400])
        setSelectColorbtn2(colors.greenAccent[400])
        setSelectColorbtn3(colors.greenAccent[400])
        setSelectColorbtn4(colors.greenAccent[400])
    }
    function handleButton2(params) {
        setChartData(mockLineData7Days)
        setSelectColorbtn1(colors.greenAccent[400])
        setSelectColorbtn2(colors.blueAccent[400])
        setSelectColorbtn3(colors.greenAccent[400])
        setSelectColorbtn4(colors.greenAccent[400])
    }
    function handleButton3(params) {
        setChartData(mockLineData2Weeks)
        setInit(false)
        setSelectColorbtn1(colors.greenAccent[400])
        setSelectColorbtn2(colors.greenAccent[400])
        setSelectColorbtn3(colors.blueAccent[400])
        setSelectColorbtn4(colors.greenAccent[400])
    }
    function handleButton4(params) {
        setChartData(mockLineData4Weeks)
        setInit(false)
        setSelectColorbtn1(colors.greenAccent[400])
        setSelectColorbtn2(colors.greenAccent[400])
        setSelectColorbtn3(colors.greenAccent[400])
        setSelectColorbtn4(colors.blueAccent[400])
    }

  return (
    <Box m="20px" height="75vh" p="2px">
      
      <Header title="ANALYTICS" subtitle="Smart Bin Volume" />
      {/* <div>otherParam: {JSON.stringify(btp)}</div> */}
      <Box >
        <Button onClick={() => handleButton1()}>
            <Typography variant="h5" color={selectColorbtn1}>
                3 Days
            </Typography>
        </Button>
        <Button onClick={() => handleButton2()}>
            <Typography variant="h5" color={init ? colors.blueAccent[400] :selectColorbtn2}>
                7 Days
            </Typography>
        </Button>
        <Button onClick={() => handleButton3()}>
            <Typography variant="h5" color={selectColorbtn3}>
                2 Weeks
            </Typography>
        </Button>
            <Button onClick={() => handleButton4()}>
            <Typography variant="h5" color={selectColorbtn4}>
                4 Weeks
            </Typography>
        </Button>

      </Box>
      <LineChart data={chartData}/>
    </Box>
  );
};

export default Chart;
