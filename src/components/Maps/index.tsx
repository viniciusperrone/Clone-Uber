import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Search from '../Search';
import Directions from '../Directions';

import markedImage from '../../assets/marker.png';

import { getPixelSize } from '../../utils/handlePixels';
import { styles, LocationBox, LocationText } from './style';

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
const Maps: React.FC = () => {

  const [mapsView, setMapsView] = useState<MapView>();
  const [statusMsg, setStatusMsg] = useState<string>();
  const [region, setRegion] = useState({} as Region);
  const [destination, setDestination] = useState({} as Destination);

  function handleLocationSelected(data: Object, details: Object) {
    console.log('Testando: ' + details);

    const { geometry: { location: { lat: latitude, lng: longitude } } } = details;

    setDestination({
      latitude: latitude,
      longitude: longitude,
      title: data.structured_formatting.main_text
    });

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
                  mapsView?.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: Number(getPixelSize(50)),
                      left: Number(getPixelSize(50)),
                      top: Number(getPixelSize(50)),
                      bottom: Number(getPixelSize(50))
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
                    {destination.title}
                  </LocationText>
                </LocationBox>
              </Marker>
            </>
          )}
      </MapView>

      <Search onLocationSelected={handleLocationSelected} />
    </View>
  );
}

export default Maps;