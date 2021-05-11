import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Loader from '../shared/components/loader';
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

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <Text style={styles.btnText}>
          Showing {metaData?.page + 1} of {metaData?.pages}
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={fetchData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? <Loader /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => {}}>
        {item.name.toUpperCase()}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
export default ListingScreen;
