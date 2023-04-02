/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useColorScheme, SafeAreaView } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import MasterStack from './__src__/navigation/stack/masterStack'
// import BottomTabs from './__src__/navigation/bottom/bottomTabs'
// import RootNavigator from './__src__/navigation/HomeStack';
import Toast from 'react-native-toast-message';
// import toastConfig from './shared/toastConfig';


const Stack = createStackNavigator();

const App: React.FC = ({ }) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: useColorScheme() === 'dark' ? Colors.darker : Colors.lighter
  };
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
  }

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={isDarkMode ? 'black' : 'white'}
    //   />

    // </SafeAreaView>

    <NavigationContainer>
      <MasterStack />
      {/* <BottomTabs /> */}
      <Toast />
    </NavigationContainer>
  );
}

export default App;
