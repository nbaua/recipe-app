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
  imageFocused: {
    padding: Constants.__DEFAULT_PADDING__,
    tintColor: Constants.__ALTERNATE_TEXT_COLOR__,
  },
  image: {
    padding: Constants.__DEFAULT_PADDING__,
    tintColor: Constants.__DEFAULT_TEXT_COLOR__,
  },
  textLabelFocused: {
    fontSize: Constants.__EXTRA_SMALL_FONT_SIZE__,
    color: Constants.__ALTERNATE_TEXT_COLOR__,
  },
  textLabel: {
    fontSize: Constants.__EXTRA_SMALL_FONT_SIZE__,
    color: Constants.__DEFAULT_TEXT_COLOR__,
  },
});

const tabBarOptions = {
  style: {
    backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
    borderTopWidth: 0,
    paddingHorizontal: Constants.__DEFAULT_PADDING__,
    paddingVertical: Constants.__DEFAULT_PADDING__ * 2,
    height: Constants.__MEDIUM_ELEM_SIZE__ - Constants.__SMALL_ELEM_SIZE__ / 2,
  },
  tabStyle: {
    height: Constants.__MEDIUM_ELEM_SIZE__ / 2,
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
                source={focused ? resources.recipe : resources.recipe}
                style={focused ? styles.imageFocused : styles.image}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={focused ? styles.textLabelFocused : styles.textLabel}>
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
                style={focused ? styles.imageFocused : styles.image}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={focused ? styles.textLabelFocused : styles.textLabel}>
                Favorite
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
                style={focused ? styles.imageFocused : styles.image}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={focused ? styles.textLabelFocused : styles.textLabel}>
                Search
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
                style={focused ? styles.imageFocused : styles.image}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={focused ? styles.textLabelFocused : styles.textLabel}>
                Profile
              </Text>
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AppBottomTab;
