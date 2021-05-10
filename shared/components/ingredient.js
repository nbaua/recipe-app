/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Constants from './../constants';

const Ingredient = props => {
  const {amount, name, unit} = props.item;

  return (
    <View
      style={[
        styles.alternateRow,
        {
          backgroundColor:
            props.index % 2 === 0
              ? null
              : Constants.__DEFAULT_BACKGROUND_COLOR__,
        },
      ]}>
      <Text style={styles.title}>{name}</Text>
      {amount !== '' && (
        <Text style={styles.subTitle}>
          {amount}&nbsp;
          {unit}
        </Text>
      )}
    </View>
  );
};

export default Ingredient;

const styles = StyleSheet.create({
  alternateRow: {
    paddingVertical: Constants.__DEFAULT_PADDING__ * 2,
    flex: 1,
    flexDirection: 'row',
    borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
  },
  title: {
    flex: 0.67,
    textTransform: 'capitalize',
    fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
    fontSize: Constants.__SMALL_FONT_SIZE__,
    fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
    paddingHorizontal: Constants.__DEFAULT_PADDING__,
  },
  subTitle: {
    flex: 0.33,
    textTransform: 'capitalize',
    fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
    fontSize: Constants.__SMALL_FONT_SIZE__,
    fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
    color: Constants.__PRIMARY_TEXT_COLOR__,
    paddingHorizontal: Constants.__DEFAULT_PADDING__,
  },
});
