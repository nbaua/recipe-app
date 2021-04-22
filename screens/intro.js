import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>This is just a dummy text for Intro</Text>
      <Text style={styles.matter}>This is just a dummy text for Intro</Text>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  caption: {fontFamily: 'VarelaRound-Regular', fontSize: 25},
  matter: {fontFamily: 'WorkSans-Regular', fontSize: 15},
});
