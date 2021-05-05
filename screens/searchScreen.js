import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>This is just a dummy text for Search</Text>
      <Text style={styles.matter}>This is just a dummy text for Search</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  caption: {fontFamily: 'VarelaRound-Regular', fontSize: 125},
  matter: {fontFamily: 'WorkSans-Regular', fontSize: 15},
});
