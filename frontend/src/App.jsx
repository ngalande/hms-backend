import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-activity/dist/library.css";
import Login from "./login/login";
import ForgotPassword from "./forgotPassword";
import { AuthContextProvider } from "./components/shared/authContext";
import 'reactjs-popup/dist/index.css';
import BookedRooms from "./reception/pages/rooms/bookedRooms";
import AvailableRooms from "./reception/pages/rooms/availbleRooms";
import BookRoom from "./reception/pages/rooms/bookRoom";
import ReceptionDashboard from "./reception/pages/dashboard";
import AdminDashboard from "./admin/pages/dashboard";
import AdminTopbar from "./admin/pages/global/Topbar";
import ReceptionTopbar from "./reception/pages/global/Topbar";
import { ReceptionMyProSidebarProvider } from "./reception/pages/global/sidebar/sidebarContext";
import { AdminMyProSidebarProvider } from "./admin/pages/global/sidebar/sidebarContext";
import AddStaff from "./admin/pages/staff/addStaff";
import AddRoom from "./admin/pages/rooms/addRoom";
import Staff from "./admin/pages/staff/staff";
import { BarMyProSidebarProvider } from "./bar/pages/global/sidebar/sidebarContext";
import { RestaurantMyProSidebarProvider } from "./restaurant/pages/global/sidebar/sidebarContext";
import RestaurantDashboard from "./restaurant/pages/dashboard";
import RestaurantTopbar from "./restaurant/pages/global/Topbar";
import AddStock from "./restaurant/pages/stock/addStock";
import Stock from "./restaurant/pages/stock/stock";
import Sales from "./restaurant/pages/sales";
import BarTopbar from "./bar/pages/global/Topbar";
import BarDashboard from "./bar/pages/dashboard";
import BarAddStock from "./bar/pages/stock/addStock";
import BarStock from "./bar/pages/stock/stock";
import BarSales from "./bar/pages/sales";
import Register from "./register";
import AddRoomType from "./admin/pages/rooms/addRoomType";
import { CookiesProvider } from "react-cookie";
import UpdateStaff from "./admin/pages/staff/updateStaff";
import AdminAvailableRooms from "./admin/pages/rooms/availbleRooms";
import AdminBookedRooms from "./admin/pages/rooms/bookedRooms";
import Reports from "./reception/pages/reports/reports";
import BarReports from "./bar/pages/reports";
import ResReports from "./restaurant/pages/reports";
import AdminReports from "./admin/pages/reports";
import Expenses from "./admin/pages/expenses/expenses";
import AddExpenses from "./admin/pages/expenses/addExpenses";
import HireItem from "./admin/pages/hire/hireItem";
import HiredItems from "./admin/pages/hire/hiredItems";
import ItemsForHire from "./admin/pages/hire/itemsForHire";
import AddItemForHire from "./admin/pages/hire/addItemForHire";
import CreateExpense from "./admin/pages/expenses/createExpense";


function App() {
  const [theme, colorMode] = useMode();
  
  const SidebarLayoutRec = () => (
    <>
    <CssBaseline />
     <ReceptionMyProSidebarProvider>
     <div style={{ height: "100%", width: "100%" }}>
        <main>
        <ReceptionTopbar />
        <Outlet />
        </main>
        </div>
     </ReceptionMyProSidebarProvider>
    </>
  );
  const SidebarLayoutAdmin = () => (
    <>
    <CssBaseline />
     <AdminMyProSidebarProvider>
     <div style={{ height: "100%", width: "100%" }}>
        <main>
        <AdminTopbar />
        <Outlet />
        </main>
        </div>
     </AdminMyProSidebarProvider>
    </>
  );
  const SidebarLayoutBar = () => (
    <>
    <CssBaseline />
     <BarMyProSidebarProvider>
     <div style={{ height: "100%", width: "100%" }}>
        <main>
        <BarTopbar />
        <Outlet />
        </main>
        </div>
     </BarMyProSidebarProvider>
    </>
  );
  const SidebarLayoutRes = () => (
    <>
    <CssBaseline />
     <RestaurantMyProSidebarProvider>
     <div style={{ height: "100%", width: "100%" }}>
        <main>
        <RestaurantTopbar />
        <Outlet />
        </main>
        </div>
     </RestaurantMyProSidebarProvider>
    </>
  );

  return (
    <AuthContextProvider>
      <CookiesProvider>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        
        {/* <CssBaseline /> */}
        {/* <MyProSidebarProvider> */}
          {/* <div style={{ height: "100%", width: "100%" }}> */}
            {/* <main> */}
              {/* <Topbar /> */}
              <Routes>
                <Route element={<SidebarLayoutRec />} >
                  <Route path="/rec/home" element={<ReceptionDashboard />} />

                  <Route path="/rec/bookedrooms" element={<BookedRooms />} />
                  <Route path="/rec/avarooms" element={<AvailableRooms />} />
                  <Route path="/rec/bookroom" element={<BookRoom />} />
                  <Route path="/rec/reports" element={<Reports />} />
                </Route>
                <Route element={<SidebarLayoutAdmin />}>
                  <Route path='/admin/home' element={<AdminDashboard />} />
                  <Route path="/admin/bookedrooms" element={<AdminBookedRooms />} />
                  <Route path="/admin/avarooms" element={<AdminAvailableRooms />} />
                  <Route path="/admin/addstaff" element={<AddStaff />} />
                  <Route path="/admin/addroom" element={<AddRoom />} />
                  <Route path="/admin/addroomtype" element={<AddRoomType/>} />
                  <Route path="/admin/staff" element={<Staff />} />
                  <Route path="/admin/updatestaff" element={<UpdateStaff />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/expenditure" element={<Expenses />} />
                  <Route path="/admin/createExpense" element={<CreateExpense />} />
                  <Route path="/admin/addExpense" element={<AddExpenses />} />
                  <Route path="/admin/addHire" element={<HireItem />} />
                  <Route path="/admin/hireditems" element={<HiredItems />} />
                  <Route path="/admin/itemsforhire" element={<ItemsForHire />} />
                  <Route path="/admin/additemforhire" element={<AddItemForHire />} />
                </Route>
                <Route element={<SidebarLayoutRes />}>
                  <Route path='/res/home' element={<RestaurantDashboard />} />
                  <Route path='/res/addstock' element={<AddStock />} />
                  <Route path='/res/stock' element={<Stock />} />
                  <Route path='/res/sales' element={<Sales />} />
                  <Route path='/res/reports' element={<ResReports />} />
                </Route>
                <Route element={<SidebarLayoutBar />}>
                  <Route path='/bar/home' element={<BarDashboard />} />
                  <Route path='/bar/addstock' element={<BarAddStock />} />
                  <Route path='/bar/stock' element={<BarStock />} />
                  <Route path='/bar/sales' element={<BarSales />} />
                  <Route path='/bar/reports' element={<BarReports />} />
                </Route>


                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
              </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </CookiesProvider>
    </AuthContextProvider>
    
  );
}

export default App;
