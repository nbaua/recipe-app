import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Constants from '../../shared/artifacts/constants';
import Gateway from '../../shared/artifacts/gateway';
import { Styles } from '../../shared/artifacts/styles';
import { stackScreens } from './../../navigation/stack/masterStack';

import utils from '../../shared/artifacts/utils';
import Carousel from '../../shared/components/carousel';
import Loader from '../../shared/components/loader';
import Separator from '../../shared/components/separator';
type propsType = NativeStackScreenProps<stackScreens, 'LandingScreen'>;
// type UseStateType = {[key: string]: any;name: string;}

const LandingScreen = (props: propsType) => {
    const { navigation } = props;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [randomRecipes, setRandomRecipes] = useState<any | null>(null);
    const [topRatedRecipes, setTopRatedRecipes] = useState<any | null>(null);
    const [mostLikedRecipes, setMostLikedRecipes] = useState<any | null>(null);

    const urls = [
        Gateway.__RANDOM_ITEMS_URL__.replace(
            '{LIMIT}',
            Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__,
        ),
        Gateway.__RANDOM_ITEMS_URL__
            .replace('{LIMIT}', Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__),
        // .replace('{CATEGORY}', 'Recipe'), // to be changed later
        Gateway.__RANDOM_BY_CATEGORY_URL__
            .replace('{LIMIT}', Constants.__DEFAULT_RANDOM_ITEMS_LIMIT__)
            .replace('{CATEGORY}', 'Breakfast'), // to be changed later
    ];
    React.useEffect(() => {
        setLoading(true);
        utils.getAppToken().then(token => {
            if (token) {
                Promise.all(
                    urls.map(url => fetch(url, utils.injectGetRequestHeader(token))),
                )
                    .then(resp => Promise.all(resp.map(r => r.json())))
                    .then(result => {

                        Toast.show(result[0])
                        // console.log(result[0]);
                        if (result.message === 'Unauthorized') {
                            setRandomRecipes(null);
                            setTopRatedRecipes(null);
                            setMostLikedRecipes(null);
                            utils.logoutAndClearSession(navigation);
                            setError('Unauthorized');
                            return;
                        } else {
                            setRandomRecipes(result[0]);
                            setTopRatedRecipes(result[1]);
                            setMostLikedRecipes(result[2]);
                            setLoading(false);
                            setError('');
                        }
                    });

                fetchFavoritesData(token);
            }
        });
    }, []);

    const fetchFavoritesData = (token: string | null) => {
        setLoading(true);
        utils.getObject('id').then(id => {
            if (token !== null) {
                fetch(
                    Gateway.__FAVORITE_RECIPES_BY_USER_ID_URL__.replace('{ID}', id),
                    utils.injectGetRequestHeader(token),
                )
                    .then(response => response.json())
                    .then(responseJson => {
                        utils.setObject('fry', responseJson);
                        setLoading(false);
                    })
                    .catch(err => {
                        setLoading(false);
                        utils.setObject('fry', null);
                        console.error(err);
                    });
                //
                fetch(
                    Gateway.__LIKED_RECIPES_BY_USER_ID_URL__.replace('{ID}', id),
                    utils.injectGetRequestHeader(token),
                )
                    .then(response => response.json())
                    .then(responseJson => {
                        utils.setObject('lry', responseJson);
                        setLoading(false);
                    })
                    .catch(err => {
                        setLoading(false);
                        utils.setObject('lry', null);
                        console.error(err);
                    });
            }
        });
    };

    return (
        <SafeAreaView style={Styles.safeContainer}>
            <ScrollView>
                <View style={Styles.screenContainer}>
                    {loading && <Loader />}
                    {!error && !loading && (
                        <>
                            <Carousel
                                nav={navigation}
                                caption="Recently Viewed By Users"
                                isLarge={true}
                                items={randomRecipes}
                            />
                            <Separator />
                            <Carousel
                                nav={navigation}
                                caption="Top Rated Breakfast Recipes"
                                isLarge={true}
                                items={topRatedRecipes}
                            />
                            <Separator />
                            <Carousel
                                nav={navigation}
                                caption="Most Interesting Recipes"
                                isLarge={true}
                                items={mostLikedRecipes}
                            />
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default LandingScreen;
