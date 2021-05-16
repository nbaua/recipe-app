/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Slide} from '../shared/components/carousel/slide';
import ListPager from '../shared/components/listPager';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import {Styles} from '../shared/styles';
import utils from '../shared/utils';

const SearchScreen = props => {
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [metaData, setMetaData] = useState();
  const [searchString, setSearchString] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (props.route.params?.tag !== undefined) {
      setSearchString(props.route.params.tag); //
    }

    if (searchString !== '') {
      fetchData();
    }
  }, [searchString]);

  const fetchData = () => {
    AsyncStorage.getItem('access_token').then(token => {
      if (token) {
        setLoading(true);
        fetch(
          Gateway.__SEARCH_RECIPES_BY_TAG_URL__
            .replace('{TAG}', searchString)
            .replace('{PAGE}', currentPage)
            .replace('{LIMIT}', Constants.__DEFAULT_PAGING_ITEMS_LIMIT__),
          utils.injectGetRequestHeader(token),
        )
          .then(response => response.json())
          .then(responseJson => {
            if (
              responseJson[0] !== undefined &&
              responseJson[0].data.length > 0
            ) {
              setFound(true);
              responseJson[0].meta.pages > 1
                ? setDataSource([...dataSource, ...responseJson[0].data])
                : setDataSource(responseJson[0].data);
              setMetaData(responseJson[0].meta);
              setCurrentPage(responseJson[0].meta.page + 1);
            } else {
              Toast.show({
                type: 'info',
                text1: '' + searchString,
                text2: 'No (more) results returned.',
              });
              setFound(false);
              return;
            }
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            setFound(false);
            console.error(error);
          });
      }
    });
  };

  const renderStickyPager = () => {
    return found && <ListPager loading={loading} metaData={metaData} />;
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
        <TextInput
          style={[
            Styles.authInputText,
            {
              color: Constants.__DEFAULT_TEXT_COLOR__,
              height: Constants.__SMALL_ELEM_SIZE__,
              minHeight: Constants.__SMALL_ELEM_SIZE__,
              maxHeight: Constants.__SMALL_ELEM_SIZE__,
              backgroundColor: Constants.__DEFAULT_BACKGROUND_COLOR__,
              marginVertical: Constants.__DEFAULT_MARGIN__,
            },
          ]}
          defaultValue={searchString}
          placeholder="Type something to search"
          returnKeyType="search"
          autoCapitalize="none"
          blurOnSubmit={false}
          onSubmitEditing={event => {
            setDataSource([]);
            setMetaData(null);
            setCurrentPage(0);
            setLoading(false);
            setSearchString(event.nativeEvent.text);
          }}
        />
        {dataSource && (
          <FlatList
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            renderItem={ItemView}
            // ListHeaderComponent={renderStickyHeader()}
            // stickyHeaderIndices={[0]}
            ListFooterComponent={renderStickyPager}
            onEndReachedThreshold={0.1}
            onEndReached={info => {
              console.log('onEndReached>>>>>>> ', info);
              console.log('onEndReached>>>>>>> ', searchString);
              fetchData();
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default SearchScreen;
