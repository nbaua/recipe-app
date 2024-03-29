import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';

export function injectGetRequestHeader(token:any) {
    return {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'bearer ' + token,
        },
    };
}

export function logoutAndClearSession(navigation:any) {
    AsyncStorage.clear();
    Toast.show({
        type: 'info',
        text1: 'Session Expired',
        text2: 'Please login again.',
        visibilityTime: 2000,
    });
    navigation.replace('Auth');
}

export async function getAppToken() {
    return await AsyncStorage.getItem('access_token');
}

export async function getObject(objectKey: any) {
    const result:any = await AsyncStorage.getItem(objectKey);
    return _isJsonString(result) === true ? JSON.parse(result) : result;
}

export function setObject(objectKey: any, objectValue: any) {
    let parsedObject = _isObject(objectValue)
        ? JSON.stringify(objectValue)
        : objectValue;
    AsyncStorage.setItem(objectKey, parsedObject);
    return true;
}

function _isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function _isObject(item: any) {
    return (
        (typeof item === 'object' && item !== null) ||
        (Array.isArray(item) && item !== null)
    );
}
export default {
    injectGetRequestHeader,
    logoutAndClearSession,
    getAppToken,
    getObject,
    setObject,
};
