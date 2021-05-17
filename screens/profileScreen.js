import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from '../shared/constants';
import Resources from '../shared/resources';
import {Styles} from '../shared/styles';
import utils from '../shared/utils';

const ProfileScreen = ({navigation}) => {
  const [email, setEmail] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      //if authenticated, Land or else Login
      AsyncStorage.getItem('email').then(value => {
        setEmail(value);
      });
    }, 1000);
  }, []);

  const handleSubmitPress = () => {
    utils.logoutAndClearSession(navigation);
  };

  return (
    <SafeAreaView style={Styles.safeContainer}>
      <View
        style={[
          Styles.authContainer,
          {backgroundColor: Constants.__PRIMARY_BACKGROUND_COLOR__},
        ]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            Styles.authContainer,
            {backgroundColor: Constants.__PRIMARY_BACKGROUND_COLOR__},
          ]}>
          <View>
            <View style={Styles.centerAlign}>
              <Image source={Resources.large_logo} style={Styles.authLogo} />
              <Text
                style={[
                  Styles.brandLogoText,
                  {
                    color: Constants.__PRIMARY_TEXT_COLOR__,
                  },
                ]}>
                Flavour
              </Text>
              <Text
                numberOfLines={2}
                style={[Styles.centerAlign, Styles.messageInfoText]}>
                You've signed in with: {email}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                Styles.authButtonContainer,
                {
                  backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
                  color: Constants.__ALTERNATE_TEXT_COLOR__,
                },
              ]}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text
                style={[
                  Styles.authButtonText,
                  {color: Constants.__ALTERNATE_TEXT_COLOR__},
                ]}>
                LOGOUT
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
