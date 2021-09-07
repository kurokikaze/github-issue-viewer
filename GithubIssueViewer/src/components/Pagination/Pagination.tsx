import React, {useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {PaginationLinksType} from '../../types';
import {ThemeContext} from '../ThemeContext/ThemeContext';

import styles from './styles';

type PaginationProps = {
  links: PaginationLinksType;
  page: number;
  loading: boolean;
  onPageChange: (newPage: number) => void;
};

export const Pagination = ({
  links,
  page,
  loading,
  onPageChange,
}: PaginationProps) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <View>
        <Text
          onPress={() => links.first && onPageChange(links.first)}
          style={[
            theme.textStyle,
            styles.pagerText,
            !links.first && styles.pagerInactive,
          ]}>
          &lt;&lt;
        </Text>
      </View>
      <View>
        <Text
          onPress={() => links.prev && onPageChange(links.prev)}
          style={[
            theme.textStyle,
            styles.pagerText,
            !links.prev && styles.pagerInactive,
          ]}>
          &lt;
        </Text>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size={36} />
        ) : (
          <Text style={[theme.textStyle, styles.pagerText]}>{page}</Text>
        )}
      </View>
      <View>
        <Text
          onPress={() => links.next && onPageChange(links.next)}
          style={[
            theme.textStyle,
            styles.pagerText,
            !links.next && styles.pagerInactive,
          ]}>
          &gt;
        </Text>
      </View>
      <View>
        <Text
          onPress={() => links.last && onPageChange(links.last)}
          style={[
            theme.textStyle,
            styles.pagerText,
            !links.last && styles.pagerInactive,
          ]}>
          &gt;&gt;
        </Text>
      </View>
    </View>
  );
};
