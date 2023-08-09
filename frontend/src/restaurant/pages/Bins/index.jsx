import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AuthContext from "../../components/shared/authContext";
import jwtInterceoptor from "../../components/shared/jwtInterceptor";
import { keys } from "../../components/shared/variables";
import { BiNoSignal } from "react-icons/bi";
import app from "../../firebaseConfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { useRef } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import ChangeMapType from "./Map/Layer/ChangeMapType"
import "./Map.css";
import BinLoc from '../../assets/images/binloc.png'
// import ChangeMa

const db = getDatabase(app);
const Bins = () => {
  const [Data, setData] = useState([]);
  const [users, setUsers] = useState(null)
  const [notusers, setNotUsers] = useState({})
  const { user } = useContext(AuthContext);
  const [changeMyTypeID, setToggleChangeMyTypeID] = useState(1);
  // const { isLoaded } = props;
  const [selectedMarker, setSelectedMarker] = useState("");
  const mapRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" },
    {
      field: "battery",
      headerName: "Battery Percentage",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "location", headerName: "Location", width: 200 },
    { field: "depth", headerName: "Actual Depth", width: 200 },
    { field: "level", headerName: "Fill-Level", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  useEffect(() => {
		const query = ref(db, '/esp-data');
		//getData()
		return onValue(query, async(snapshot) => {
			const data =  (await snapshot.val()) ?? [];

			if (snapshot.exists()) {
				//getTemp(data.temp)
        //const SData = Object.entries(data)
        console.log(data)
        console.log(isLoaded)
				setData(data)
        
        //console.log('Data: ',Data)
		
			}else{
        console.log('error')
      }
     

		});
	}, []);

  //actual data
  const SData = Object.entries(Data)
  const aData = [];
  SData.forEach(([key, value]) => {
    //console.log(key); // 'one'
    // push data to aData
    aData.push(value);
    //console.log(aData)
  });
  //Marker data
  let markerData = []
  aData.map((item, index) => {
    const selected = (({ lat, lon, depth, id }) => ({ lat, lon, depth, id }))(item);
    markerData.push(selected)
    return {item}
  })


  const onMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  const MapType = {
    roadmap: "roadmap",
    satellite: "satellite",
    hybrid: "hybrid",
    terrain: "terrain",
  };
   //map type state 
   useEffect(() => {
    if (mapRef.current) {
      if (changeMyTypeID === 1) {
        mapRef.current.setMapTypeId(MapType.roadmap);
      } else if (changeMyTypeID === 2) {
        mapRef.current.setMapTypeId(MapType.terrain);
      } else if (changeMyTypeID === 3) {
        mapRef.current.setMapTypeId(MapType.satellite);
      } else if (changeMyTypeID === 4) {
        mapRef.current.setMapTypeId(MapType.hybrid);
      }
    }
  }, [changeMyTypeID]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBvEPHEGFktqCFUD24lX3ilST6tLzoWt9c"
  })

  const handleMapToggle = () => {
    if (changeMyTypeID === 0) {
      setToggleChangeMyTypeID(1);
    } else if (changeMyTypeID === 1) {
      setToggleChangeMyTypeID(2);
    } else if (changeMyTypeID === 2) {
      setToggleChangeMyTypeID(3);
    } else if (changeMyTypeID === 3) {
      setToggleChangeMyTypeID(4);
    } else if (changeMyTypeID === 4) {
      setToggleChangeMyTypeID(1);
    }
  };

    //map container style
    const containerStyle = {
      width: "90vw",
      height: "90vh",
    };
    //map center
    const center = {
      lat: -15.3534,
      lng: 28.4322,
    };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SMART BINS" subtitle="Registered bins" />
      </Box>
      {isLoaded && (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onMapLoad}
        
      >
        
        {/* Marker */}
        {markerData.map((marker) => {
          return (
            <div key={marker.id}>
              <Marker
                position={
                  {
                    lat: marker.lat,
                    lng: marker.lon
                  }
                }
                options={{
                  icon:
                    BinLoc
                }}
                onClick={() => {
                  
                  setSelectedMarker(marker);
                }}
                //onMouseOut={() => setSelectedMarker("")}
              />
            </div>
          );
        })}
        {/* Info window */}
        {selectedMarker && (
          <InfoWindow
            position={
              {
                lat: selectedMarker.lat,
                lng: selectedMarker.lon
              }
            }
            // options={{
            //   pixelOffset: new window.google.maps.Size(0, -40),
            // }}
            
          >
            <div>
              <h1>Fill Level - {selectedMarker.depth} %</h1>
              <h1 style={{color: selectedMarker.depth >= 100 ? '#e32f45':'#00FF00' , }}>status - { selectedMarker.depth >= 100 ? 'FULL' : 'HALF' && selectedMarker.depth < 1 ? 'EMPTY' : 'HALF'}</h1>
              <button onClick={() => setSelectedMarker("")}>close</button>
            
            </div>
          </InfoWindow>
          
        )}

        <ChangeMapType handleMapToggle={handleMapToggle} />
      </GoogleMap>
      )}
    </Box>
  );
};

export default Bins;
