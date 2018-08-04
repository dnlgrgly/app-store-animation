import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

const Text = ({ isBlack, isBold, isMedium, style, children }) => (
  <RNText
    style={[
      {
        fontFamily: isBlack
          ? 'InterUI-Black'
          : isBold
            ? 'InterUI-Bold'
            : isMedium
              ? 'InterUI-Medium'
              : 'InterUI-Regular',
      },
      style,
    ]}
  >
    {children}
  </RNText>
);

Text.propTypes = {
  isBlack: PropTypes.bool,
  isBold: PropTypes.bool,
  isMedium: PropTypes.bool,
  style: PropTypes.any,
  children: PropTypes.any,
};

Text.defaultProps = {
  isBlack: false,
  isBold: false,
  isMedium: false,
  style: {},
  children: {},
};

export { Text };
