import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {Carousel} from '../shared/components/carousel/carousel';

const LandingScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.caption}>
          This is just a dummy text for Landing
        </Text>
        <Carousel
          type="slide"
          isLarge={true}
          items={[
            {
              title: 'The broad and The Wide',
              description:
                'Ultimate book explaining on the differences between the vocabularies people use and the interpretations made by them. You`ll see, How various regions of the same country differ when it comes down to the language.',
            },
            {
              title: 'The ultimate guide to the forbidden act: S....EX',
              description:
                'The world has been speaking this from years and no one has shown a true color to the same. People want it but do not want to discuss it. This book will open up those barriers and would take you to the journey of pleasure and pain viewed by the people of various different cultures.',
            },
            {
              title: 'The money made money and then lost it',
              description:
                'How rich people make more and more money and loose it all at once. The book explores through the true lives of people who were once super rich and how their acts ruined everything in a single go.',
            },
          ]}
        />
      </View>
      <Button
        // eslint-disable-next-line react-native/no-inline-styles
        style={{height: 65}}
        title="Logout ..."
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
    </>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  caption: {fontFamily: 'VarelaRound-Regular', fontSize: 25},
  matter: {fontFamily: 'WorkSans-Regular', fontSize: 15},
});
