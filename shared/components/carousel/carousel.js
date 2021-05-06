import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from './../../constants';
import {Slide} from './types/slide';
import {Stat} from './types/stat';

export const Carousel = (props: any) => {
  const styles = StyleSheet.create({
    statsHead: {
      paddingTop: Constants.__DEFAULT_PADDING__,
      paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
    },
    container: {
      width: '100%',
      backgroundColor: Constants.__DEFAULT_BACKGROUND_COLOR__,
      borderColor: Constants.__DEFAULT_BORDER_COLOR__,
      borderWidth: Constants.__DEFAULT_BORDER_WIDTH__,
      borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
      shadowColor: Constants.__DEFAULT_SHADOW_COLOR__,
      shadowOpacity: 1,
      marginVertical: Constants.__DEFAULT_MARGIN__,
      shadowOffset: {
        width: 0,
        height: Constants.__DEFAULT_MARGIN__,
      },
      elevation:
        Platform.OS === 'ios' ? null : Constants.__DEFAULT_MARGIN__ / 2,
    },
    scrollView: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
    },
    captionText: {
      textAlignVertical: 'center',
      fontSize: Constants.__EXTRA_SMALL_FONT_SIZE__,
      color: Constants.__DEFAULT_TEXT_COLOR__,
      paddingHorizontal: Constants.__DEFAULT_PADDING__ * 3,
    },
    captionWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    bullets: {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      paddingTop: Constants.__DEFAULT_PADDING__,
    },
    bullet: {
      paddingHorizontal: Constants.__DEFAULT_PADDING__ / 3,
      fontSize: Constants.__LARGE_FONT_SIZE__,
    },
  });
  const {caption, items, type, isLarge} = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (_width: number) => {
    setWidth(_width);
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset: any) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset + 1 < (width / intervals) * i) {
        return i;
      }
      if (i === intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1,
        }}>
        &bull;
      </Text>,
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={data => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast">
        {items.map((item: any, index: number) => {
          switch (type) {
            case 'stats':
              return (
                <Stat
                  key={index}
                  title={item.title}
                  description={item.description}
                />
              );
            default:
              return (
                <Slide
                  key={index}
                  autogrow={true}
                  pictureUrl={item.pictureUrl}
                  title={item.name}
                  description={item.description || item.name}
                  isLarge={isLarge}
                />
              );
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>
        {caption > 0 && (
          <TouchableOpacity
            style={styles.captionWrapper}
            //onPress={() => navigation.navigate({toWhere}, {withParam})}
          >
            <Text style={styles.captionText}>{caption}</Text>
          </TouchableOpacity>
        )}
        {bullets}
      </View>
    </View>
  );
};

export default Carousel;
