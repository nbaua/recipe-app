import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Constants from '../constants';
import resources from './../resources';

const Times = props => {
  const styles = StyleSheet.create({
    timeElements: {
      flexDirection: 'row',
      textAlignVertical: 'center',
      alignItems: 'stretch',
      direction: 'inherit',
      flexWrap: 'wrap',
      borderBottomColor: Constants.__DEFAULT_SHADOW_COLOR__,
      borderBottomWidth: 1,
    },
    timeBlocks: {
      flex: 0.8,
      justifyContent: 'center',
      flexDirection: 'column',
      paddingVertical: Constants.__DEFAULT_PADDING__,
    },
    imageBlock: {
      width: Constants.__EXTRA_SMALL_ELEM_SIZE__,
      height: Constants.__EXTRA_SMALL_ELEM_SIZE__,
      margin: Constants.__EXTRA_SMALL_ELEM_SIZE__,
      alignSelf: 'center',
    },
    headBlock: {
      textAlign: 'center',
      color: Constants.__PRIMARY_TEXT_COLOR__,
      fontSize: Constants.__LARGE_FONT_SIZE__,
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
      borderLeftColor: Constants.__DEFAULT_SHADOW_COLOR__,
      borderLeftWidth: 1,
    },
    textBlock: {
      textAlign: 'center',
      color: Constants.__DEFAULT_TEXT_COLOR__,
      fontSize: Constants.__SMALL_FONT_SIZE__,
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
      fontWeight: Constants.__FONT_WEIGHT_BOLD__,
      borderLeftColor: Constants.__DEFAULT_SHADOW_COLOR__,
      borderLeftWidth: 1,
    },
  });
  return (
    <View style={styles.timeElements}>
      <Image style={styles.imageBlock} source={resources.clock} />
      {props.data.map((t, index) => (
        <View key={index} style={styles.timeBlocks}>
          <Text style={styles.headBlock}>{t.type}</Text>
          <Text style={styles.textBlock}>
            H {t.hr}:{t.min} M
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Times;
