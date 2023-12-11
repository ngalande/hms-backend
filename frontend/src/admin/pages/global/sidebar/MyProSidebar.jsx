// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useContext, useEffect, useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { BiLogOut } from 'react-icons/bi';
import { useSidebarContext } from "./sidebarContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../../../theme";
import { useTheme, Box, Typography, IconButton, Button } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import StyleIcon from '@mui/icons-material/Style';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SellIcon from '@mui/icons-material/Sell';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import RoomIcon from '@mui/icons-material/Room';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import ArticleIcon from '@mui/icons-material/Article';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import FireTruck from "@mui/icons-material/FireTruck";
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import jwt_decode from "jwt-decode";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AuthContext from "../../../../components/shared/authContext";
import logo from '../../../../assets/images/logo.png'
import userLogo from '../../../../assets/images/user.png'


import { useCookies } from "react-cookie";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const navigate = useNavigate();
  const auth = getAuth(app)
  const { user, logout } = useContext(AuthContext);
  const [validToken, setValidToken] = useState(true)
  const [cookies, setCookies, removeCookie] = useCookies(["token", "user_role"]);

  useEffect(()=>{
    console.log(cookies.length)
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


  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
        <Box paddingLeft={collapsed ? undefined : "10%"}>
          {!collapsed && (
            <>
                <div style={{flexDirection:'row', flex:1}}>
             
                <img
                  className="avater-image"
                  alt="app"
                  width="170px"
                  height="170px"
                  src={logo}
                  style={{ cursor: "pointer", paddingTop:'20px' }}
                />
                

              </div>
                <Typography variant="h3" color={colors.grey[100]} style={{marginTop: 10, marginLeft: 65, marginBottom: 20}}>
                  ADMIN
                </Typography>
            </>
          ) }
              </Box>
          
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={userLogo}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 {/* {!user ? (navigate('/')) : (user.name)} */}
                 {user?.name}
                </Typography>
              </Box>
            </Box>
          )}
          
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
             Bar Stock
            </Typography>
            }
            <Item
              title="Add Bar New Stock"
              to="/admin/addbarstock"
              icon={<AddShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Bar Stock"
              to="/admin/barstock"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
             Restaurant Stock
            </Typography>
            }
            <Item
              title="Add New Stock"
              to="/admin/addresstock"
              icon={<AddShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Stock"
              to="/admin/resstock"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Rooms
            </Typography>
            }
            <Item
              title="Booked Rooms"
              to="/admin/bookedrooms"
              icon={<BedroomParentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Available Rooms"
              to="/admin/avarooms"
              icon={<HotelIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add a Room"
              to="/admin/addroom"
              icon={<LuggageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Room Type
            </Typography>
            }
            <Item
              title="Add Room Type"
              to="/admin/addroomtype"
              icon={<MeetingRoomIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Expenses
            </Typography>
            }
            <Item
              title="Create Expense"
              to="/admin/createExpense"
              icon={<SellIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Add Expense"
              to="/admin/addExpense"
              icon={<SellIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Expenditure"
              to="/admin/expenditure"
              icon={<ManageSearchIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Hire
            </Typography>
            }
             <Item
              title="Add Item for Hire"
              to="/admin/additemforhire"
              icon={<AddTaskIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Manage Items Hire"
              to="/admin/itemsforhire"
              icon={<ChairAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hire Item"
              to="/admin/addHire"
              icon={<StyleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Hired Item"
              to="/admin/hireditems"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Staff
            </Typography>
            }
            <Item
              title="Add Staff"
              to="/admin/addstaff"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Staff"
              to="/admin/staff"
              icon={<SupervisorAccountIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!collapsed && 
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Reports
            </Typography>
            }
            
            <Item
              title="Reports"
              to="/admin/reports"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
          <div
              style={{
                background: "#fff",
                height: "0.3px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >{/*White divider */}</div>
            <div onClick={() => logout()}>
              <Item
                title="Log Out"
                icon={<BiLogOut size={24} color="red" />}
              />
            </div>
          
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
