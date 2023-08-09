import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import app from '../../firebase/Firebase';
//import { getAuth } from 'firebase/auth'

import { getDatabase, ref, onValue, } from 'firebase/database';
import Parked from "../../assets/images/parked.png";
import Incident from "../../assets/images/IncidentsDrones.png";
import InAir from "../../assets/images/IntheAirDrones.png";
import Mission from "../../assets/images/missionmarker.png";
import Offline from "../../assets/images/offlinedrones.png";
import BinLoc from '../../assets/images/binloc.png'
import { useEffect, useRef, useState } from "react";
import "./Map.css";
import ChangeMapType from "./Layer/ChangeMapType";
const db = getDatabase(app);


const SBMap = (props) => {
  const { isLoaded } = props;
  const [selectedMarker, setSelectedMarker] = useState("");
  //firebase data
  const [Data, setData] = useState([]);
  useEffect(() => {
		const query = ref(db, '/esp-data');
		//getData()
		return onValue(query, async(snapshot) => {
			const data =  (await snapshot.val()) ?? [];

			if (snapshot.exists()) {
				//getTemp(data.temp)
        //const SData = Object.entries(data)
				setData(data)
        
        //console.log('Data: ',Data)
		
			}
    

		});
	}, []);
  //actual data
  const SData = Object.entries(Data)
  const aData = [];
  const bData = [];
  SData.forEach(([key, value]) => {
    //console.log(key); // 'one'
    // 1
    aData.push(value);
    //console.log(aData)
  });


  //test data
  let lat = aData.map(({ lat }) => lat)
  let lon = aData.map(({ lon }) => lon)
  let tBData
  tBData = aData.map(({ trueDepth }) => trueDepth)
  console.log('Lat data: ', lat)
  console.log('Lon data: ', lon)



  const containerStyle = {
    width: "90vw",
    height: "90vh",
  };
  const center = {
    lat: -15.3534,
    lng: 28.4322,
  };

  const markers = [
    {
      name: "Los Angeles, California",
      status: "parked",
      location: {
        lat: -15.4598,
        lng: 28.0644,
      },
    },
    {
      name: "New York, New York",
      status: "inair",
      location: {
        lat: -15.1951,
        lng: 28.1921,
      },
    },
    {
      name: "Denver, Colorado",
      status: "incident",
      location: {
        lat: -15.2553,
        lng: 28.0972,
      },
    },
    {
      name: "Chicago, Illinois",
      status: "offline",
      location: {
        lat: -15.3165,
        lng: 28.0322,
      },
    },
    {
      name: "location-5",
      status: "mission",
      location: {
        lat: -15.267,
        lng: 28.0909,
      },
    },
  ];

  const [changeMyTypeID, setToggleChangeMyTypeID] = useState(1);
  const mapRef = useRef(null);

  const onMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };
  console.log("mapRefCurrent", mapRef.current);

  const MapType = {
    roadmap: "roadmap",
    satellite: "satellite",
    hybrid: "hybrid",
    terrain: "terrain",
  };
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

  console.log(changeMyTypeID);
  return (
    isLoaded && (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => {
            return (
              <div key={marker.name}>
                <Marker
                  position={marker.location}
                  options={{
                    icon:
                      marker.status === "parked"
                        ? BinLoc
                        : marker.status === "inair"
                        ? BinLoc
                        : marker.status === "incident"
                        ? BinLoc
                        : marker.status === "mission"
                        ? BinLoc
                        : marker.status === "offline"
                        ? BinLoc
                        : "",
                  }}
                  onClick={() => {
                    setSelectedMarker(marker);
                  }}
                />
              </div>
            );
          })}
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.location}
              options={{
                pixelOffset: new window.google.maps.Size(0, -40),
              }}
            >
              <div>
                <h1>location -{selectedMarker.name}</h1>
                <h1>status - {selectedMarker.status}</h1>
                <button onClick={() => setSelectedMarker("")}>close</button>
              </div>
            </InfoWindow>
          )}

          <ChangeMapType handleMapToggle={handleMapToggle} />
        </GoogleMap>
      </>
    )
  );
};

export default SBMap;