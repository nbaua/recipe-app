import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constants from './../../../constants';

export const Stat = (props: any) => {
  const {description, title} = props;
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      maxWidth: '33%',
      flexBasis: '33%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      paddingVertical: Constants.__EXTRA_PADDING__,
    },
    statText: {
      fontFamily: Constants.__DEFAULT_HEADING_FONT__,
      fontSize: Constants.__DEFAULT_FONT_SIZE__,
      fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
      color: Constants.__DEFAULT_TEXT_COLOR__,
    },
    statCaptionWrapper: {
      textAlign: 'left',
      marginBottom: Constants.__DEFAULT_MARGIN__,
    },
    statCaption: {
      textAlign: 'left',
      fontSize: Constants.__EXTRA_SMALL_FONT_SIZE__,
      color: Constants.__DEFAULT_TEXT_COLOR__,
      fontWeight: Constants.__FONT_WEIGHT_BOLD__,
      paddingTop: Constants.__DEFAULT_PADDING__,
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text style={{...styles.statText}}>whats that{title}</Text>
      <View style={styles.statCaptionWrapper}>
        <Text style={{...styles.statCaption}}>this is it{description}</Text>
      </View>
    </View>
  );
};

export default Stat;
