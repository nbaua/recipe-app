/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../../shared/artifacts/constants';


const Instruction = (props: any) => {
    const { _id, step, description, header } = props.item;

    return (
        <View
            style={[
                styles.alternateRow,
                {
                    backgroundColor:
                        header === true ? Constants.__ALTERNATE_BACKGROUND_COLOR__ :
                            props.index % 2 === 0
                                ? null
                                : Constants.__DEFAULT_BACKGROUND_COLOR__,
                },
            ]}>
            <Text style={styles.stepper}>{step}</Text>
            {description !== '' && <Text style={header == false ? styles.step : styles.head}>{description}</Text>}
        </View>
    );
};

export default Instruction;

const styles = StyleSheet.create({
    alternateRow: {
        paddingVertical: Constants.__DEFAULT_PADDING__,
        flex: 1,
        flexDirection: 'row',
        borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
        marginBottom: Constants.__DEFAULT_MARGIN__,
    },
    stepper: {
        flex: 0.2,
        textTransform: 'capitalize',
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        fontSize: Constants.__SMALL_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
        color: Constants.__PRIMARY_TEXT_COLOR__,
        paddingHorizontal: Constants.__DEFAULT_PADDING__,
    },
    step: {
        flex: 0.8,
        textTransform: 'capitalize',
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        fontSize: Constants.__SMALL_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
        color: Constants.__DEFAULT_TEXT_COLOR__,
        paddingHorizontal: Constants.__DEFAULT_PADDING__,
    },
    head: {
        flex: 0.8,
        textTransform: 'uppercase',
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        fontSize: Constants.__SMALL_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_BOLD__,
        color: Constants.__ALTERNATE_TEXT_COLOR__,
        paddingHorizontal: Constants.__DEFAULT_PADDING__,
    },
});
