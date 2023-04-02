/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from '../../../shared/artifacts/constants';


const Tags = (props: any) => {
    const { data } = props;
    if (data && data.length > 0)

        return (
            <>
                <Text style={styles.container}>Related search tags</Text>
                <View style={styles.container}>
                    {data.map((t: any, index: any) => (
                        <TouchableOpacity
                            key={t + '-' + index}
                            onPress={() => {
                                // props.nav.replace('Search', {
                                //   tag: t,
                                // }); to-do -fix navigation stack issues
                            }}>
                            <Text key={t + '-' + index} style={styles.tag}>
                                {t}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </>
        );
};

export default Tags;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: Constants.__DEFAULT_MARGIN__,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: Constants.__DEFAULT_SHADOW_COLOR__,
        fontSize: Constants.__EXTRA_SMALL_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_BOLD__,
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
    },
    tag: {
        textTransform: 'capitalize',
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        backgroundColor: Constants.__DEFAULT_SHADOW_COLOR__,
        borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
        paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
        paddingVertical: Constants.__DEFAULT_PADDING__ / 2,
        marginHorizontal: Constants.__DEFAULT_PADDING__,
        opacity: 0.5,
    },
});
