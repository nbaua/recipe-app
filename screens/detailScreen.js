import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Times from '../shared/components/times';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import utils from '../shared/utils';

const DetailScreen = ({route, navigation}) => {
  const {id, category} = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState('');
  const [recipeDetail, setRecipeDetail] = React.useState([]);
  const styles = StyleSheet.create({
    container: {alignContent: 'flex-start', flex: 1},
    backgroundContainer: {
      flexDirection: 'row',
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    background: {
      flex: 1,
      maxWidth: '100%',
      paddingTop: Constants.__EXTRA_PADDING__ * 2,
      height: Constants.__SUPER_LARGE_ELEM_SIZE__,
    },
    headerContainer: {
      flexWrap: 'nowrap',
    },
    title: {
      maxWidth: '100%',
      paddingVertical: Constants.__DEFAULT_PADDING__,
      paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
      backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
      fontFamily: Constants.__DEFAULT_HEADING_FONT__,
      fontSize: Constants.__LARGE_FONT_SIZE__,
      color: Constants.__ALTERNATE_TEXT_COLOR__,
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      paddingVertical: Constants.__EXTRA_PADDING__,
    },
    descContainer: {
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
      fontSize: Constants.__SMALL_FONT_SIZE__,
    },
  });

  React.useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        fetch(
          Gateway.__GET_DETAILS_BY_ID_URL__.replace('{ID}', id),
          utils.injectGetRequestHeader(token),
        )
          .then(r => r.json())
          .then(result => {
            // console.log(result);
            setRecipeDetail(result);
          })
          .catch(e => {
            setRecipeDetail('');
            setError('Exception occurred while fetching recipe: ' + e);
          });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          style={styles.background}
          source={{uri: recipeDetail.pictureUrl}}
          resizeMode="cover">
          <Text>.</Text>
        </ImageBackground>
      </View>
      <View style={styles.headerContainer}>
        <Text numberOfLines={3} style={styles.title}>
          {recipeDetail.name}
        </Text>
      </View>
      {recipeDetail.times && <Times data={recipeDetail.times} />}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.descContainer}>{recipeDetail.description}</Text>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
