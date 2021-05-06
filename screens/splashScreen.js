import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import Resources from '../shared/resources';
import {Styles} from '../shared/styles';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //if authenticated, Land or else Login
      AsyncStorage.getItem('access_token').then(value =>
        navigation.replace(value === null ? 'Auth' : 'Landing'),
      );
    }, 3000);
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
