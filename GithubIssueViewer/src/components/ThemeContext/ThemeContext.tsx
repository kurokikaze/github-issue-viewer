import {createContext} from 'react';
import {StatusBarStyle, TextStyle, ViewStyle} from 'react-native';

type Theme = {
  textStyle: TextStyle;
  containerStyle: ViewStyle;
  barStyle: StatusBarStyle;
};

type ThemeStorage = Record<string, Theme>;

export const themes: ThemeStorage = {
  light: {
    textStyle: {color: '#cccccc'},
    containerStyle: {backgroundColor: '#eeeeee'},
    barStyle: 'light-content',
  },
  dark: {
    textStyle: {color: '#ffffff'},
    containerStyle: {backgroundColor: '#222222'},
    barStyle: 'dark-content',
  },
};

export const ThemeContext = createContext(themes.light);
