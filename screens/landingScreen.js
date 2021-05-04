import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {Carousel} from '../shared/components/carousel/carousel';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>This is just a dummy text for Landing</Text>
      <Carousel
        style="slide"
        items={[
          {
            title: 'Welcome, swipe to continue.',
          },
          {
            title: 'About feature X.',
          },
          {
            title: 'About feature Y.',
          },
        ]}
      />
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
