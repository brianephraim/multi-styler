import React, { PureComponent } from 'react';
import { makeAppDimensionsStyler } from './AppDimensionsStyler';
import MultiStyler from './MultiStyler';
import { makeLightModeStyler } from './LightModeStyler';

export const LightModeMultiStyler = makeLightModeStyler(MultiStyler);
export const AppDimensionsMultiStyler = makeLightModeStyler(MultiStyler);
export const AppDimensionsLighModeMultiStyler = makeAppDimensionsStyler(
  LightModeMultiStyler
);

function makeStylerMaker(Wrap) {
  return function makeLightModeMultiStyler(Comp) {
    class LightModeMultiStylerMaker extends PureComponent {
      static displayName = `${Comp.name}Maker`;
      render() {
        return <Wrap {...this.props} comp={Comp} />;
      }
    }
    return LightModeMultiStylerMaker;
  };
}
export const makeLightModeMultiStyler = makeStylerMaker(LightModeMultiStyler);
export const makeAppDimensionsMultiStyler = makeStylerMaker(
  AppDimensionsMultiStyler
);
export const makeAppDimensionsLighModeMultiStyler = makeStylerMaker(
  AppDimensionsLighModeMultiStyler
);
