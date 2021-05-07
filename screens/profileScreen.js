import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import utils from '../shared/components/utils';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>This is just a dummy text for Profile</Text>
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
                  utils.logoutAndClearSession(navigation);
                },
              },
            ],
            {cancelable: false},
          );
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  caption: {fontFamily: 'VarelaRound-Regular', fontSize: 25},
  matter: {fontFamily: 'WorkSans-Regular', fontSize: 15},
});
