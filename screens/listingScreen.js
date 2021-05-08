import React from 'react';
import {Text, View} from 'react-native';

const ListingScreen = props => {
  return (
    <View>
      <Text>The list of recipes will appear here, {props.category}</Text>
    </View>
  );
};

export default ListingScreen;
