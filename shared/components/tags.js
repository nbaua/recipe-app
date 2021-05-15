import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from './../constants';

const Tags = props => {
  const {data} = props;

  return (
    <>
      <View style={styles.container}>
        {data.map((t, index) => (
          <TouchableOpacity>
            <Text key={t + '-' + index} style={styles.tag}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Tags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: Constants.__DEFAULT_MARGIN__,
  },
  tag: {
    textTransform: 'capitalize',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    backgroundColor: Constants.__DEFAULT_SHADOW_COLOR__,
    borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
    paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
    paddingVertical: Constants.__DEFAULT_PADDING__ / 2,
    marginHorizontal: Constants.__DEFAULT_PADDING__,
    opacity: 0.5,
  },
});
