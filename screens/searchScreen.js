/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Slide} from '../shared/components/carousel/slide';
import ListPager from '../shared/components/listPager';
import Constants from '../shared/constants';
import Gateway from '../shared/gateway';
import resources from '../shared/resources';
import {Styles} from '../shared/styles';
import utils from '../shared/utils';

const SearchScreen = props => {
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [metaData, setMetaData] = useState();
  const [searchString, setSearchString] = useState('');
  const [tempString, setTempString] = useState('');
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
    utils.getAppToken().then(token => {
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
                text1: 'Search Text: `' + searchString + '`',
                text2: 'No matching or additional recipe results found!',
                visibilityTime: 2000,
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

  const renderEmptyList = () => {
    return (
      <Text
        style={[
          Styles.safeContainer,
          Styles.centerAlign,
          Styles.messageInfoText,
        ]}>
        No matching recipe results found!
      </Text>
    );
  };

  const ItemView = ({item, index}) => {
    const id = item._id;
    return (
      <View style={Styles.itemListContainer}>
        <Slide
          key={index + id}
          nav={props.navigation} //need navigation
          autogrow={true}
          data={item}
          isLarge={true}
        />
      </View>
    );
  };

  const resetState = () => {
    setCurrentPage(0);
    setDataSource([]);
    setMetaData(null);
    setLoading(false);
  };

  const onSubmitSearch = event => {
    resetState();
    setSearchString(tempString);
  };

  const onClearSearch = () => {
    resetState();
    setTempString('');
    setSearchString('');
  };

  return (
    <SafeAreaView style={Styles.itemListSafeContainer}>
      <View style={Styles.itemListSafeContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
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
            defaultValue={tempString}
            placeholder="Type something to search"
            returnKeyType="search"
            autoCapitalize="none"
            blurOnSubmit={false}
            onChangeText={v => setTempString(v)}
            onSubmitEditing={onSubmitSearch}
            editable={searchString === ''}
          />
          {searchString === '' && (
            <TouchableOpacity onPress={onSubmitSearch}>
              <Image
                style={{
                  width: Constants.__EXTRA_SMALL_ELEM_SIZE__,
                  height: Constants.__EXTRA_SMALL_ELEM_SIZE__,
                  marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
                  marginHorizontal: Constants.__EXTRA_MARGIN__,
                  tintColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
                }}
                source={resources.search}
              />
            </TouchableOpacity>
          )}
          {searchString !== '' && (
            <TouchableOpacity onPress={onClearSearch}>
              <Image
                style={{
                  width: Constants.__EXTRA_SMALL_ELEM_SIZE__,
                  height: Constants.__EXTRA_SMALL_ELEM_SIZE__,
                  marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
                  marginHorizontal: Constants.__EXTRA_MARGIN__,
                  tintColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
                }}
                source={resources.toast_error}
              />
            </TouchableOpacity>
          )}
        </View>
        {dataSource && (
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            renderItem={ItemView}
            // ListHeaderComponent={renderStickyHeader()}
            // stickyHeaderIndices={[0]}
            ListEmptyComponent={renderEmptyList}
            ListFooterComponent={renderStickyPager}
            onEndReachedThreshold={0.1}
            onEndReached={info => {
              fetchData();
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default SearchScreen;
