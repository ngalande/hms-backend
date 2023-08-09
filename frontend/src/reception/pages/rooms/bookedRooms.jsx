import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import BarChart from "../../../components/growthRate";
import LineChart from "../../../components/lineChart";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { getDatabase, onValue, ref } from "firebase/database";
import app from "../../../firebaseConfig";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";
import { Card, Button as Btn, Form  } from "react-bootstrap";
import { Bounce } from "react-activity";



const BookedRooms = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([])
  const [reservedRooms, setReservedRooms] = useState(null)
  const [reservationID, setReservationID] = useState(null)
  const [reservationType, setReservationType] = useState(null)
  const [bookType, setBookType] = useState(null)
  const [nodata, setNoData] = useState({})
  const [cancel, setCancel] = useState(null)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [reRooms, setReRooms] = useState(null)
  const [bookedRooms, setBookedRooms] = useState(null)
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    setOpen(true);
    const jsonValue = JSON.parse(data)
    setData(jsonValue)
    let filteredRooms = reservedRooms.find(r => r.room_id === jsonValue.id)
    // console.log(filteredRooms.id)
    setReservationID(filteredRooms.id)
    if(jsonValue.status == 'BOOKED'){
      setBookType(['CANCEL', 'CHECKOUT'])
    }else{
      setBookType(['UNRESERVE'])
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    console.log(Data)
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
        let reservedRooms = allRooms.filter(r => r.status === 'RESERVED')
        let bookRooms = allRooms.filter(r => r.status === 'BOOKED')
        setBookedRooms(bookRooms)
        setReRooms(reservedRooms)
      }).catch(e => {
        console.log(e)
      })
	}, []);

  useEffect(() => {
    console.log(reservedRooms)
		axios.get(API+'hotel/get-reservedrooms')
      .then(res => {
        let allReservations = res.data
        setReservedRooms(allReservations)
      }).catch(e => {
        console.log(e)
      })
	}, []);




  const handleChangeReservation = (text) => {
    // console.log(text.target.value === "UNRESERVE")
    if(text.target.value == 'UNRESERVE'){
      console.log('in')
      setReservationType('UNRESERVED')
      setCancel('false')
    }else if(text.target.value == 'CANCEL'){
      console.log('out')
      setReservationType('UNRESERVED')
      setCancel('true')
    }
  }

  const updateBooking = () => {
    console.log(reservationType)

    if(reservationType != 1 && reservationID && reservationType){
      setLoading(true)
      const payload = {
        status: reservationType,
        cancel: cancel
      }
      // console.log(payload)
      axios.put(API+'hotel/update-roomreservation/'+reservationID, payload)
        .then(res => {
          console.log(res.data)
          setOpen(false)
          setReservationType(null)
          // setRoomID(null)
          axios.get(API+'hotel/get-rooms')
            .then(res => {
              let allRooms = res.data
              let reservedRooms = allRooms.filter(r => r.status === 'RESERVED')
              let bookRooms = allRooms.filter(r => r.status === 'BOOKED')
              setBookedRooms(bookRooms)
              setReRooms(reservedRooms)
            }).catch(e => {
              console.log(e)
            })
          alert('Room reservation updated')

          setLoading(false)
        }).catch(e => {
          console.log(e.response.data)
          setLoading(false)
          setReservationType(null)
          // setRoomID(null)
          alert('An error occurred while updating room reservation. please try again later')
        })
    }else{
      alert('Please select a room reservation type')
    }
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    // { field: "id", headerName: "Id" },
    {
      field: "name",
      headerName: "Room Name",
     flex:1,
      cellClassName: "name-column--cell",
    },
    // { field: "lat", headerName: "Location",flex:1 },
    { field: "room_type", headerName: "Room Type",flex:1 },
    { field: "number", headerName: "Room Number",flex:1,
    },
    { field: "status", headerName: "Room Status",flex:1 },
    { field: "capacity", headerName: "Room Capacity" },
    // { f ield: "paid_status", headerName: "Paid Status",flex:1 },
    { 
      field: "id", 
      headerName: "Duration",
      flex:1,
      renderCell: (params) => {
        const item = reservedRooms?.find(s => s.room_id == params.row?.id)
        return <span>{item?.duration}</span>
      }  
    },
    { 
      field: "amount", 
      headerName: "Amount", 
     flex:1,
      renderCell: (params) => {
        return <span>{Number(params.row?.amount).toLocaleString(undefined, {maximumFractionDigits:2})}</span>
      } 
    },
  //   {
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
    <Box m="20px" >
      <Header title="BOOKED ROOMS" subtitle="Occupied Rooms in Hotel" />
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
                        What would you like to do?
                        </Form.Label>
                        <Form.Control 
                         
                        as="select"
                        required={true}
                        // value={userType}
                        onChange={handleChangeReservation}
                        arial-lable="What would you like to do?"
                        >
                        <option value={1}>Select an Option</option>
                        {/* <option value={bookType ? bookType[0] : ''}>{bookType ? bookType[0] : ''}</option> 
                        <option value={bookType ? bookType[1] : ''}>{bookType ? bookType[1] : ''}</option> 
                        <option value={1}>Select Room Type</option> */}
                        {bookType?.map(book => {
                          return (<option value={book}>{book} </option> )
                        })}
                        </Form.Control>
                      </Form.Group>
                    <Btn disabled={loading} onClick={updateBooking} variant="primary" color="blue" style={{padding:5, color: '#fff', backgroundColor: 'blue', width:'50%', marginTop: 20, alignItems:'center', flex:1, justifyContent:'center'}}>
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
              {/* {!loading ? (

                            <Btn disabled={loading} variant="primary"  style={{padding:5, }}>
                            {!loading ? (
                              <div>
                                Update Staff
                              </div>
                              ) : (
                                  <Bounce />
                                )}
                            </Btn>
                              // <Button disabled={loading} style={{color:'#fff'}} onClick={handleClose}>Send</Button>
                            ) : (
                            <Button disabled={loading} variant="primary"style={{padding:5, width:'100%'}}>
                              <Bounce />
                            </Button>
                            )} */}
            </DialogActions>
          </Dialog>
        </div>
      </Box>
      <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Booked Rooms
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
         

        {bookedRooms ? (

          <DataGrid rows={bookedRooms} columns={columns} />
        ):(
          <DataGrid rows={nodata} columns={columns} />
        )}
      </Box>
    </Box>
    <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Reserved Rooms
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
         

        {reRooms ? (

          <DataGrid rows={reRooms} columns={columns} />
        ):(
          <DataGrid rows={nodata} columns={columns} />
        )}
      </Box>
      </Box>
    </Box>
  );
};

export default BookedRooms;
