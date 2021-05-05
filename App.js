import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import AppBottomTab from './navigation/tabNavigation';
// import LandingScreen from './screens/landingScreen';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/registerScreen';
import SplashScreen from './screens/splashScreen';
import Constants from './shared/constants';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
