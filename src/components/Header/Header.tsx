import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../../types';
import Bookmark from '../Bookmark/Bookmark';
import SettingsIcon from '../Settings/Settings';

import styles from './styles';

const Header = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Settings'>>();

  return (
    <View style={styles.container}>
      <SettingsIcon
        width={50}
        height={50}
        color={'#fff'}
        onPress={() => navigate('Settings')}
      />
      <Bookmark
        width={50}
        height={50}
        color={'#fff'}
        onPress={() => navigate('BookmarksBrowser')}
      />
    </View>
  );
};

export default Header;
