import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import BarChart from "../../../components/growthRate";
import LineChart from "../../../components/lineChart";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getDatabase, onValue, ref } from "firebase/database";
import { Bounce } from "react-activity";
import app from "../../../firebaseConfig";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button as Btn } from "react-bootstrap";
import { API } from "../../../keys";

const db = getDatabase(app);

const Staff = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [anaData, setAnaData] = useState(null)
  const [enquiries, setEnquiries] = useState(null)
  const [subject, setSubject] = useState(null)
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [userType, setUserType] = useState(null)
  const [password, setPassword] = useState(null)
  const [staff, setStaff] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    setOpen(true);
    // setScroll(scrollType);
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
    // console.log(data?.id)
		axios.get(API+'user/get-users')
      .then(res => {
        let allStaff = res.data
        let systemStaff = allStaff.filter(r => r.role !== 'USER')
        setStaff(systemStaff)
        // console.log(systemStaff)
      }).catch(e => {
        console.log(e)
      })
	}, []);


  const handleChangePassword = (text) => {
    setPassword(text.target.value)
  }
  const handleChangeUsername = (text) => {
    setUsername(text.target.value)
  }
  const handleChangeEmail = (text) => {
    setEmail(text.target.value)
  }
  const handleChangeAccountType = (text) => {
    setUserType(text.target.value)
  }



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "Id" },
    { field: "username", headerName: "Staff Username", flex: 1  },
    { field: "role", headerName: "Staff Type", flex: 1 },
    { field: "email", headerName: "Email",flex: 1 },
    {
        field: "action", 
        headerName: "Action", 
        sortable: false, 
        flex: 1 ,
        disableClickEventBubbling: true,
        renderCell: (params) => {
            const onClick = (e) => {
              // setVisble(true)
              // e.stopPropagation(); // don't select this row after clicking
              const currentRow = params.row;
              // console.log(visible)
              return JSON.stringify(currentRow, null, 4);

            };
            return <Button onClick={handleClickOpen('paper', onClick())}><DeleteForeverIcon style={{color:'#fff'}} /></Button>
          }
    },
  ];

  const deleteUser = () => {
      setLoading(true)

      axios.delete(API+'user/delete-user/'+data.id)
        .then(res => {
          console.log(res.data.success)
          setLoading(false)
          setOpen(false);
          axios.get(API+'user/get-users')
           .then(res => {
             let allStaff = res.data
             let systemStaff = allStaff.filter(r => r.role !== 'USER')
             setStaff(systemStaff)
             // console.log(systemStaff)
           }).catch(e => {
             console.log(e)
           })
          alert('User Deleted successfully')
        }).catch(e => {
          console.log(e.response.data)
          // if(String(e?.response?.data?.error).includes('User already exists')){
          //   alert('User with the provided email already exists')
          //   setLoading(false)
          // }else{
          //   setLoading(false)
          // }
          alert('An error occurred while creating the user')
        })
  }

  return (
    <Box m="20px"  >
      <Header title="STAFF" subtitle="Manage Staff Accounts" />
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
            <DialogTitle id="scroll-dialog-title" style={{fontSize: 20}}>Delete Staff Account</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <Card className="shadow" style={{backgroundColor: colors.primary[400], width: '60vh'}}>
                  <Card.Body>
                    <p>Staff Email: {data.email}</p>
                    <p style={{fontSize:'18px'}}>Are you sure you want to delete the account?</p>
                    <Btn disabled={loading} onClick={deleteUser} variant="primary" color="red" style={{padding:5, color: '#fff', backgroundColor: 'red', width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
                      {!loading ? (
                        <>
                          Delete Account
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
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Hotel Staff Accounts
              </Typography>
              <Box
                m="8px 0 0 0"
                height="80vh"
                // width='100%'
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
        {staff ? (

          <DataGrid rows={staff} columns={columns} />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
    </Box>
  );
};

export default Staff;
