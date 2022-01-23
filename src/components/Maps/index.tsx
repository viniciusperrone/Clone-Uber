import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details'; 

import markedImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';


import { getPixelSize } from '../../utils/handlePixels';
import { styles, LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, c, Back } from './style';

import { KEY_API } from '@env';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type Destination = {
  latitude: number;
  longitude: number;
  title: string;
};

type Home = {
  duration: number;
  address: string;
};

Geocoder.init(KEY_API);

const Maps: React.FC = () => {

  const [mapsView, setMapsView] = useState<MapView>();
  const [statusMsg, setStatusMsg] = useState<string>();
  const [city, setCity] = useState<string>('Destino');
  const [home, setHome] = useState({} as Home);
  const [region, setRegion] = useState({} as Region);
  const [destination, setDestination] = useState({} as Destination);

  function handleLocationSelected(data: Object, details: Object) {
    console.log('Testando: ' + details);

    const { geometry: { location: { lat: latitude, lng: longitude } } } = details;

    setCity(String(data.structured_formatting.main_text));
    
    setDestination({
      latitude: latitude,
      longitude: longitude,
      title: data.structured_formatting.main_text
    });

  }

  function handleBack(){
    setDestination(null)
  }

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        setStatusMsg('PERMISSION NOT GRANTED');
        console.log(statusMsg);
      }

      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();

      setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
      });

      const response = await Geocoder.from({ latitude, longitude });

      const address = response.results[0].formatted_address;
      const location = address.substring(0, address.indexOf(',')); 

      setHome({
        duration: home.duration,
        address: location
      });

      
    }

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={(element: MapView) => setMapsView(element)}
      >
        {
          destination && (
            <>
              <Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  setHome({
                    duration: Math.floor(result.duration),
                    address: home.address
                  });
                  mapsView?.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: Number(getPixelSize(50)),
                      left: Number(getPixelSize(50)),
                      top: Number(getPixelSize(50)),
                      bottom: Number(getPixelSize(350))
                    }
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markedImage}
                
              >
                <LocationBox>
                  <LocationText>
                    {city}
                  </LocationText>
                </LocationBox>
              </Marker>

              <Marker
                coordinate={region}
                anchor={{ x: 0, y: 0 }}
              >
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{home.duration}</LocationTimeText>
                    <LocationTimeTextSmall> MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{home.address}</LocationText>
                </LocationBox>
              </Marker>
            </>
          )}
      </MapView>

      {
        destination ? (
          <>
            <Back onPress={handleBack}>
              <Image source={backImage}/>
            </Back>
          <Details />
          </>
        ) : (
          <Search onLocationSelected={handleLocationSelected} />
        )
      }
    </View>
  );
}

export default Maps;