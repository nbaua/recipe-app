import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>This is just a dummy text for Favorite</Text>
      <Text style={styles.matter}>This is just a dummy text for Favorite</Text>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  caption: {fontFamily: 'VarelaRound-Regular', fontSize: 25},
  matter: {fontFamily: 'WorkSans-Regular', fontSize: 15},
});
