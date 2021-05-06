import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import {Carousel} from '../shared/components/carousel/carousel';
import {Styles} from './../shared/styles';

const LandingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={Styles.safeContainer}>
      <View style={Styles.screenContainer}>
        <Text style={Styles.caption}>
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
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
