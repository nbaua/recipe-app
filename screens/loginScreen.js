import AsyncStorage from '@react-native-community/async-storage';
import React, {createRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Loader from '../shared/components/Loader';
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
      Alert.alert('Flavor', 'Please Enter Email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')}, // to-do validate further
      ]);

      return;
    }
    if (!userPassword) {
      Alert.alert('Flavor', 'Please Enter Password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')}, // to-do validate further
      ]);
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
          console.log(res.access_token);
          navigation.replace('Landing');
        } else {
          setErrortext(res.msg);
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
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
                underlineColorAndroid="#f000"
                placeholderTextColor="#fafafa"
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
                placeholderTextColor="#f2f2f2"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
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
  );
};
export default LoginScreen;
