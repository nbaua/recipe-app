import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Carousel} from '../shared/components/carousel/carousel';
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
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'bearer ' + token,
            },
          },
        )
          .then(response => response.json())
          .then(result => {
            console.log(result);
            setLoading(false);
            setData(result);
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
        <Carousel
          caption="Recently Viewed By Users"
          type="slide"
          isLarge={true}
          items={data}
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
