import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import LandingScreen from '../../screens/app/landingScreen';
import SearchScreen from '../../screens/app/searchScreen';
import ProfileScreen from '../../screens/app/profileScreen';


export type BottomTabParamList = {
    LandingScreen: undefined;
    SearchScreen: undefined;
    ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator();

const bottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="SearchScreen" component={SearchScreen} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default bottomTabs;

