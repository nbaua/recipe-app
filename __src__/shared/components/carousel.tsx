import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Constants from '../artifacts/constants';
import CarouselSlide from './carouselSlide';

const Carousel = (props: any) => {

    const styles = StyleSheet.create({
        statsHead: {
            paddingTop: Constants.__DEFAULT_PADDING__,
            paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
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
        scrollView: {
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
        },

        bullets: {
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            paddingHorizontal: Constants.__EXTRA_PADDING__,
            backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
            borderBottomLeftRadius: Constants.__EXTRA_BORDER_RADIUS__,
        },
        bullet: {
            fontSize: Constants.__LARGE_FONT_SIZE__,
            color: Constants.__ALTERNATE_TEXT_COLOR__,
        },
        captionText: {
            fontSize: Constants.__DEFAULT_FONT_SIZE__,
            marginVertical: Constants.__DEFAULT_MARGIN__,
            paddingHorizontal: Constants.__EXTRA_PADDING__,
        },
        bulletText: {
            color: Constants.__ALTERNATE_TEXT_COLOR__,
            fontSize: Constants.__EXTRA_LARGE_FONT_SIZE__,
            fontWeight: Constants.__FONT_WEIGHT_BOLD__,
            marginVertical: Constants.__DEFAULT_MARGIN__ * -2.25,
            paddingHorizontal: Constants.__DEFAULT_PADDING__,
        },
    });
    const { items, isLarge, caption, nav } = props;
    const itemsPerInterval =
        props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

    const [interval, setInterval] = useState<any | null>(1);
    const [intervals, setIntervals] = useState<any | null>(1);
    const [width, setWidth] = useState<any | null>(0);

    const init = (_width: number) => {
        setWidth(_width);
        const totalItems = items.length;
        setIntervals(Math.ceil(totalItems / itemsPerInterval));
    };

    const getInterval = (offset: number | undefined) => {
        if (offset === undefined) {
            offset = 0;
        }

        for (let i = 1; i <= intervals; i++) {
            if (offset + 1 < (width / intervals) * i) {
                return i;
            }
            if (i === intervals) {
                return i;
            }
        }
    };

    let bullets = [];
    for (let i = 1; i <= intervals; i++) {
        bullets.push(
            <Text
                key={i}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                    ...styles.bullet,
                    opacity: interval === i ? 0.75 : 0.25,
                }}>
                &bull;
            </Text>,
        );
    }

    if (items && items.length > 0)

        return (
            <View style={styles.container}>
                <Text style={styles.captionText}>{caption}</Text>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        ...styles.scrollView,
                        width: `${100 * intervals}%`,
                    }}
                    onScroll={data => {
                        setWidth(data.nativeEvent.contentSize.width);
                        setInterval(getInterval(data.nativeEvent.contentOffset.x));
                    }}
                    showsHorizontalScrollIndicator={false}
                    onContentSizeChange={(width, height) => init(width)}
                    scrollEventThrottle={200}
                    pagingEnabled
                    decelerationRate="fast">
                    {
                        items!.map((item: any, index: number) => {
                            if (items && items.length > 0)
                                return (
                                    <CarouselSlide
                                        key={index}
                                        nav={nav}
                                        autoGrow={true}
                                        data={item}
                                        isLarge={isLarge}
                                    />
                                );
                        })}
                </ScrollView>

                <View style={styles.bullets}>
                    {bullets}
                    <TouchableOpacity
                        // style={styles.container}
                        onPress={() => {
                            nav.navigate('ListingScreen');
                        }}>
                        <Text style={styles.bulletText}>»</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

}
export default Carousel;
