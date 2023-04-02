import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import Resources from '../shared/artifacts/resources';
import { Styles } from '../shared/artifacts/styles';
import utils from '../shared/artifacts/utils';
import { stackScreens } from './../navigation/stack/masterStack';

//stack properties defined in masterStack
type propsType = NativeStackScreenProps<stackScreens, 'SplashScreen'>;

const SplashScreen = (props: propsType) => {
    const { navigation } = props;
    const [animating, setAnimating] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setAnimating(true);
            //if authenticated, Land or else Login
            utils.getAppToken().then(authToken => {
                if (authToken === null) // 'LandingScreen'
                    navigation.push("LoginScreen", {});
                else
                    navigation.push("LandingScreen", { likedRecipes: [], favoriteRecipes: [], token: authToken });
            });
        }, 1000);
    }, []);


    return (
        <SafeAreaView style={Styles.safeContainer}>
            <View style={[Styles.authContainer, Styles.centerAlign]}>
                <Image source={Resources.large_logo} style={Styles.authLogo} />
                <Text style={Styles.brandLogoText}>Flavour</Text>
            </View>
        </SafeAreaView>
    );
};
export default SplashScreen;
