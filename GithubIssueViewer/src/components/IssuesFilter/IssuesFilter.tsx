import React, {useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ThemeContext} from '../ThemeContext/ThemeContext';
import {getIssuesFilter} from '../../selectors';
import {changeIssuesFilter} from '../../actions';

import styles from './styles';

export const FILTER_ALL = 'all';
export const FILTER_OPEN = 'open';
export const FILTER_CLOSED = 'closed';

export type FilterType =
  | typeof FILTER_ALL
  | typeof FILTER_OPEN
  | typeof FILTER_CLOSED;

const {Item} = Picker;

export const IssuesFilter = () => {
  const theme = useContext(ThemeContext);
  const currentFilter = useSelector(getIssuesFilter);
  const dispatch = useDispatch();

  return (
    <View style={[theme.containerStyle, styles.filterContainer]}>
      <Text style={[theme.textStyle, styles.text]}>Issue status:</Text>
      <Picker<FilterType>
        mode="dropdown"
        selectedValue={currentFilter}
        style={[theme.containerStyle, theme.textStyle, styles.text]}
        itemStyle={theme.textStyle}
        onValueChange={itemValue => dispatch(changeIssuesFilter(itemValue))}>
        <Item style={theme.textStyle} label="All" value={FILTER_ALL} />
        <Item style={theme.textStyle} label="Open" value={FILTER_OPEN} />
        <Item style={theme.textStyle} label="Closed" value={FILTER_CLOSED} />
      </Picker>
    </View>
  );
};
