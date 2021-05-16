import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import AppBottomTab from './navigation/tabNavigation';
import DetailScreen from './screens/detailScreen';
import ListingScreen from './screens/listingScreen';
// import LandingScreen from './screens/landingScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import SplashScreen from './screens/splashScreen';
import Constants from './shared/constants';
import {Styles} from './shared/styles';
import toastConfig from './shared/toastConfig';

LogBox.ignoreLogs(['VirtualizedLists', 'Warning: Each']);

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
          },
          headerTintColor: Constants.__ALTERNATE_TEXT_COLOR__,
          headerTitleStyle: {
            fontFamily: Constants.__DEFAULT_HEADING_FONT__,
            fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Landing"
            component={AppBottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Listing"
            component={ListingScreen}
            options={{
              headerShown: true,
              headerLeftContainerStyle: Styles.fancyToolbar,
              headerTintColor: '#ffffff',
              headerTitle: null,
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              headerShown: true,
              headerLeftContainerStyle: Styles.fancyToolbar,
              headerTintColor: '#ffffff',
              headerTitle: null,
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default App;
