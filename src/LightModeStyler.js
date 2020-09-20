import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { injectReducer } from '../redux-reducers-injector';

import { flexibleStyleProptype } from './flexibleStyleProptype';

// injectReducer(
//   'isLightMode',
//   (state = false, action) => {
//     if (action.type === 'SET_LIGHT_MODE') {
//       return true;
//     } else if (action.type === 'SET_DARK_MODE') {
//       return false;
//     }
//     return state;
//   },
//   true
// );

const mapStateToProps = ({ isLightMode }) => ({ isLightMode });
const mapDispatchToProps = {
  setLightMode: () => dispatch => dispatch({ type: 'SET_LIGHT_MODE' }),
  setDarkMode: () => dispatch => dispatch({ type: 'SET_DARK_MODE' }),
};

export const withIsLightMode = connect(
  mapStateToProps,
  null,
  null,
  {
    getDisplayName: name => `withIsLightMode(${name})`,
  }
);

export const withLightModeDarkModeSetters = connect(
  null,
  mapDispatchToProps,
  null,
  {
    getDisplayName: name => `withLightModeDarkModeSetters(${name})`,
  }
);

export const withIsLightModeAndSetters = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    getDisplayName: name => `withIsLightModeAndSetters(${name})`,
  }
);

export function makeLightModeStyler(Comp) {
  class LightModeStyler extends PureComponent {
    static propTypes = {
      style: flexibleStyleProptype,
      lightModeStyle: flexibleStyleProptype,
      isLightMode: PropTypes.bool.isRequired,
      comp: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
    static defaultProps = {
      style: null,
      lightModeStyle: null,
      comp: null,
    };
    state = {};
    static getDerivedStateFromProps(props, state) {
      if (
        props.style !== state.style ||
        props.lightModeStyle !== state.lightModeStyle ||
        props.isLightMode !== state.isLightMode
      ) {
        return {
          style: props.style,
          lightModeStyle: props.lightModeStyle,
          isLightMode: props.isLightMode,
          multiStyle: !props.isLightMode
            ? props.style
            : [props.style, props.lightModeStyle], // .filter(item => !!item),
        };
      }
      return null;
    }
    render() {
      const compFromPropsKey = Comp
        ? 'KEEP_COMP_IN_REMAININGPROPS_VIA_THIS_NONSENSE_KEY'
        : 'comp';
      const {
        [compFromPropsKey]: comp,
        style,
        lightModeStyle,
        isLightMode,
        ...remainingProps
      } = this.props;
      const ComponentToUse = Comp || comp;
      return (
        <ComponentToUse style={this.state.multiStyle} {...remainingProps} />
      );
    }
  }
  return withIsLightMode(LightModeStyler);
}

const LightModeStyler = makeLightModeStyler();
export default LightModeStyler;
