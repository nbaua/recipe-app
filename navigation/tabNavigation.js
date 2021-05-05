import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import FavoriteScreen from '../screens/favoriteScreen';
import LandingScreen from '../screens/landingScreen';
import ProfileScreen from '../screens/profileScreen';
import SearchScreen from '../screens/searchScreen';
import Constants from '../shared/constants';
import resources from '../shared/resources';

const styles = StyleSheet.create({
  image: {
    width: Constants.__SMALL_ELEM_SIZE__,
    height: Constants.__SMALL_ELEM_SIZE__,
    padding: Constants.__DEFAULT_PADDING__,
  },
});

const tabBarOptions = {
  activeTintColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
  inactiveTintColor: Constants.__DEFAULT_BACKGROUND_COLOR__,
  labelStyle: {fontSize: 12},
  style: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 0,
    paddingHorizontal: Constants.__DEFAULT_PADDING__,
  },
  tabStyle: {
    height: Constants.__MEDIUM_ELEM_SIZE__,
    paddingHorizontal: Constants.__EXTRA_PADDING__,
  },
  keyboardHidesTabBar: true,
  adaptive: false,
};

const BottomTab = createBottomTabNavigator();

const AppBottomTab = () => {
  return (
    <BottomTab.Navigator tabBarOptions={tabBarOptions}>
      <BottomTab.Screen
        tabBarOptions={tabBarOptions}
        name="Home"
        component={LandingScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode={'contain'}
                source={focused ? resources.browse : resources.fork_knife}
                style={styles.icon}
              />
            );
          },
          tabBarLabel: ({color}) => {
            return (
              <Text fontSize={12} center color={color}>
                Browse
              </Text>
            );
          },
        }}
      />
      <BottomTab.Screen
        tabBarOptions={tabBarOptions}
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode={'contain'}
                source={focused ? resources.favorite : resources.favorite}
                style={styles.icon}
              />
            );
          },
          tabBarLabel: ({color}) => {
            return (
              <Text fontSize={12} center color={color}>
                Browse
              </Text>
            );
          },
        }}
      />
      <BottomTab.Screen
        tabBarOptions={tabBarOptions}
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode={'contain'}
                source={focused ? resources.search : resources.search}
                style={styles.icon}
              />
            );
          },
          tabBarLabel: ({color}) => {
            return (
              <Text fontSize={12} center color={color}>
                Browse
              </Text>
            );
          },
        }}
      />
      <BottomTab.Screen
        tabBarOptions={tabBarOptions}
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                resizeMode={'contain'}
                source={focused ? resources.profile : resources.profile}
                style={styles.icon}
              />
            );
          },
          tabBarLabel: ({color}) => {
            return (
              <Text fontSize={12} center color={color}>
                Browse
              </Text>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppBottomTab;
