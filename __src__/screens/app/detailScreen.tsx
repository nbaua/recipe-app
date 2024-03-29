import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { stackScreens } from '../../navigation/stack/masterStack';
import Constants from '../../shared/artifacts/constants';
import Gateway from '../../shared/artifacts/gateway';
import Resources from '../../shared/artifacts/resources';
import utils from '../../shared/artifacts/utils';
import Ingredient from './widgets/ingredient';
import Instruction from './widgets/instruction';
import Tags from './widgets/tag';
import Times from './widgets/time';

type propsType = NativeStackScreenProps<stackScreens, 'DetailScreen'>;

const DetailScreen = (props: propsType) => {

    //     const route = useRoute<any | null>();

    //     const { name, birthYear } = route.params;

    //     return (
    //         <View>
    //             <Text>Detail Screen - {props.route.params.id}</Text>
    //         </View>
    //     );
    // };
    {

        const { id, category } = props.route.params;
        const [loading, setLoading] = useState(true);
        const [userId, setUserId] = useState('');
        const [userToken, setUserToken] = useState('');
        const [isFavorite, setIsFavorite] = useState(false);
        const [error, setError] = useState('');
        const [viewSteps, setViewSteps] = useState(0);
        const [recipeDetail, setRecipeDetail] = useState<any>([]);

        const styles = StyleSheet.create({
            container: { alignContent: 'flex-start', flex: 1 },
            backgroundContainer: {
                flexDirection: 'row',
                maxWidth: '100%',
                display: 'flex',
                flexWrap: 'wrap',
            },
            background: {
                flex: 1,
                maxWidth: '100%',
                paddingTop: Constants.__EXTRA_PADDING__ * 2,
                height: Constants.__SUPER_LARGE_ELEM_SIZE__,
            },
            headerContainer: {
                flexWrap: 'nowrap',
            },
            title: {
                maxWidth: '100%',
                paddingVertical: Constants.__DEFAULT_PADDING__,
                paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
                backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
                fontFamily: Constants.__DEFAULT_HEADING_FONT__,
                fontSize: Constants.__LARGE_FONT_SIZE__,
                color: Constants.__ALTERNATE_TEXT_COLOR__,
            },
            scrollContainer: {
                flex: 1,
                paddingHorizontal: Constants.__EXTRA_PADDING__,
                paddingVertical: Constants.__EXTRA_PADDING__,
            },
            descContainer: {
                paddingVertical: Constants.__DEFAULT_PADDING__,
                paddingHorizontal: Constants.__EXTRA_PADDING__,
                fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
                fontSize: Constants.__SMALL_FONT_SIZE__,
            },
            switchContainer: {
                flexWrap: 'nowrap',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: Constants.__EXTRA_MARGIN__,
            },
            switch: {
                textTransform: 'capitalize',
                backgroundColor: Constants.__DEFAULT_BACKGROUND_COLOR__,
                paddingVertical: Constants.__DEFAULT_PADDING__,
                paddingHorizontal: Constants.__EXTRA_PADDING__,
                fontFamily: Constants.__DEFAULT_HEADING_FONT__,
                fontSize: Constants.__SMALL_FONT_SIZE__,
                marginHorizontal: Constants.__DEFAULT_MARGIN__,
                borderRadius: Constants.__EXTRA_BORDER_RADIUS__,
                borderColor: Constants.__DEFAULT_SHADOW_COLOR__,
                borderWidth: Constants.__DEFAULT_BORDER_WIDTH__,
            },
            rightIconContain: {
                backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
                borderRadius: Constants.__EXTRA_BORDER_RADIUS__,
                padding: Constants.__DEFAULT_PADDING__,
                marginVertical: Constants.__EXTRA_MARGIN__ * 2,
                opacity: 0.8,
            },
            favIcon: {
                padding: Constants.__DEFAULT_PADDING__,
                margin: Constants.__DEFAULT_MARGIN__ / 1.5,
                tintColor: Constants.__PRIMARY_TEXT_COLOR__,
                width: Constants.__EXTRA_SMALL_ELEM_SIZE__,
                height: Constants.__EXTRA_SMALL_ELEM_SIZE__,
            },
        });

        React.useEffect(() => {
            setLoading(true);

            utils.getObject('id').then(uid => {
                setUserId(uid);
            });

            utils.getObject('fr').then(fr => {
                setIsFavorite(fr.includes(id));
            });

            utils.getAppToken().then(token => {
                if (token) {
                    setUserToken(token);
                    fetch(
                        Gateway.__GET_DETAILS_BY_ID_URL__.replace('{ID}', id),
                        utils.injectGetRequestHeader(token),
                    )
                        .then(r => r.json())
                        .then(result => {
                            // console.log(result);
                            setRecipeDetail(result);
                        })
                        .catch(e => {
                            setRecipeDetail([]);
                            setError('Exception occurred while fetching recipe: ' + e);
                        });
                }
            });
        }, []);

        return (
            <ScrollView style={styles.container}>
                <View style={styles.backgroundContainer}>
                    <ImageBackground
                        style={styles.background}
                        source={{ uri: recipeDetail.pictureUrl }}
                        resizeMode="cover">
                        <Text>.</Text>
                    </ImageBackground>
                </View>
                <View style={styles.headerContainer}>
                    <Text numberOfLines={3} style={styles.title}>
                        {recipeDetail.name}
                    </Text>
                </View>
                {recipeDetail.times && (
                    <Times
                        id={id}
                        data={recipeDetail.times}
                        serve={recipeDetail.servings}
                        likes={recipeDetail.likes}
                        views={recipeDetail.views}
                    />
                )}
                {recipeDetail.description !== '' && (
                    <Text style={styles.descContainer}>{recipeDetail.description}</Text>
                )}
                {recipeDetail.tags !== undefined && recipeDetail.tags.length > 0 && (
                    <Tags nav={props.navigation} data={recipeDetail.tags} />
                )}
                <View style={styles.switchContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setViewSteps(0);
                        }}>
                        <Text
                            style={[
                                styles.switch,
                                {
                                    color:
                                        viewSteps === 0
                                            ? Constants.__PRIMARY_TEXT_COLOR__
                                            : Constants.__DEFAULT_TEXT_COLOR__,
                                    backgroundColor:
                                        viewSteps === 0
                                            ? Constants.__PRIMARY_BACKGROUND_COLOR__
                                            : Constants.__DEFAULT_SHADOW_COLOR__,
                                },
                            ]}>
                            Ingredients
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            addRemoveFavorite(
                                !isFavorite,
                                userToken,
                                userId,
                                recipeDetail._id,
                            );
                            setIsFavorite(!isFavorite);
                        }}>
                        <Image
                            style={styles.favIcon}
                            source={isFavorite ? Resources.favorite_on : Resources.favorite}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setViewSteps(1);
                        }}>
                        <Text
                            style={[
                                styles.switch,
                                {
                                    color:
                                        viewSteps === 1
                                            ? Constants.__PRIMARY_TEXT_COLOR__
                                            : Constants.__DEFAULT_TEXT_COLOR__,
                                    backgroundColor:
                                        viewSteps === 1
                                            ? Constants.__PRIMARY_BACKGROUND_COLOR__
                                            : Constants.__DEFAULT_SHADOW_COLOR__,
                                },
                            ]}>
                            Instructions
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    scrollEnabled={false}//fix the issue for  - virtualized list should never be nested
                    horizontal={false}
                    style={styles.scrollContainer}
                    // keyExtractor={(item, index) => {
                    //     viewSteps > 0 ? index + '-' + item._id : index + '-' + item.name;
                    // }}
                    renderItem={item => renderIngredients(item, viewSteps)} //{renderIngredients}
                    data={
                        viewSteps > 0 ? recipeDetail.instructions : recipeDetail.ingredients
                    }
                />
            </ScrollView>
        );
    }
}

const addRemoveFavorite = (mode: any, authToken: any, userId: any, recipeId: any) => {
    fetch(
        mode === true
            ? Gateway.__ADD_FAVORITE_RECIPE_BY_IDS_URL__
            : Gateway.__REMOVE_FAVORITE_RECIPE_BY_IDS_URL__,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + authToken,
            },
            body: JSON.stringify({
                userId: userId,
                recipeId: recipeId,
            }),
        },
    )
        .then(response => response.json())
        .then(res => {
            const result = utils.setObject('fry', res);
            if (result) {
                //also update the single ids
                utils.getObject('fr').then(fr => {
                    if (mode) {
                        utils.setObject('fr', [...fr, recipeId]);
                    } else {
                        utils.setObject(
                            'fr',
                            fr.filter(r => r !== recipeId),
                        );
                    }
                });
                Toast.show({
                    type: 'info',
                    text1: '',
                    text2: 'Your favorite recipes updated.',
                    visibilityTime: 2000,
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
};

const renderIngredients = ({ item, index }: any, viewSteps: any) =>
    viewSteps > 0 ? (
        <Instruction key={item._id + '-' + index} index={index} item={item} />
    ) : (
        <Ingredient key={item.name + '-' + index} index={index} item={item} />
    );


export default DetailScreen;
