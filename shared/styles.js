import {StyleSheet} from 'react-native';
import Constants from './constants';

export const Styles = StyleSheet.create({
  /**GENERIC STYLES**/
  safeContainer: {
    flex: 1,
  },
  screenContainer: {
    padding: Constants.__EXTRA_PADDING__,
  },
  centerAlign: {alignItems: 'center'},
  flexRow: {
    flexDirection: 'row',
    height: Constants.__SMALL_ELEM_SIZE__,
    marginVertical: Constants.__EXTRA_MARGIN__,
    marginHorizontal: Constants.__EXTRA_MARGIN__,
  },
  errorText: {
    textAlign: 'center',
    color: Constants.__PRIMARY_ERROR_TEXT_COLOR__,
    fontSize: Constants.__SMALL_FONT_SIZE__,
  },

  brandLogo: {
    resizeMode: 'contain',
    width: Constants.__HIGH_LOGO_DIMS_PERCENT__,
    marginHorizontal: Constants.__EXTRA_MARGIN__ * 2,
  },
  brandLogoText: {
    textAlign: 'center',
    fontFamily: Constants.__DEFAULT_HEADING_FONT__,
    fontSize: Constants.__SUPER_LARGE_FONT_SIZE__,
    color: Constants.__ALTERNATE_TEXT_COLOR__,
  },
  fancyToolbar: {
    backgroundColor: Constants.__ALTERNATE_BACKGROUND_COLOR__,
    borderRadius: Constants.__EXTRA_SMALL_ELEM_SIZE__,
    margin: Constants.__EXTRA_MARGIN__,
    paddingVertical: Constants.__EXTRA_SMALL_ELEM_SIZE__,
    opacity: 0.75,
  },
  /**SPECIFIC STYLES*/
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#0D7538',
  },
  authLogo: {
    resizeMode: 'contain',
    width: Constants.__MEDIUM_LOGO_DIMS_PERCENT__,
    height: Constants.__MEDIUM_LOGO_DIMS_PERCENT__,
    marginHorizontal: Constants.__EXTRA_MARGIN__ * 2,
    marginVertical: Constants.__EXTRA_MARGIN__,
  },
  authInputText: {
    flex: 1,
    color: Constants.__ALTERNATE_TEXT_COLOR__,
    fontSize: Constants.__DEFAULT_FONT_SIZE__,
    fontWeight: Constants.__FONT_WEIGHT_NORMAL__,
    paddingHorizontal: Constants.__DEFAULT_PADDING__ * 2,
    borderWidth: Constants.__DEFAULT_BORDER_WIDTH__,
    borderRadius: Constants.__DEFAULT_BORDER_RADIUS__,
    borderColor: Constants.__DEFAULT_BORDER_COLOR__,
    height: Constants.__SMALL_ELEM_SIZE__,
  },

  authButtonContainer: {
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: Constants.__PRIMARY_BACKGROUND_COLOR__,
    borderColor: Constants.__DEFAULT_BORDER_COLOR__,
    height: Constants.__SMALL_ELEM_SIZE__,
    borderRadius: Constants.__EXTRA_BORDER_RADIUS__,
    marginHorizontal: Constants.__EXTRA_MARGIN__,
    marginVertical: Constants.__DEFAULT_MARGIN__,
  },
  authButtonText: {
    color: Constants.__PRIMARY_TEXT_COLOR__,
    paddingVertical: 10,
    fontFamily: Constants.__DEFAULT_HEADING_FONT__,
    fontSize: Constants.__DEFAULT_FONT_SIZE__,
  },
  authSectionText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Constants.__ALTERNATE_ERROR_TEXT_COLOR__,
    fontWeight: Constants.__FONT_WEIGHT_BOLD__,
    fontSize: Constants.__DEFAULT_FONT_SIZE__,
    padding: Constants.__DEFAULT_PADDING__,
  },
});
