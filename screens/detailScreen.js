/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ingredient from '../shared/components/ingredient';
import Instruction from '../shared/components/instruction';
import Tags from '../shared/components/tags';
import Times from '../shared/components/times';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import Resources from '../shared/resources';
import utils from '../shared/utils';

const DetailScreen = ({route, navigation}) => {
  const {id, category} = route.params;
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);
  const [error, setError] = React.useState('');
  const [viewSteps, setViewSteps] = React.useState(0);
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
      paddingVertical: Constants.__DEFAULT_PADDING__,
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
      fontSize: Constants.__SMALL_FONT_SIZE__,
    },
    switchContainer: {
      flexWrap: 'nowrap',
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: Constants.__EXTRA_MARGIN__,
    },
    switch: {
      textTransform: 'capitalize',
      backgroundColor: Constants.__DEFAULT_BACKGROUND_COLOR__,
      paddingVertical: Constants.__DEFAULT_PADDING__,
      paddingHorizontal: Constants.__EXTRA_PADDING__,
      fontFamily: Constants.__DEFAULT_HEADING_FONT__,
      fontSize: Constants.__SMALL_FONT_SIZE__,
      marginHorizontal: Constants.__DEFAULT_MARGIN__,
      borderRadius: Constants.__EXTRA_BORDER_RADIUS__,
      borderColor: Constants.__DEFAULT_SHADOW_COLOR__,
      borderWidth: Constants.__DEFAULT_BORDER_WIDTH__,
    },
    rightIconContain: {
      backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
      borderRadius: Constants.__EXTRA_BORDER_RADIUS__,
      padding: Constants.__DEFAULT_PADDING__,
      marginVertical: Constants.__EXTRA_MARGIN__ * 2,
      opacity: 0.8,
    },
    rightIcon: {
      padding: Constants.__DEFAULT_PADDING__,
      margin: Constants.__DEFAULT_MARGIN__,
      tintColor: Constants.__PRIMARY_TEXT_COLOR__,
    },
  });

  React.useEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => (
    //     <View style={styles.rightIconContain}>
    //       <Image style={styles.rightIcon} source={Resources.favorite} />
    //     </View>
    //   ),
    // });
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
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
        {recipeDetail.times && (
          <Times
            data={recipeDetail.times}
            serve={recipeDetail.servings}
            likes={recipeDetail.likes}
            views={recipeDetail.views}
          />
        )}
        {recipeDetail.description !== '' && (
          <Text style={styles.descContainer}>{recipeDetail.description}</Text>
        )}
        {recipeDetail.tags !== undefined && recipeDetail.tags.length > 0 && (
          <Tags data={recipeDetail.tags} />
        )}
        <View style={styles.switchContainer}>
          <TouchableOpacity
            onPress={() => {
              setViewSteps(0);
            }}>
            <Text
              style={[
                styles.switch,
                {
                  color:
                    viewSteps === 0
                      ? Constants.__PRIMARY_TEXT_COLOR__
                      : Constants.__DEFAULT_TEXT_COLOR__,
                  backgroundColor:
                    viewSteps === 0
                      ? Constants.__PRIMARY_BACKGROUND_COLOR__
                      : Constants.__DEFAULT_SHADOW_COLOR__,
                },
              ]}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsFavorite(!isFavorite);
            }}>
            <Image
              style={styles.rightIcon}
              source={isFavorite ? Resources.favorite_on : Resources.favorite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setViewSteps(1);
            }}>
            <Text
              style={[
                styles.switch,
                {
                  color:
                    viewSteps === 1
                      ? Constants.__PRIMARY_TEXT_COLOR__
                      : Constants.__DEFAULT_TEXT_COLOR__,
                  backgroundColor:
                    viewSteps === 1
                      ? Constants.__PRIMARY_BACKGROUND_COLOR__
                      : Constants.__DEFAULT_SHADOW_COLOR__,
                },
              ]}>
              Instructions
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal={false}
          style={styles.scrollContainer}
          keyExtractor={item => item._id}
          renderItem={item => renderIngredients(item, viewSteps)} //{renderIngredients}
          data={
            viewSteps > 0 ? recipeDetail.instructions : recipeDetail.ingredients
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const renderIngredients = ({item, index}, viewSteps) =>
  viewSteps > 0 ? (
    <Instruction index={index} item={item} />
  ) : (
    <Ingredient index={index} item={item} />
  );

export default DetailScreen;
