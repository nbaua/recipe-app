import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Slide} from '../shared/components/carousel/slide';
import {Styles} from '../shared/styles';
import utils from '../shared/utils';

const FavoriteScreen = props => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchDataFromStorage();
  }, []);

  const fetchDataFromStorage = () => {
    utils.getObject('fr').then(fr => {
      if (fr !== null) {
        setDataSource(fr);
        setLoading(false);
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
