import React from "react";
// import LineChart from "../../../components/revenue";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
// import { useTheme } from '@mui/material';
// import { tokens } from '../../../theme';
const Notifications = () => {
  // const theme = useTheme()
  // const colors = tokens(theme.palette.mode)
  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="Notifications" subtitle="Smart Bin FIll Level Notifications" />
      {/* <LineChart /> */}
    </Box>
  );
};

export default Notifications;
