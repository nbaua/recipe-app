import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('access_token').then(value =>
        navigation.replace(value === null ? 'Auth' : 'Landing'),
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/logo.png')}
        style={styles.brandLogo}
      />
      <Text style={styles.brandLogoText}>Flavour</Text>
      {/* <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      /> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  brandLogo: {width: '72%', resizeMode: 'contain', marginHorizontal: 30},
  brandLogoText: {
    fontFamily: 'VarelaRound-Regular',
    fontSize: 81,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D7538',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
