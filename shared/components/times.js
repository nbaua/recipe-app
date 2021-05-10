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
    },
    iconBlocks: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingHorizontal: Constants.__DEFAULT_PADDING__,
      flex: 0.3,
    },
    imageBlock: {
      width: Constants.__EXTRA_SMALL_ELEM_SIZE__,
      height: Constants.__EXTRA_SMALL_ELEM_SIZE__,
      marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
      marginHorizontal: Constants.__EXTRA_MARGIN__,
      alignSelf: 'center',
      tintColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
    },
    headBlock: {
      textAlign: 'center',
      color: Constants.__PRIMARY_TEXT_COLOR__,
      fontSize: Constants.__DEFAULT_FONT_SIZE__,
      fontFamily: Constants.__DEFAULT_HEADING_FONT__,
      borderLeftColor: Constants.__DEFAULT_SHADOW_COLOR__,
      // fontWeight: Constants.__FONT_WEIGHT_BOLD__,
      borderLeftWidth: 1,
    },
    textBlock: {
      textAlign: 'center',
      color: Constants.__DEFAULT_TEXT_COLOR__,
      fontSize: Constants.__SMALL_FONT_SIZE__,
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
      borderLeftColor: Constants.__DEFAULT_SHADOW_COLOR__,
      borderLeftWidth: 1,
    },
    subTextBlock: {
      textAlign: 'center',
      color: Constants.__DEFAULT_TEXT_COLOR__,
      fontSize: Constants.__DEFAULT_FONT_SIZE__,
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
    },
  });
  return (
    <>
      {props.data.length !== 0 && (
        <View style={styles.timeElements}>
          <Image style={styles.imageBlock} source={resources.clock} />
          {props.data.map((t, index) => (
            <View key={index} style={styles.timeBlocks}>
              <Text style={styles.headBlock}>{t.type}</Text>
              {t.hr > 0 && <Text style={styles.textBlock}>hrs {t.hr}:</Text>}
              <Text style={styles.textBlock}>{t.min} min</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.timeElements}>
        {props.serve !== '' && (
          <View style={styles.iconBlocks}>
            <Image style={styles.imageBlock} source={resources.serve} />
            <Text style={styles.subTextBlock}>{props.serve}</Text>
          </View>
        )}
        <View style={styles.iconBlocks}>
          <Image style={styles.imageBlock} source={resources.likes} />
          <Text style={styles.subTextBlock}> {props.likes}</Text>
        </View>
        <View style={styles.iconBlocks}>
          <Image style={styles.imageBlock} source={resources.views} />
          <Text style={styles.subTextBlock}> {props.views}</Text>
        </View>
      </View>
    </>
  );
};

export default Times;
