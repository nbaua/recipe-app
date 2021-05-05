import {Platform} from 'react-native';

export default {
  __PRIMARY_BACKGROUND_COLOR__: '#fafafa',
  __ALTERNATE_BACKGROUND_COLOR__: '#0D7538',

  __PRIMARY_TEXT_COLOR__: '#0D7538',
  __DEFAULT_TEXT_COLOR__: '#333333',
  __ALTERNATE_TEXT_COLOR__: '#fafafa',

  __PRIMARY_ERROR_TEXT_COLOR__: '#ff0000',
  __ALTERNATE_ERROR_TEXT_COLOR__: '#ffef00',

  __HINT_TEXT_COLOR__: '#ffffff',
  __BORDER_COLOR__: '#dadada',

  __DEFAULT_HEADING_FONT__: 'VarelaRound-Regular',
  __DEFAULT_ELEMENTS_FONT__: 'WorkSans-Regular',

  __EXTRA_SMALL_FONT_SIZE__: 12,
  __SMALL_FONT_SIZE__: 14,
  __DEFAULT_FONT_SIZE__: 18,
  __LARGE_FONT_SIZE__: 24,
  __EXTRA_LARGE_FONT_SIZE__: 36,
  __SUPER_LARGE_FONT_SIZE__: 81,

  __DEFAULT_MARGIN__: 6,
  __DEFAULT_PADDING__: 6,
  __DEFAULT_BORDER_RADIUS__: 6,
  __DEFAULT_BORDER_WIDTH__: 1,

  __EXTRA_MARGIN__: 18,
  __EXTRA_PADDING__: 18,
  __EXTRA_BORDER_RADIUS__: 18,
  __EXTRA_BORDER_WIDTH__: 3,

  __SMALL_ICON_SIZE__: 24,
  __LARGE_ICON_SIZE__: 48,

  __SMALL_ELEM_SIZE__: 40,
  __MEDIUM_ELEM_SIZE__: 80,
  __LARGE_ELEM_SIZE__: 120,
  __EXTRA_LARGE_ELEM_SIZE__: 160,
  __SUPER_LARGE_ELEM_SIZE__: 240,

  __FONT_WEIGHT_NORMAL__: Platform.OS === 'ios' ? 400 : 'normal',
  __FONT_WEIGHT_BOLD__: Platform.OS === 'ios' ? 700 : 'bold',

  __LOW_LOGO_DIMS_PERCENT__: '25%',
  __MEDIUM_LOGO_DIMS_PERCENT__: '50%',
  __HIGH_LOGO_DIMS_PERCENT__: '75%',
};
