import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from '../artifacts/constants';
import Resources from '../artifacts/resources';

const CarouselSlide = (props: any) => {
    const { autoGrow, data, nav, isLarge } = props;
    const styles = StyleSheet.create({
        container: { flex: 1 },
        slide: {
            flex: 1,
            flexDirection: 'row',
            flexBasis: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            paddingTop: Constants.__EXTRA_PADDING__ * 2,
            height: isLarge
                ? Constants.__SUPER_LARGE_ELEM_SIZE__
                : Constants.__EXTRA_LARGE_ELEM_SIZE__,
        },
        contentWrapper: {
            backgroundColor: Constants.__DEFAULT_LIGHT_TRANS_BACKGROUND_COLOR__,
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            paddingHorizontal: Constants.__EXTRA_PADDING__,
            paddingVertical: Constants.__DEFAULT_PADDING__,
        },

        itemHeader: {
            fontFamily: Constants.__DEFAULT_HEADING_FONT__,
            fontSize: Constants.__DEFAULT_FONT_SIZE__,
            fontWeight: Constants.__FONT_WEIGHT_BOLD__,
            color: Constants.__PRIMARY_TEXT_COLOR__,
        },
        itemContent: {
            fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
            fontSize: Constants.__SMALL_FONT_SIZE__,
            fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
            color: Constants.__DEFAULT_TEXT_COLOR__,
        },
        socialIcon: {
            width: Constants.__SMALL_ELEM_SIZE__ / 2,
            height: Constants.__SMALL_ELEM_SIZE__ / 2,
            tintColor: Constants.__ALTERNATE_TEXT_COLOR__,
            marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
            marginHorizontal: Constants.__EXTRA_MARGIN__ / 2,
        },
        socialContainer: {
            flexDirection: 'row',
        },
        socialLeft: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: Constants.__ALTERNATE_TRANS_BACKGROUND_COLOR__,
            alignItems: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        socialCenter: {
            flex: 4,
            backgroundColor: Constants.__ALTERNATE_TRANS_BACKGROUND_COLOR__,
        },
        socialRight: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: Constants.__ALTERNATE_TRANS_BACKGROUND_COLOR__,
            alignItems: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        social: {
            color: Constants.__ALTERNATE_TEXT_COLOR__,
            fontSize: Constants.__SMALL_FONT_SIZE__,
            fontFamily: Constants.__DEFAULT_HEADING_FONT__,
            marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
        },
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                nav.navigate('DetailScreen', { id: data._id });
            }}>
            <ImageBackground
                style={styles.slide}
                source={{ uri: data.pictureUrl }}
                resizeMode="cover">
                <View style={styles.contentWrapper}>
                    <Text numberOfLines={1} style={styles.itemHeader}>
                        {data.name}
                    </Text>
                </View>
                <View style={styles.socialContainer}>
                    <View style={styles.socialLeft}>
                        <Image style={styles.socialIcon} source={Resources.views} />
                        <Text numberOfLines={1} style={styles.social}>
                            {data.views}
                        </Text>
                    </View>
                    <View style={styles.socialCenter}>
                        <Text numberOfLines={3} style={styles.social}>
                            {data.description || data.name}
                        </Text>
                    </View>
                    <View style={styles.socialRight}>
                        <Image style={styles.socialIcon} source={Resources.likes} />
                        <Text numberOfLines={1} style={styles.social}>
                            {data.likes}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

}
export default CarouselSlide;
