import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { createRef, useState } from 'react';
import { stackScreens } from '../../navigation/stack/masterStack';
import { Text } from 'react-native';

type propsType = NativeStackScreenProps<stackScreens, 'ProfileScreen'>;

const ProfileScreen = (props: propsType) => {
    return (
        <>
            <Text>Related profile</Text>
        </>)
}
export default ProfileScreen;
