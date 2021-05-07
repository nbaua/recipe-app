import AsyncStorage from '@react-native-community/async-storage';

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
  navigation.replace('Auth');
}

export default {injectGetRequestHeader, logoutAndClearSession};
