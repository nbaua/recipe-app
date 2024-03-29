import AsyncStorage from '@react-native-community/async-storage';
import React, { createRef, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Constants from '../../shared/artifacts/constants';
import Gateway from '../../shared/artifacts/gateway';
import Resources from '../../shared/artifacts/resources';
import { Styles } from '../../shared/artifacts/styles';
import utils from '../../shared/artifacts/utils';
import Loader from '../../shared/components/loader';
import { stackScreens } from './../../navigation/stack/masterStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';

//stack properties defined in masterStack
type propsType = NativeStackScreenProps<stackScreens, 'LoginScreen'>;

const LoginScreen = (props: propsType) => {
  const { navigation } = props;

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrorText('');
    if (!userEmail) {
      Toast.show({
        type: 'error',
        text1: 'Error Occurred',
        text2: 'Please enter e-mail.',
        visibilityTime: 2000,
      });
      return;
    }
    if (!userPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error Occurred',
        text2: 'Please enter password.',
        visibilityTime: 2000,
      });
      return;
    }
    setLoading(true);

    fetch(Gateway.__LOGIN_AUTH_URL__, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false);

        if (res.token) {
          AsyncStorage.setItem('email', userEmail);
          AsyncStorage.setItem('access_token', res.token);
          AsyncStorage.setItem('id', res.id);
          utils.setObject('fr', res.fr);
          utils.setObject('lr', res.lr);
          navigation.navigate('LandingScreen', { favoriteRecipes: res.fr, likedRecipes: res.lr, token: res.token }); //todo change logic
        } else {
          setErrorText(res.msg);
          Toast.show({
            type: 'error',
            text1: 'Error Occurred',
            text2: 'Please check your email id or password',
            visibilityTime: 2000,
          });
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={Styles.safeContainer}>
      <View style={Styles.authContainer}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={Styles.authContainer}>
          <View>
            <KeyboardAvoidingView enabled>
              <View style={Styles.centerAlign}>
                <Image source={Resources.large_logo} style={Styles.authLogo} />
                <Text style={Styles.brandLogoText}>Flavour</Text>
              </View>
              <View style={Styles.flexRow}>
                <TextInput
                  style={Styles.authInputText}
                  onChangeText={UserEmail => setUserEmail(UserEmail)}
                  placeholderTextColor={Constants.__ALTERNATE_TEXT_COLOR__}
                  autoCapitalize="none"
                  placeholder="Enter Email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  // onSubmitEditing={() =>
                  //   passwordInputRef.current && passwordInputRef.current.focus()
                  // }
                  blurOnSubmit={false}
                />
              </View>
              <View style={Styles.flexRow}>
                <TextInput
                  style={Styles.authInputText}
                  onChangeText={UserPassword => setUserPassword(UserPassword)}
                  placeholder="Enter Password" //12345
                  placeholderTextColor={Constants.__ALTERNATE_TEXT_COLOR__}
                  keyboardType="default"
                  // ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  returnKeyType="next"
                />
              </View>
              {errorText !== '' ? (
                <Text style={Styles.errorText}>{errorText}</Text>
              ) : null}
              <TouchableOpacity
                style={Styles.authButtonContainer}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={Styles.authButtonText}>LOGIN</Text>
              </TouchableOpacity>
              <Text
                style={Styles.authSectionText}
                onPress={() => navigation.navigate('RegisterScreen', {})}>
                New Here ? Register
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
