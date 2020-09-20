import PropTypes from 'prop-types';

import { ViewPropTypes } from 'react-native';

import TextPropTypes from './TextPropTypes';

export const flexibleStyleProptype = PropTypes.oneOfType([
  TextPropTypes.style,
  ViewPropTypes.style,
]);
