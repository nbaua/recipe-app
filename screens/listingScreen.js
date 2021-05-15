import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Slide} from '../shared/components/carousel/slide';
import ListPager from '../shared/components/listPager';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import utils from '../shared/utils';

const ListingScreen = props => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [metaData, setMetaData] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        setLoading(true);
        fetch(
          Gateway.__GET_RECIPES_WITH_PAGINATION_URL__
            .replace('{PAGE}', currentPage)
            .replace('{LIMIT}', Constants.__DEFAULT_PAGING_ITEMS_LIMIT__),
          utils.injectGetRequestHeader(token),
        )
          .then(response => response.json())
          .then(responseJson => {
            setDataSource([...dataSource, ...responseJson[0].data]);
            setMetaData(responseJson[0].meta);
            setCurrentPage(responseJson[0].meta.page + 1);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };

  const renderStickyPager = () => {
    return <ListPager loading={loading} metaData={metaData} />;
  };

  const ItemView = ({item, index}) => {
    const id = item._id;
    return (
      <TouchableOpacity
        style={styles.container}
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
    <SafeAreaView style={styles.safeContainer}>
      {props.mode === 'listing' && (
        <Text style={styles.bulletText}>VIEW MORE</Text>
      )}
      <View style={styles.safeContainer}>
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
          // ListHeaderComponent={renderStickyPager}
          // stickyHeaderIndices={[0]}
          ListFooterComponent={renderStickyPager}
          onEndReachedThreshold={0.6}
          onEndReached={info => {
            fetchData();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    marginVertical: Constants.__DEFAULT_MARGIN__,
    paddingHorizontal: Constants.__DEFAULT_MARGIN__,
  },
  container: {
    width: '100%',
    overflow: 'hidden',
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
      Platform.OS === 'ios' ? null : Constants.__DEFAULT_SHADOW_ELEVATION__,
  },
});
export default ListingScreen;
