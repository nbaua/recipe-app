import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import utils from '../shared/components/utils';
import Gateway from '../shared/gateway';

const DetailScreen = ({route, navigation}) => {
  const {id, category} = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState('');
  const [recipeDetail, setRecipeDetail] = React.useState([]);

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
            console.log('Result', result);
          });
      }
    });
  }, []);

  return (
    //
    <View>
      <Text>
        Some Text for id: {id} and {category}
      </Text>
    </View>
  );
};

export default DetailScreen;
