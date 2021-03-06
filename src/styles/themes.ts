import {TextStyle, ViewStyle, StatusBarStyle} from 'react-native';

type Theme = {
  textStyle: TextStyle;
  containerStyle: ViewStyle;
  alternativeContainerStyle: ViewStyle;
  barStyle: StatusBarStyle;
};

type ThemeStorage = Record<string, Theme>;

const themes: ThemeStorage = {
  light: {
    textStyle: {color: '#333'},
    containerStyle: {backgroundColor: '#ccc'},
    alternativeContainerStyle: {backgroundColor: '#ddd'},
    barStyle: 'light-content',
  },
  dark: {
    textStyle: {color: '#E8CAA4'},
    containerStyle: {backgroundColor: '#351330'},
    alternativeContainerStyle: {backgroundColor: '#424254'},
    barStyle: 'light-content',
  },
};

export default themes;
