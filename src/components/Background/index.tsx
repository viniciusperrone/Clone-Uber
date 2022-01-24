import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

type Props = {
    children: ReactNode;
};
const Background: React.FC<Props> = ({ children }) => (
    <SafeAreaView style={style.container}>
        { children }
    </SafeAreaView>
)

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})

export default Background;