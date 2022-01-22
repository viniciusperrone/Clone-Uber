import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;

};
const Maps: React.FC = () => {

  const [statusMsg, setStatusMsg] = useState<string>();
  const [region, setRegion] = useState({} as Region);

  useEffect(() => {

    const getLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if(status !== 'granted'){
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Maps;