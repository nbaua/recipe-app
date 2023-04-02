import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../artifacts/constants';

const ListPager = ({ loading, metaData }: any) => {
    return (
        <View>
            {loading === true && <Text style={styles.stickyControl}>Loading...</Text>}
            {loading === false && (
                <Text style={styles.stickyControl}>
                    Page {metaData?.pages} Loaded ({metaData?.total} total results)
                </Text>
            )}
        </View>
    );
};

export default ListPager;

const styles = StyleSheet.create({
    stickyControl: {
        height: Constants.__SMALL_ELEM_SIZE__,
        backgroundColor: Constants.__DEFAULT_DARK_TRANS_BACKGROUND_COLOR__,
        borderWidth: 1,
        borderColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
        borderRadius: Constants.__EXTRA_SMALL_ELEM_SIZE__,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Constants.__ALTERNATE_TEXT_COLOR__,
        marginVertical: Constants.__DEFAULT_MARGIN__ * 2,
        width: '60%',
        alignSelf: 'center',
        fontFamily: Constants.__DEFAULT_HEADING_FONT__,
        fontSize: Constants.__SMALL_FONT_SIZE__,
    },

});
