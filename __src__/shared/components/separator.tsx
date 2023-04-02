import React, { createRef, useState } from 'react';
import Constants from '../artifacts/constants';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    lineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Constants.__DEFAULT_PADDING__,
    },
    lineContent: {
        color: Constants.__PRIMARY_TEXT_COLOR__,
        letterSpacing: Constants.__DEFAULT_PADDING__ / 2,
        opacity: 0.75,
    },
});
const Separator = ({ }) => {
    return (
        <View style={styles.lineContainer}>
            <Text style={styles.lineContent}>
                &#9866;&#9866;&#9866;&#10034;&#9866;&#9866;&#9866;
            </Text>
        </View>
    );

}
export default Separator;
