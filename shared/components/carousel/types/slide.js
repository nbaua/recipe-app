import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Slide = (props: any) => {
  const {title} = props;
  const styles = StyleSheet.create({
    slide: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      paddingTop: 30,
      flexBasis: '100%',
      flex: 1,
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      height: 200,
    },
    slideText: {
      width: '100%',
      textAlign: 'left',
      fontSize: 20,
    },
  });
  return (
    <View style={styles.slide}>
      <Text style={{...styles.slideText}}>{title}</Text>
    </View>
  );
};

export default Slide;
