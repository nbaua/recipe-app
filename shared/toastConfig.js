/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BaseToast} from 'react-native-toast-message';
import Constants from './constants';
import resources from './resources';
const toastConfig = {
  error: ({text1, text2, props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: Constants.__PRIMARY_ERROR_TEXT_COLOR__,
        height: Constants.__LARGE_ELEM_SIZE__,
      }}
      contentContainerStyle={{paddingHorizontal: Constants.__EXTRA_PADDING__}}
      text1Style={{
        fontFamily: Constants.__DEFAULT_HEADING_FONT__,
        fontSize: Constants.__LARGE_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_BOLD__,
        color: Constants.__PRIMARY_ERROR_TEXT_COLOR__,
      }}
      text2Style={{
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        fontSize: Constants.__DEFAULT_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
      }}
      leadingIconStyle={{
        width: Constants.__MEDIUM_ELEM_SIZE__,
        height: Constants.__MEDIUM_ELEM_SIZE__,
        tintColor: Constants.__PRIMARY_ERROR_TEXT_COLOR__,
      }}
      leadingIconContainerStyle={{
        paddingHorizontal: Constants.__EXTRA_PADDING__ * 2.5,
      }}
      text1={text1}
      text2={text2}
      leadingIcon={resources.toast_error}
    />
  ),
  success: ({text1, text2, props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: Constants.__PRIMARY_SUCCESS_TEXT_COLOR__,
        height: Constants.__LARGE_ELEM_SIZE__,
      }}
      contentContainerStyle={{paddingHorizontal: Constants.__EXTRA_PADDING__}}
      text1Style={{
        fontFamily: Constants.__DEFAULT_HEADING_FONT__,
        fontSize: Constants.__LARGE_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_BOLD__,
        color: Constants.__PRIMARY_SUCCESS_TEXT_COLOR__,
      }}
      text2Style={{
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        fontSize: Constants.__DEFAULT_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
      }}
      leadingIconStyle={{
        width: Constants.__MEDIUM_ELEM_SIZE__,
        height: Constants.__MEDIUM_ELEM_SIZE__,
        tintColor: Constants.__PRIMARY_SUCCESS_TEXT_COLOR__,
      }}
      leadingIconContainerStyle={{
        paddingHorizontal: Constants.__EXTRA_PADDING__ * 2.5,
      }}
      text1={text1}
      text2={text2}
      leadingIcon={resources.toast_success}
    />
  ),
  info: ({text1, text2, props, ...rest}) => (
    <BaseToast
      {...rest}
      style={{
        borderLeftColor: Constants.__PRIMARY_INFO_TEXT_COLOR__,
        height: Constants.__LARGE_ELEM_SIZE__,
      }}
      contentContainerStyle={{paddingHorizontal: Constants.__EXTRA_PADDING__}}
      text1Style={{
        fontFamily: Constants.__DEFAULT_HEADING_FONT__,
        fontSize: Constants.__LARGE_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_BOLD__,
        color: Constants.__PRIMARY_INFO_TEXT_COLOR__,
      }}
      text2Style={{
        fontFamily: Constants.__DEFAULT_ELEMENTS_FONT__,
        fontSize: Constants.__DEFAULT_FONT_SIZE__,
        fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
      }}
      leadingIconStyle={{
        width: Constants.__MEDIUM_ELEM_SIZE__,
        height: Constants.__MEDIUM_ELEM_SIZE__,
        tintColor: Constants.__PRIMARY_INFO_TEXT_COLOR__,
      }}
      leadingIconContainerStyle={{
        paddingHorizontal: Constants.__EXTRA_PADDING__ * 2.5,
      }}
      text1={text1}
      text2={text2}
      leadingIcon={resources.toast_info}
    />
  ),
};
export default toastConfig;
