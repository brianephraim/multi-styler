import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shallowEqual from 'shallowequal';
import { flexibleStyleProptype } from './MultiStyler';

const mapStateToProps = ({ appDimensions }) => ({ appDimensions });

export const withAppDimensions = connect(mapStateToProps);

const makeNull = () => null;
export function makeAppDimensionsStyler(Comp) {
  class AppDimensionsStyler extends PureComponent {
    static isMultiStyler = true;
    static propTypes = {
      style: flexibleStyleProptype,
      comp: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      updateAppDimensionsStyle: PropTypes.func,
      appDimensions: PropTypes.object.isRequired,
    };
    static defaultProps = {
      style: null,
      comp: null,
      updateAppDimensionsStyle: makeNull,
    };
    state = {};
    static getDerivedStateFromProps(props, state) {
      if (
        props.style !== state.styleCache ||
        props.updateAppDimensionsStyle !==
          state.updateAppDimensionsStyleCache ||
        props.appDimensions !== state.appDimensionsCache
      ) {
        const nextAppDimensionsStyle = props.updateAppDimensionsStyle(
          props.appDimensions
        );
        const appDimensionsStyleChanged = !shallowEqual(
          nextAppDimensionsStyle,
          state.appDimensionsStyleCache
        );
        if (props.style !== state.styleCache || appDimensionsStyleChanged) {
          return {
            styleCache: props.style,
            updateAppDimensionsStyleCache: props.updateAppDimensionsStyle,
            appDimensionsCache: props.appDimensions,
            appDimensionsStyleCache: nextAppDimensionsStyle,
            style: [props.style, nextAppDimensionsStyle].filter(item => !!item),
          };
        }
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
        updateAppDimensionsStyle,
        appDimensions,
        ...remainingProps
      } = this.props;
      const ComponentToUse = Comp || comp;
      return <ComponentToUse style={this.state.style} {...remainingProps} />;
    }
  }
  return withAppDimensions(AppDimensionsStyler);
}

const AppDimensionsStyler = makeAppDimensionsStyler();
export default AppDimensionsStyler;
