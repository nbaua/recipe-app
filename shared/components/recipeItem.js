import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Constants from './../constants';
import Resources from './../resources';

const RecipeItem = ({item}) => {
  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        style={styles.background}
        source={{uri: item.pictureUrl}}
        // source={{
        //   uri: 'https://via.placeholder.com/400x300',
        // }}
        resizeMode="cover">
        <View style={styles.socialContainer}>
          <View style={styles.socialLeft}>
            <Image style={styles.socialIcon} source={Resources.views} />
            <Text numberOfLines={1} style={styles.social}>
              {item.views}
            </Text>
          </View>
          <View style={styles.socialRight}>
            <Image style={styles.socialIcon} source={Resources.likes} />
            <Text numberOfLines={1} style={styles.social}>
              {item.likes}
            </Text>
          </View>
        </View>
        <Text numberOfLines={3} style={styles.title}>
          {item.name}
        </Text>
      </ImageBackground>
    </View>
  );
};

export default RecipeItem;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    opacity: 0.85,
    display: 'flex',
    flexDirection: 'row',
    height: Constants.__SUPER_LARGE_ELEM_SIZE__,
    backgroundColor: Constants.__DEFAULT_BACKGROUND_COLOR__,
    borderColor: Constants.__DEFAULT_BORDER_COLOR__,
    borderWidth: Constants.__DEFAULT_BORDER_WIDTH__,
    borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
    shadowColor: Constants.__DEFAULT_SHADOW_COLOR__,
    marginVertical: Constants.__DEFAULT_MARGIN__,
  },
  background: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
  },
  title: {
    paddingVertical: Constants.__DEFAULT_PADDING__,
    paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
    backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
    fontFamily: Constants.__DEFAULT_HEADING_FONT__,
    fontSize: Constants.__DEFAULT_FONT_SIZE__,
    color: Constants.__ALTERNATE_TEXT_COLOR__,
  },
  socialIcon: {
    width: Constants.__SMALL_ELEM_SIZE__ / 3,
    height: Constants.__SMALL_ELEM_SIZE__ / 3,
    tintColor: Constants.__ALTERNATE_TEXT_COLOR__,
    marginVertical: Constants.__DEFAULT_MARGIN__ * 1.25,
    marginHorizontal: Constants.__EXTRA_MARGIN__,
  },
  socialContainer: {
    flexDirection: 'row',
  },
  socialLeft: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
  },
  socialRight: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
  },
  social: {
    color: Constants.__ALTERNATE_TEXT_COLOR__,
    fontSize: Constants.__EXTRA_SMALL_FONT_SIZE__,
    fontFamily: Constants.__DEFAULT_HEADING_FONT__,
    marginVertical: Constants.__DEFAULT_MARGIN__,
  },
});
