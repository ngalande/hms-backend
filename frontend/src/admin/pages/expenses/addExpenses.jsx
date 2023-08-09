import React, { useContext, useState, useEffect } from "react";
import { Box, Button as Btn, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import AuthContext from "../../../components/shared/authContext";
import { Bounce } from "react-activity";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
// import Chart from "./chart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../keys";


const AddExpenses = () => {
  const navigate = useNavigate();
  const [expenseID, setExpenseID] = useState(null)
  const [expenses, setExpenses] = useState(null)
  const [expenseDescription, setexpenseDescription] = useState(null)
  const [expenseAmount, setexpenseAmount] = useState(null)
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    // setOpen(true);
    // setScroll(scrollType);
    const jsonValue = JSON.parse(data)
    navigate('chart', {state:jsonValue})
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
    axios.get(API+'expenditure/get-expensestockitems')
      .then(res => {
        setExpenses(res.data)
        console.log(res.data)
      }).catch(e => {
        console.log(e)
      })
  }, [])


  const handleChangeExpenseName = (text) => {
    if(text.target.value != 1){
      let jsonValue= JSON.parse(text.target.value)
      setExpenseID(jsonValue?.id)
    }else{
      setExpenseID(null)
    }
  }

 
  const handleChangeExpenseDesc = (text) => {
    setexpenseDescription(text.target.value)
  }
  const handleChangeAmount = (text) => {
    setexpenseAmount(text.target.value)
  }


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


 const addExpense = () => {
  if(!expenseID){
    alert('Please select expense name')
  }else if(!expenseAmount){
    alert('Please enter expense amount')
  }
  else if(!expenseDescription){
    alert('Please enter expense description')
  }else{
    setLoading(true)
    const payload = {
      description: expenseDescription,
      amount:expenseAmount
    }
    axios.post(API+'expenditure/create-expenditure/'+expenseID, payload)
      .then(res => {
        setLoading(false)
        alert('Expense created successfully')
      }).catch(e => {
        console.log(e.response.data)
        setLoading(false)
        alert('An error occurred while creating room, please try again')
      })
  }
 }

  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="ADD EXPENSES" subtitle="Add New Expense" />
      {/* <LineChart /> */}
      <Box
        m="8px 0 0 0"
        height="80vh"
        alignItems="center"
        justify="center"
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
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh',  }}
       >
        <Grid item xs={5}>

        <Card className="shadow" style={{backgroundColor: colors.primary[400], }} >
          <Card.Body>
              <Form>
              <Form.Group style={{marginTop: 10}} className="mb-3 text-start" controlId="formBasicEmail">
                  <Form.Label>Expense Name</Form.Label>
                  <Form.Control 
                     required
                    as="select"
                    arial-lable="Select Staff Type"
                    onChange={handleChangeExpenseName}
                  >
                    <option value={1}>Select Expense Name</option>
                    {expenses?.map(exp => {
                      return (<option key={exp.id} value={JSON.stringify(exp)}>{exp.expense_name}</option> )
                    })}
                  </Form.Control>
  
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-start  ">
                    Description
                  </Form.Label>
                  <Form.Control
                    required
                    type="text" 
                    placeholder="Enter expense description" 
                    value={expenseDescription} 
                    onChange={handleChangeExpenseDesc} 
                    
                    />
                </Form.Group>
                <Form.Group className=" ">
                  <Form.Label className="text-start mt-2">
                    Amount
                  </Form.Label>
                  <Form.Control required type="number" placeholder="Enter expense amount" value={expenseAmount} onChange={handleChangeAmount}  />
                </Form.Group>
                  <Button variant="primary" onClick={addExpense} style={{padding:5, width:'50%', marginTop: 20}}>
                  {!loading ? (
                            <div>
                              Add Expense
                            </div>
                            ) : (
                                <Bounce />
                              )}
                  </Button>
              </Form>
            
          </Card.Body>
        </Card>
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddExpenses;
