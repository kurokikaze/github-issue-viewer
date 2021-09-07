import React, {useContext} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchReposPage} from '../../actions';
import {
  getOrgs,
  getOrgsLoading,
  getOrgsPage,
  getOrgsPagination,
} from '../../selectors';
import {GithubOrganizationResponse} from '../../types';
import {COLOR_LINKS} from '../../styles';
import {ThemeContext} from '../ThemeContext/ThemeContext';

import styles from './styles';
import {Pagination} from '../Pagination/Pagination';
import {isPaginationUsable} from '../../utils';

type ReposListProps = {
  onSelectOrg: (org: GithubOrganizationResponse) => void;
};

const linkRepoStyle: TextStyle = {
  color: COLOR_LINKS,
};

const OrgsList = ({onSelectOrg}: ReposListProps) => {
  const githubOrgs = useSelector(getOrgs);
  const isLoading = useSelector(getOrgsLoading);
  const pagination = useSelector(getOrgsPagination);
  const page = useSelector(getOrgsPage);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.baseContainer]}>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage => dispatch(fetchReposPage(newPage))}
        />
      ) : null}
      <View>
        <ScrollView style={styles.orgsContainer}>
          {githubOrgs.length > 0 &&
            githubOrgs.map(org => (
              <View key={org.id}>
                <Text
                  onPress={() => onSelectOrg(org)}
                  style={[theme.textStyle, styles.orgName, linkRepoStyle]}>
                  {org.login}{' '}
                </Text>
              </View>
            ))}
        </ScrollView>
        {isLoading && (
          <ActivityIndicator size={300} style={styles.overlayIndicator} />
        )}
      </View>
      {isPaginationUsable(pagination) ? (
        <Pagination
          links={pagination}
          page={page}
          loading={isLoading}
          onPageChange={newPage =>
            !isLoading && dispatch(fetchReposPage(newPage))
          }
        />
      ) : null}
    </View>
  );
};

export default OrgsList;
