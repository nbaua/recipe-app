import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Carousel} from '../shared/components/carousel/carousel';
import Separator from '../shared/components/separator';
import utils from '../shared/components/utils';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import {Styles} from './../shared/styles';

const LandingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState('');
  const [randomRecipes, setRandomRecipes] = React.useState([]);
  const [topRatedRecipes, setTopRatedRecipes] = React.useState([]);
  const [mostLikedRecipes, setMostLikedRecipes] = React.useState([]);

  const urls = [
    Gateway.__RANDOM_ITEMS_URL__.replace(
      '{LIMIT}',
      Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__,
    ),
    Gateway.__RANDOM_BY_CATEGORY_URL__
      .replace('{LIMIT}', Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__)
      .replace('{CATEGORY}', 'Recipe'), // to be changed later
    Gateway.__RANDOM_BY_CATEGORY_URL__
      .replace('{LIMIT}', Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__)
      .replace('{CATEGORY}', 'bk-all'), // to be changed later
  ];
  React.useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        Promise.all(
          urls.map(url => fetch(url, utils.injectGetRequestHeader(token))),
        )
          .then(resp => Promise.all(resp.map(r => r.json())))
          .then(result => {
            // console.log(result[0]);
            if (result.message === 'Unauthorized') {
              setRandomRecipes(null);
              setTopRatedRecipes(null);
              setMostLikedRecipes(null);
              utils.logoutAndClearSession(navigation);
              setError('Unauthorized');
              return;
            } else {
              setRandomRecipes(result[0]);
              setTopRatedRecipes(result[1]);
              setMostLikedRecipes(result[2]);
              setLoading(false);
              setError('');
            }
          });
      }
    });
  }, []);

  return (
    <SafeAreaView style={Styles.safeContainer}>
      <ScrollView>
        <View style={Styles.screenContainer}>
          {!error && (
            <>
              <Carousel
                caption="Recently Viewed By Users"
                isLarge={true}
                items={randomRecipes}
              />
              <Separator />
              <Carousel
                caption="Top Rated Breakfast Recipes"
                isLarge={true}
                items={topRatedRecipes}
              />
              <Separator />
              <Carousel
                caption="Most Interesting Recipes"
                isLarge={true}
                items={mostLikedRecipes}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingScreen;
