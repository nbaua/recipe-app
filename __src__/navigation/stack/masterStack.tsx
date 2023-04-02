import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../../screens/app/detailScreen';
import LandingScreen from '../../screens/app/landingScreen';
import LoginScreen from '../../screens/auth/loginScreen';
import RegisterScreen from '../../screens/auth/registerScreen';
import SplashScreen from '../../screens/splashScreen';
import ListingScreen from '../../screens/app/listingScreen';
// import SearchScreen from '../../screens/app/searchScreen';
// import ProfileScreen from '../../screens/app/profileScreen';


export type stackScreens = {
    SplashScreen: {};
    LandingScreen: { likedRecipes: [], favoriteRecipes: [], token: string };//{ prop1: string, prop2: string };
    ListingScreen: { id: any, token: string };//{ prop1: string, prop2: string };
    LoginScreen: {};
    // SearchScreen: {};
    // ProfileScreen: {};
    RegisterScreen: {};
    DetailScreen: { id: string, category: string };
}

const Stack = createNativeStackNavigator<stackScreens>();

const MasterStack = () => {
    return (
        <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default MasterStack;

