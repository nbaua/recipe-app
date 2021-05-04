// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {createRef, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Gateway from '../shared/gateway';
import Resources from '../shared/resources';
import {Styles} from '../shared/styles';
import Loader from './../shared/components/loader';

const RegisterScreen = props => {
  const [userEmail, setUserEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsisRegistered] = useState(false);

  const emailInputRef = createRef();
  const confirmInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');

    if (!userEmail) {
      Alert.alert('Flavor', 'Please Enter Email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    if (!confirmEmail) {
      Alert.alert('Flavor', 'Please Re-Enter Email', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    if (confirmEmail !== userEmail) {
      Alert.alert('Flavor', 'Both Email Fields Should Match', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    if (!userPassword) {
      Alert.alert('Flavor', 'Please Enter Password', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      email: userEmail,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(Gateway.__REGISTER_USER_URL__, {
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
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          setIsisRegistered(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistered) {
    return (
      <View style={Styles.authContainer}>
        <Image source={Resources.large_logo} style={Styles.authLogo} />
        <Text style={Styles.brandLogoText}>Registration Successful</Text>
        <TouchableOpacity
          style={Styles.authButtonContainer}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={Styles.authButton}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
                placeholder="Enter Email"
                keyboardType="email-address"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() =>
                  confirmInputRef.current && confirmInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={Styles.flexRow}>
              <TextInput
                style={Styles.authInputText}
                onChangeText={ConfirmEmail => setConfirmEmail(ConfirmEmail)}
                underlineColorAndroid="#f000"
                placeholderTextColor="#f2f2f2"
                placeholder="Confirm Email"
                keyboardType="email-address"
                ref={confirmInputRef}
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
                underlineColorAndroid="#f000"
                placeholderTextColor="#f2f2f2"
                placeholder="Enter Password"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                blurOnSubmit={false}
              />
            </View>

            {errortext !== '' ? (
              <Text style={Styles.errorText}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={Styles.authButtonContainer}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={Styles.authButtonText}>REGISTER</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#69a14f',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#69a14f',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
