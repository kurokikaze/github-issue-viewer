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

import RepoSearchScreen from '../../screens/RepoSearchScreen/RepoSearchScreen';
import IssuesBrowserScreen from '../../screens/IssuesBrowserScreen/IssuesBrowserScreen';
import IssueViewerScreen from '../../screens/IssueViewerScreen/IssueViewerScreen';

import {RootStackParamList} from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={RepoSearchScreen}
          options={{title: 'Search users'}}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;