import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions } from 'react-native';

import Maps from './src/components/Maps';
import Search from './src/components/Search';

export default function App() {
  return (
    <>
      <StatusBar
        style="auto"
        translucent
      />
      <Maps />
      <Search />
    </>
  );
}