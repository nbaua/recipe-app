import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

export function injectGetRequestHeader(token) {
  return {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    },
  };
}

export function logoutAndClearSession(navigation) {
  AsyncStorage.clear();
  Toast.show({
    type: 'info',
    text1: 'Session Expired',
    text2: 'Please login again.',
    visibilityTime: 2000,
  });
  navigation.replace('Auth');
}

export default {injectGetRequestHeader, logoutAndClearSession};
