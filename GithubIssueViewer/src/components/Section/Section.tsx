import React, {useContext} from 'react';
import {Text, View, ViewStyle} from 'react-native';

import styles from '../../styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';

const Section: React.FC<{
  title: string;
  style?: ViewStyle;
}> = ({children, title, style}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.sectionContainer, style || {}]}>
      <Text style={[theme.textStyle, styles.sectionTitle]}>{title}</Text>
      <Text style={[theme.textStyle, styles.sectionDescription]}>
        {children}
      </Text>
    </View>
  );
};

export default Section;
