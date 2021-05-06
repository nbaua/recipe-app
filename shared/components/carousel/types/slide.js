import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Constants from './../../../constants';

export const Slide = (props: any) => {
  const {title, pictureUrl, autogrow, description, isLarge} = props;
  const styles = StyleSheet.create({
    slide: {
      flex: 1,
      flexDirection: 'row',
      flexBasis: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      paddingBottom: Constants.__DEFAULT_PADDING__,
      paddingTop: Constants.__EXTRA_PADDING__ * 2,
      height: isLarge
        ? Constants.__SUPER_LARGE_ELEM_SIZE__
        : Constants.__EXTRA_LARGE_ELEM_SIZE__,
    },
    image: {
      width: Constants.__LARGE_ELEM_SIZE__,
      height: Constants.__LARGE_ELEM_SIZE__,
    },
    imageWrapper: {
      borderWidth: Constants.__DEFAULT_BORDER_WIDTH__,
      borderColor: Constants.__DEFAULT_BORDER_COLOR__,
      borderBottomEndRadius: Constants.__EXTRA_BORDER_RADIUS__,
      height: Constants.__LARGE_ELEM_SIZE__ + Constants.__EXTRA_PADDING__ * 2,
    },
    imageRow: {
      flexDirection: 'row',
      flex: 1,
      height:
        autogrow === true
          ? null
          : Constants.__LARGE_ELEM_SIZE__ + Constants.__EXTRA_PADDING__ * 2,
    },
    contentWrapper: {
      // width: '70%',
      flex: 1,
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      height:
        autogrow === true
          ? null
          : Constants.__LARGE_ELEM_SIZE__ - Constants.__EXTRA_PADDING__ * 2,
    },

    itemHeader: {
      fontFamily: Constants.__DEFAULT_HEADING_FONT__,
      fontSize: Constants.__DEFAULT_FONT_SIZE__,
      fontWeight: Constants.__FONT_WEIGHT_BOLD__,
      color: Constants.__PRIMARY_TEXT_COLOR__,
    },
    itemContent: {
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
      fontSize: Constants.__SMALL_FONT_SIZE__,
      fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
      color: Constants.__DEFAULT_TEXT_COLOR__,
    },
  });

  return (
    <View style={styles.slide}>
      <View style={styles.imageRow}>
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: pictureUrl}}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.itemHeader}>{title}</Text>
          <Text style={styles.itemContent}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Slide;
