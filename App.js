/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import type {Node} from 'react';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LandingScreen from './screens/landing';
import SearchScreen from './screens/search';
const App: () => Node = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#42f44b',
        }}>
        <Tab.Screen
          name="Home"
          component={LandingScreen}
          options={{
            tabBarLabel: 'Browse',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('./assets/images/browse.png')
                    : require('./assets/images/browse.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={
                  focused
                    ? require('./assets/images/search.png')
                    : require('./assets/images/search.png')
                }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
