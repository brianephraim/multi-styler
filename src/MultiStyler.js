import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View as ViewOriginal,
  Text as TextOriginal,
  TextInput as TextInputOriginal,
  ScrollView as ScrollViewOriginal,
  FlatList as FlatListOriginal,
  Animated,
  TouchableOpacity as TouchableOpacityOriginal,
} from 'react-native';
import { makeLightModeMultiStyler } from './CombinedStylers';

import { flexibleStyleProptype } from './flexibleStyleProptype';

export function makeMultiStyler(Comp) {
  class MultiStyler extends PureComponent {
    static isMultiStyler = true;
    static propType = {
      style: flexibleStyleProptype,
      style1: flexibleStyleProptype,
      style2: flexibleStyleProptype,
      style3: flexibleStyleProptype,
      style4: flexibleStyleProptype,
      comp: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
    static defaultProps = {
      style: null,
      style1: null,
      style2: null,
      style3: null,
      style4: null,
    };
    state = {};
    static getDerivedStateFromProps(props, state) {
      if (
        props.style !== state.styleCache ||
        props.style1 !== state.style1Cache ||
        props.style2 !== state.style2Cache ||
        props.style3 !== state.style3Cache ||
        props.style4 !== state.style4Cache
      ) {
        return {
          styleCache: props.style,
          style1Cache: props.style1,
          style2Cache: props.style2,
          style3Cache: props.style3,
          style4Cache: props.style4,
          style: [props.style, props.style1, props.style2, props.style3, props.style4].filter(
            item => !!item
          ),
        };
      }
      return null;
    }
    render() {
      const {
        style,
        style1,
        style2,
        style3,
        style4,
        comp,
        ...remainingProps
      } = this.props;
      const ComponentToUse = comp || Comp;
      return (
        <ComponentToUse
          ref={this.props.forwardedRef}
          {...remainingProps}
          style={this.state.style}
        />
      );
    }
  }
  return MultiStyler;
}

const MultiStyler = makeMultiStyler();
export default MultiStyler;

const ViewMultiStyler = makeMultiStyler(ViewOriginal);
const ViewLightModeMultiStyler = makeLightModeMultiStyler(ViewMultiStyler);
const View = ViewMultiStyler;
export { View, ViewMultiStyler, ViewLightModeMultiStyler };

const TextMultiStyler = makeMultiStyler(TextOriginal);
const TextLightModeMultiStyler = makeLightModeMultiStyler(TextMultiStyler);
const Text = TextMultiStyler;
export { Text, TextMultiStyler, TextLightModeMultiStyler };

const TextInputMultiStyler = makeMultiStyler(TextInputOriginal);
const TextInput = TextInputMultiStyler;
export { TextInput, TextInputMultiStyler };

const AnimatedView = makeMultiStyler(Animated.View);
const AnimatedViewMultiStyler = AnimatedView;
export { AnimatedView, AnimatedViewMultiStyler };

const TouchableOpacity = makeMultiStyler(TouchableOpacityOriginal);
const TouchableOpacityMultiStyler = TouchableOpacity;
export { TouchableOpacity, TouchableOpacityMultiStyler };

const ScrollViewMultiStyler = makeMultiStyler(ScrollViewOriginal);
const ScrollViewLightModeMultiStyler = makeLightModeMultiStyler(
  ScrollViewMultiStyler
);
export { ScrollViewMultiStyler, ScrollViewLightModeMultiStyler };

const FlatListMultiStyler = makeMultiStyler(FlatListOriginal);
export { FlatListMultiStyler };
