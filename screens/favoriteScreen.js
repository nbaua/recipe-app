import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Slide} from '../shared/components/carousel/slide';
import Gateway from '../shared/gateway';
import {Styles} from '../shared/styles';
import utils from '../shared/utils';

const FavoriteScreen = props => {
  const ids = useSelector(state => state.favoriteRecipeIds);

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('id').then(id => {
      fetchData(id);
    });
  }, []);

  const fetchData = id => {
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        setLoading(true);
        fetch(
          Gateway.__FAVORITE_RECIPES_BY_USER_ID_URL__.replace('{ID}', id),
          utils.injectGetRequestHeader(token),
        )
          .then(response => response.json())
          .then(responseJson => {
            setDataSource(responseJson[0].favoriteRecipes);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };

  const ItemView = ({item, index}) => {
    const id = item._id;
    return (
      <TouchableOpacity
        style={Styles.itemListContainer}
        onPress={x => {
          Alert.alert(id);
        }}>
        <Slide
          key={index + id}
          nav={props.navigation} //need navigation
          autogrow={true}
          data={item}
          isLarge={true}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Styles.itemListSafeContainer}>
      <View style={Styles.itemListSafeContainer}>
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;
