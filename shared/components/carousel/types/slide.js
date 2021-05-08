import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from './../../../constants';

export const Slide = (props: any) => {
  const {autogrow, data, nav, isLarge} = props;
  const styles = StyleSheet.create({
    container: {flex: 1},
    slide: {
      flex: 1,
      flexDirection: 'row',
      flexBasis: '100%',
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
      paddingTop: Constants.__EXTRA_PADDING__ * 2,
      height: isLarge
        ? Constants.__SUPER_LARGE_ELEM_SIZE__
        : Constants.__EXTRA_LARGE_ELEM_SIZE__,
    },
    contentWrapper: {
      backgroundColor: Constants.__DEFAULT_LIGHT_TRANS_BACKGROUND_COLOR,
      flex: 1,
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      paddingVertical: Constants.__DEFAULT_PADDING__,
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
      minHeight: Constants.__MEDIUM_ELEM_SIZE__ / 1.5,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={p => {
        nav.navigate('Detail', {id: data._id});
      }}>
      <ImageBackground
        style={styles.slide}
        source={{uri: data.pictureUrl}}
        resizeMode="cover">
        <View style={styles.contentWrapper}>
          <Text numberOfLines={1} style={styles.itemHeader}>
            {data.name}
          </Text>
          <Text numberOfLines={3} style={styles.itemContent}>
            {data.description || data.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Slide;
