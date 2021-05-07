import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Carousel} from '../shared/components/carousel/carousel';
import utils from '../shared/components/utils';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import {Styles} from './../shared/styles';

const LandingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        fetch(
          Gateway.__RANDOM_ITEMS_URL__.replace(
            '{LIMIT}',
            Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__,
          ),
          utils.injectGetRequestHeader(token),
        )
          .then(response => response.json())
          .then(result => {
            if (result.message === 'Unauthorized') {
              setData(null);
              utils.logoutAndClearSession(navigation);
              return;
            } else {
              setData(result);
            }
            setLoading(false);
          })
          .catch(e => {
            setLoading(false);
            setError('fetch failed');
          });
      }
    });
  }, []);

  return (
    <SafeAreaView style={Styles.safeContainer}>
      <View style={Styles.screenContainer}>
        {data && (
          <Carousel
            caption="Recently Viewed By Users"
            type="slide"
            isLarge={true}
            items={data}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
