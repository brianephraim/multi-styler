import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import MultiStyler, { makeMultiStyler } from './MultiStyler';
import LightModeStyler, {
  makeLightModeStyler,
  withIsLightMode,
  withLightModeDarkModeSetters,
} from './LightModeStyler';
import AppDimensionsStyler, {
  makeAppDimensionsStyler,
} from './AppDimensionsStyler';
import {
  LightModeMultiStyler,
  AppDimensionsMultiStyler,
  AppDimensionsLighModeMultiStyler,
  makeLightModeMultiStyler,
  makeAppDimensionsMultiStyler,
  makeAppDimensionsLighModeMultiStyler,
} from './CombinedStylers';

const TextMultiStyler = makeMultiStyler(Text);
const TextLM = makeLightModeStyler(Text);
const TextADS = makeAppDimensionsStyler(Text);
const TextADMulti = makeAppDimensionsMultiStyler(Text);
const TextADLMMulti = makeAppDimensionsLighModeMultiStyler(Text);
const TextLMMulti = makeLightModeMultiStyler(Text);

/* eslint-disable react/prop-types */
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: '#bbb',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  explanation: {
    padding: 20,
  },
  button: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 5,
    borderWidth: 5,
    borderColor: '#999',
  },
  text: {
    color: 'black',
    backgroundColor: '#aaa',
    padding: 5,
    margin: 1,
    fontSize: 11,
  },
  textExtra: {
    fontStyle: 'italic',
  },
  textLight: {
    backgroundColor: '#fff',
  },
});
function updateAppDimensionsStyle({ width, height }) {
  console.log('width, height', width, height);
  if (width > height) {
    return { color: 'red' };
  }
  return null;
}

const explanation = `Various style examples.
2 implementations have the same effects:  Factoried, and inline component prop.

Example style effects:
AppDimensions effect shows wide letter spacing on landscape.
LightMode makes the background lighter.
MultiStyle makes the text italic.

`;

class StylerExamplesNotConnected extends PureComponent {
  unlockAllOrientationsFor5Seconds = () => {
    clearTimeout(this.reLockTimeout);
    Orientation.unlockAllOrientations();
    this.reLockTimeout = setTimeout(() => {
      Orientation.lockToPortrait();
    }, 5000);
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.unlockAllOrientationsFor5Seconds}
          style={styles.button}
        >
          <Text>
            press to unlock orientation for 5 seconds to test
            AppDimensionsStyler effects, then rotate device (black text when
            portrait, red text when landscape)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.setLightMode}
          style={styles.button}
        >
          <Text>set light mode {this.props.isLightMode && '(on)'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.setDarkMode}
          style={styles.button}
        >
          <Text>set dark mode {!this.props.isLightMode && '(on)'}</Text>
        </TouchableOpacity>
        <AppDimensionsStyler
          comp={Text}
          style={styles.text}
          updateAppDimensionsStyle={updateAppDimensionsStyle}
        >
          AppDimensionsStyler inline comp
        </AppDimensionsStyler>
        <TextADS
          style={styles.text}
          updateAppDimensionsStyle={updateAppDimensionsStyle}
        >
          AppDimensionsStyler factoried
        </TextADS>
        <TextADMulti
          style={styles.text}
          updateAppDimensionsStyle={updateAppDimensionsStyle}
          style2={styles.textExtra}
        >
          AppDimensionsMultiStyler factoried
        </TextADMulti>
        <AppDimensionsMultiStyler
          comp={Text}
          style={styles.text}
          updateAppDimensionsStyle={updateAppDimensionsStyle}
          style2={styles.textExtra}
        >
          AppDimensionsMultiStyler inline comp
        </AppDimensionsMultiStyler>
        <TextADLMMulti
          style={styles.text}
          updateAppDimensionsStyle={updateAppDimensionsStyle}
          style2={styles.textExtra}
          lightModeStyle={styles.textLight}
        >
          AppDimensionsLighModeMultiStyler factoried
        </TextADLMMulti>
        <AppDimensionsLighModeMultiStyler
          comp={Text}
          style={styles.text}
          updateAppDimensionsStyle={updateAppDimensionsStyle}
          style2={styles.textExtra}
          lightModeStyle={styles.textLight}
        >
          AppDimensionsLighModeMultiStyler inline comp
        </AppDimensionsLighModeMultiStyler>
        <MultiStyler comp={Text} style={styles.text} style2={styles.textExtra}>
          MultiStyler inline comp
        </MultiStyler>
        <TextMultiStyler style={styles.text} style2={styles.textExtra}>
          MultiStyler factoried
        </TextMultiStyler>
        <LightModeStyler
          comp={Text}
          style={styles.text}
          lightModeStyle={styles.textLight}
        >
          LightModeStyler inline comp
        </LightModeStyler>
        <TextLM style={styles.text} lightModeStyle={styles.textLight}>
          LightModeStyler factoried
        </TextLM>
        <LightModeMultiStyler
          comp={Text}
          style={styles.text}
          lightModeStyle={styles.textLight}
          style2={styles.textExtra}
        >
          LightModeMultiStyler inline comp
        </LightModeMultiStyler>
        <TextLMMulti
          style={styles.text}
          lightModeStyle={styles.textLight}
          style2={styles.textExtra}
        >
          LightModeMultiStyler factoried
        </TextLMMulti>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
    );
  }
}

const StylerExamples = withIsLightMode(
  withLightModeDarkModeSetters(StylerExamplesNotConnected)
);
export default StylerExamples;
