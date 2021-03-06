/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

import {ThemeContext} from '../ThemeContext/ThemeContext';
import RepoSearchScreen from '../../screens/RepoSearchScreen/RepoSearchScreen';
import IssuesBrowserScreen from '../../screens/IssuesBrowserScreen/IssuesBrowserScreen';
import IssueViewerScreen from '../../screens/IssueViewerScreen/IssueViewerScreen';
import BookmarksBrowserScreen from '../../screens/BookmarksBrowserScreen/BookmarksBrowserScreen';

import {RootStackParamList} from '../../types';
import themes from '../../styles/themes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeContext.Provider value={isDarkMode ? themes.dark : themes.light}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="IssuesBrowser">
          <Stack.Screen
            name="Settings"
            component={RepoSearchScreen}
            options={{title: 'Settings'}}
          />
          <Stack.Screen
            name="IssuesBrowser"
            component={IssuesBrowserScreen}
            options={{title: 'Browse Issues'}}
          />
          <Stack.Screen
            name="IssueViewer"
            component={IssueViewerScreen}
            options={{title: 'Issue Viewer'}}
          />
          <Stack.Screen
            name="BookmarksBrowser"
            component={BookmarksBrowserScreen}
            options={{title: 'Issue Viewer'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;
