import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import app from '../../firebase/Firebase';
import { getDatabase, ref, onValue, } from 'firebase/database';
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
				//set data to setData
				setData(data)
        
        //console.log('Data: ',Data)
		
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

  
  const [changeMyTypeID, setToggleChangeMyTypeID] = useState(1);
  const mapRef = useRef(null);

  const onMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };
  //console.log("mapRefCurrent", mapRef.current);

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

 
  return (
    isLoaded && (
      <>
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
      </>
    )
  );
};

export default SBMap;