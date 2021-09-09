import React, {useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ThemeContext} from '../ThemeContext/ThemeContext';
import {getIssuesSorting} from '../../selectors';
import {changeIssuesSorting} from '../../actions';

import styles from './styles';

export const SORT_BY_CREATED_AT = 'created_at';
export const SORT_BY_UPDATED_AT = 'updated_at';
export const SORT_BY_COMMENTS = 'comments';
export const SORT_NONE = 'none';

export const SORT_DIRECTION_ASC = 'asc';
export const SORT_DIRECTION_DESC = 'desc';

export type SortingFieldType =
  | typeof SORT_BY_CREATED_AT
  | typeof SORT_BY_UPDATED_AT
  | typeof SORT_BY_COMMENTS
  | typeof SORT_NONE;

export type SortingDirectionType =
  | typeof SORT_DIRECTION_ASC
  | typeof SORT_DIRECTION_DESC;

export type SortingType = {
  field: SortingFieldType;
  direction: SortingDirectionType;
};

const {Item} = Picker;

const IssuesSorter = () => {
  const theme = useContext(ThemeContext);
  const {field = SORT_NONE, direction} = useSelector(getIssuesSorting);
  const dispatch = useDispatch();

  return (
    <View style={[theme.containerStyle, styles.filterContainer]}>
      <Text style={[theme.textStyle, styles.text]}>Sort by:</Text>
      {
        <Picker<SortingFieldType>
          mode="dropdown"
          selectedValue={field}
          style={[theme.containerStyle, theme.textStyle, styles.text]}
          itemStyle={theme.containerStyle}
          onValueChange={newField =>
            dispatch(changeIssuesSorting({field: newField, direction}))
          }>
          <Item style={theme.textStyle} label="No sorting" value={SORT_NONE} />
          <Item
            style={theme.textStyle}
            label="Created at"
            value={SORT_BY_CREATED_AT}
          />
          <Item
            style={theme.textStyle}
            label="Updated at"
            value={SORT_BY_UPDATED_AT}
          />
          <Item
            style={theme.textStyle}
            label="Number of comments"
            value={SORT_BY_COMMENTS}
          />
        </Picker>
      }
      {field !== SORT_NONE && (
        <View>
          <Text style={[theme.textStyle, styles.text]}>Sorting direction:</Text>
          <Picker<SortingDirectionType>
            mode="dropdown"
            selectedValue={direction}
            style={[theme.containerStyle, theme.textStyle, styles.text]}
            itemStyle={theme.containerStyle}
            onValueChange={newDirection =>
              dispatch(changeIssuesSorting({field, direction: newDirection}))
            }>
            <Item
              style={theme.textStyle}
              label="Ascending"
              value={SORT_DIRECTION_ASC}
            />
            <Item
              style={theme.textStyle}
              label="Descending"
              value={SORT_DIRECTION_DESC}
            />
          </Picker>
        </View>
      )}
    </View>
  );
};

export default IssuesSorter;
