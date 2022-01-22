import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../screens/Main';

const { Navigator, Screen } = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'transparent'
                },
                headerShown: false
            }}
        >
            <Screen
                name="Main"
                component={Main}
            />

        </Navigator>
    )
}

export default AuthRoutes;