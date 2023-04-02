import React, { useState } from 'react';
/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Constants from '../../../shared/artifacts/constants';
import Gateway from '../../../shared/artifacts/gateway';
import Resources from '../../../shared/artifacts/resources';
import utils from '../../../shared/artifacts/utils';
import { Styles } from '../../../shared/artifacts/styles';

const Times = (props: any) => {
    const [userToken, setUserToken] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState('');
    const [likedCount, setLikedCount] = useState(0);

    React.useEffect(() => {
        utils.getObject('id').then(uid => {
            setUserId(uid);
        });

        utils.getObject('lr').then(lr => {
            setIsLiked(lr?.includes(props.id));
        });

        utils.getAppToken().then(token => {
            if (token) {
                setUserToken(token);
            }

            setLikedCount(props.likes);
        });
    }, []);

    const styles = StyleSheet.create({
        headPadding: {
            paddingStart: 0,
            paddingEnd: 0,
        },
        timeElements: {
            flexDirection: 'row',
            textAlignVertical: 'center',
            alignItems: 'stretch',
            direction: 'inherit',
            flexWrap: 'wrap',
            borderBottomColor: Constants.__DEFAULT_SHADOW_COLOR__,
            borderBottomWidth: 1,
        },
        timeBlocks: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',

        },
        iconBlocks: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            paddingHorizontal: Constants.__DEFAULT_PADDING__,
            flex: 1,
            marginStart: 15,
            marginEnd: 15,
        },
        imageBlock: {
            width: Constants.__EXTRA_SMALL_ELEM_SIZE__,
            height: Constants.__EXTRA_SMALL_ELEM_SIZE__,
            marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
            marginHorizontal: Constants.__EXTRA_MARGIN__,
            alignSelf: 'center',
            tintColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
        },
        headBlock: {
            textAlign: 'center',
            color: Constants.__PRIMARY_TEXT_COLOR__,
            fontSize: Constants.__DEFAULT_FONT_SIZE__,
            fontFamily: Constants.__DEFAULT_HEADING_FONT__,
            borderLeftColor: Constants.__DEFAULT_SHADOW_COLOR__,
            // fontWeight: Constants.__FONT_WEIGHT_BOLD__,
            borderLeftWidth: 1,
        },
        textBlock: {
            textAlign: 'center',
            color: Constants.__DEFAULT_TEXT_COLOR__,
            fontSize: Constants.__SMALL_FONT_SIZE__,
            fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
            borderLeftColor: Constants.__DEFAULT_SHADOW_COLOR__,
            borderLeftWidth: 1,
        },
        subTextBlock: {
            textAlign: 'center',
            color: Constants.__DEFAULT_TEXT_COLOR__,
            fontSize: Constants.__SMALL_FONT_SIZE__,
            fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        },
    });
    return (
        <View style={styles.headPadding}>
            {props.data && props.data.length !== 0 && (
                <View style={styles.timeElements}>
                    <Image style={styles.imageBlock} source={Resources.clock} />
                    {props.data.map((t: any, index: any) => (
                        <View key={index} style={styles.timeBlocks}>
                            <Text style={styles.headBlock}>{t.type}</Text>
                            {t.hr > 0 && <Text style={styles.textBlock}>hrs {t.hr}:</Text>}
                            <Text style={styles.textBlock}>{t.min} min</Text>
                        </View>
                    ))}
                </View>
            )}
            <View style={styles.timeElements}>
                {props.serve !== '' && (
                    <View style={styles.iconBlocks}>
                        <Image style={styles.imageBlock} source={Resources.serve} />
                        <Text style={styles.subTextBlock}>{props.serve}</Text>
                    </View>
                )}
                <View style={styles.iconBlocks}>
                    <TouchableOpacity
                        onPress={() => {
                            addRemoveLikes(!isLiked, userToken, userId, props.id);
                            setIsLiked(!isLiked);
                            setLikedCount(
                                !isLiked === true ? likedCount + 1 : likedCount - 1,
                            );
                        }}>
                        <Image
                            style={styles.imageBlock}
                            source={isLiked ? Resources.likes_on : Resources.likes}
                        />
                    </TouchableOpacity>
                    <Text style={styles.subTextBlock}> {likedCount}</Text>
                </View>
                <View style={styles.iconBlocks}>
                    <Image style={styles.imageBlock} source={Resources.views} />
                    <Text style={styles.subTextBlock}> {props.views}</Text>
                </View>
            </View>
        </View>
    );
};

const addRemoveLikes = (mode: any, authToken: any, userId: any, recipeId: any) => {
    fetch(
        mode === true
            ? Gateway.__ADD_LIKED_RECIPE_BY_IDS_URL__
            : Gateway.__REMOVE_LIKED_RECIPE_BY_IDS_URL__,
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
            const result = utils.setObject('lry', res);
            if (result) {
                //also update the single ids
                utils.getObject('lr').then(lr => {
                    if (mode) {
                        utils.setObject('lr', [...lr, recipeId]);
                    } else {
                        utils.setObject(
                            'lr',
                            lr?.filter((r: any) => r !== recipeId),
                        );
                    }
                });
                Toast.show({
                    type: 'info',
                    text1: '',
                    text2: 'Your liked recipes updated.',
                    visibilityTime: 2000,
                });
            }
        })
        .catch(error => {
            console.error(error);
        });
};

export default Times;
