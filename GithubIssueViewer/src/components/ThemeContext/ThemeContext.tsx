import {createContext} from 'react';
import {StatusBarStyle, TextStyle, ViewStyle} from 'react-native';
import themes from '../../styles/themes';

type Theme = {
  textStyle: TextStyle;
  containerStyle: ViewStyle;
  alternativeContainerStyle: ViewStyle;
  barStyle: StatusBarStyle;
};

export const ThemeContext = createContext(themes.light);
