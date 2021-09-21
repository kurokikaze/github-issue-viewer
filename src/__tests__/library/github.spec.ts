import {
  fetchUser,
  fetchOrganizations,
  fetchRepos,
  fetchIssues,
  fetchComments,
} from '../../library/github';
import {testOwner} from '../../testData/testRepo';
import {testOrganization} from '../../testData/testOrganization';
import {testRepo} from '../../testData/testRepo';
import {testIssue} from '../../testData/testIssue';
import {testComment} from '../../testData/testComment';
import fetchMock, {enableFetchMocks} from 'jest-fetch-mock';
import {FILTER_ALL} from '../../components/IssuesFilter/IssuesFilter';

enableFetchMocks();

describe('fetchUser', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches users from Github', async () => {
    fetchMock.mockResponse(JSON.stringify(testOwner));

    const response = await fetchUser('testUser');

    expect(response).toEqual(testOwner);

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/users/testUser',
    );
  });
});

describe('fetchOrganizations', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches organizations from Github', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        headers: {
          link: '<https://api.github.com/users/testUser/orgs?page=1>; rel="prev", <https://api.github.com/users/testUser/orgs?page=1>; rel="first"',
        },
        body: JSON.stringify([testOrganization]),
      }),
    );

    const response = await fetchOrganizations('testUser', 1);

    expect(response).toEqual({
      pagination: {
        first: 1,
        prev: 1,
        next: null,
        last: null,
      },
      result: [testOrganization],
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/users/testUser/orgs?page=1',
    );
  });
});

describe('fetchRepos', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches repositories from Github', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        headers: {
          link: '<https://api.github.com/repositories/21622084/issues?page=2>; rel="next", <https://api.github.com/repositories/21622084/issues?page=4>; rel="last"',
        },
        body: JSON.stringify([testRepo]),
      }),
    );

    const response = await fetchRepos('testOrg', 2);

    expect(response).toEqual({
      pagination: {
        first: null,
        prev: null,
        next: 2,
        last: 4,
      },
      result: [testRepo],
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/orgs/testOrg/repos?page=2',
    );
  });
});

describe('fetchIssues', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches issues from Github', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        headers: {
          link: '<https://api.github.com/repos/testUser/testOrg/issues?page=1>; rel="first", <https://api.github.com/repos/testUser/testOrg/issues?page=2>; rel="prev", <https://api.github.com/repos/testUser/testOrg/issues?page=4>; rel="next", <https://api.github.com/repos/testUser/testOrg/issues?page=8>; rel="last"',
        },
        body: JSON.stringify([testIssue]),
      }),
    );

    const response = await fetchIssues('testUser', 'testRepo', 3, FILTER_ALL, {
      field: 'comments',
      direction: 'asc',
    });

    expect(response).toEqual({
      pagination: {
        first: 1,
        prev: 2,
        next: 4,
        last: 8,
      },
      result: [testIssue],
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/repos/testUser/testRepo/issues?page=3&state=all&sort=comments&direction=asc',
    );
  });
});

describe('fetchComments', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches comments from Github', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        headers: {
          link: '<https://api.github.com/repos/testUser/testOrg/issues?page=1>; rel="first", <https://api.github.com/repos/testUser/testOrg/issues?page=2>; rel="prev", <https://api.github.com/repos/testUser/testOrg/issues?page=4>; rel="next", <https://api.github.com/repos/testUser/testOrg/issues?page=8>; rel="last"',
        },
        body: JSON.stringify([testComment]),
      }),
    );

    const response = await fetchComments('testUser', 'testRepo', 72, 3);

    expect(response).toEqual({
      pagination: {
        first: 1,
        prev: 2,
        next: 4,
        last: 8,
      },
      result: [testComment],
    });

    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://api.github.com/repos/testUser/testRepo/issues/72/comments?page=3',
    );
  });
});
