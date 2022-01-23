import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

import { KEY_API } from '@env';

type DirectionsProps = {
    destination: {
        latitude: number;
        longitude: number;
        title: string;
    };
    origin: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
    onReady: (params: any) => void;
}
const Directions: React.FC<DirectionsProps> = ({ origin, destination, onReady }) => (
    <MapViewDirections
        origin={origin}
        destination={destination}
        onReady={onReady}
        apikey={KEY_API}
        strokeWidth={3}
        strokeColor="#222"
    />
)

export default Directions;