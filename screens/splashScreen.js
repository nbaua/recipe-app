import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import Resources from '../shared/resources';
import {Styles} from '../shared/styles';
import utils from '../shared/utils';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(true);
      //if authenticated, Land or else Login
      utils.getAppToken().then(token => {
        navigation.replace(token === null ? 'Auth' : 'Landing');
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
