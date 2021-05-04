import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>This is just a dummy text for Landing</Text>
      <Button
        title="Logout"
        onPress={() => {
          Alert.alert(
            'Logout',
            'Are you sure? You want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  return null;
                },
              },
              {
                text: 'Confirm',
                onPress: () => {
                  AsyncStorage.clear();
                  navigation.replace('Auth');
                },
              },
            ],
            {cancelable: false},
          );
        }}
      />
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  caption: {fontFamily: 'VarelaRound-Regular', fontSize: 25},
  matter: {fontFamily: 'WorkSans-Regular', fontSize: 15},
});
