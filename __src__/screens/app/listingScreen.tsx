import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import Constants from '../../shared/artifacts/constants';
import Gateway from '../../shared/artifacts/gateway';
import { Styles } from '../../shared/artifacts/styles';
import { stackScreens } from './../../navigation/stack/masterStack';

import utils from '../../shared/artifacts/utils';
import CarouselSlide from '../../shared/components/carouselSlide';
import ListPager from '../../shared/components/listPager';
type propsType = NativeStackScreenProps<stackScreens, 'ListingScreen'>;
// type UseStateType = {[key: string]: any;name: string;}

const ListingScreen = (props: propsType) => {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource]: any = useState([]);
    const [metaData, setMetaData] = useState();
    const [currentPage, setCurrentPage]: any = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        utils.getAppToken().then(token => {
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

    const ItemView = ({ item, index }: any) => {
        const id = item._id;
        return (
            <TouchableOpacity
                style={Styles.itemListContainer}
                onPress={x => {
                    Alert.alert(id);
                }}>
                <CarouselSlide
                    key={index + id}
                    nav={props.navigation} //need navigation
                    autoGrow={true}
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
                    // enableEmptySections={true}
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
}
export default ListingScreen;
