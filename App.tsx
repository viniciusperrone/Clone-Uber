import { StatusBar } from 'expo-status-bar';

import Background from './src/components/Background';
import Maps from './src/components/Maps';

export default function App() {
  return (
    <>
      <StatusBar
        style="auto"
        translucent
      />
      <Background>
        <Maps />
      </Background>
    </>
  );
}