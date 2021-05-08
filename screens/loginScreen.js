import AsyncStorage from '@react-native-community/async-storage';
import React, {createRef, useState} from 'react';
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
import Loader from '../shared/components/loader';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import Resources from '../shared/resources';
import {Styles} from '../shared/styles';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      Toast.show({
        type: 'error',
        text1: 'Error Occurred',
        text2: 'Please enter e-mail.',
      });
      return;
    }
    if (!userPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error Occurred',
        text2: 'Please enter password.',
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
        if (res.access_token) {
          AsyncStorage.setItem('access_token', res.access_token);
          // console.log(res.access_token);
          navigation.replace('Landing');
        } else {
          setErrortext(res.msg);
          Toast.show({
            type: 'error',
            text1: 'Error Occurred',
            text2: 'Please check your email id or password',
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
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
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
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  returnKeyType="next"
                />
              </View>
              {errortext !== '' ? (
                <Text style={Styles.errorText}>{errortext}</Text>
              ) : null}
              <TouchableOpacity
                style={Styles.authButtonContainer}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={Styles.authButtonText}>LOGIN</Text>
              </TouchableOpacity>
              <Text
                style={Styles.authSectionText}
                onPress={() => navigation.navigate('Register')}>
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
