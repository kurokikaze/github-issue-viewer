import {GithubRepositoryResponse, GithubUserResponse} from '../types';

const testOwner: GithubUserResponse = {
  login: 'kurokikaze',
  id: 92214,
  node_id: 'MDQ6VXNlcjkyMjE0',
  avatar_url: 'https://avatars.githubusercontent.com/u/92214?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/kurokikaze',
  html_url: 'https://github.com/kurokikaze',
  followers_url: 'https://api.github.com/users/kurokikaze/followers',
  following_url:
    'https://api.github.com/users/kurokikaze/following{/other_user}',
  gists_url: 'https://api.github.com/users/kurokikaze/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/kurokikaze/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/kurokikaze/subscriptions',
  organizations_url: 'https://api.github.com/users/kurokikaze/orgs',
  repos_url: 'https://api.github.com/users/kurokikaze/repos',
  events_url: 'https://api.github.com/users/kurokikaze/events{/privacy}',
  received_events_url:
    'https://api.github.com/users/kurokikaze/received_events',
  type: 'User',
  site_admin: false,
};

export const testRepo: GithubRepositoryResponse = {
  id: 215071064,
  node_id: 'MDEwOlJlcG9zaXRvcnkyMTUwNzEwNjQ=',
  name: 'amadeus-bot',
  full_name: 'kurokikaze/amadeus-bot',
  private: false,
  owner: testOwner,
  html_url: 'https://github.com/kurokikaze/amadeus-bot',
  description: 'Bot for "Unleash the Geek" challenge',
  fork: false,
  url: 'https://api.github.com/repos/kurokikaze/amadeus-bot',
  forks_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/forks',
  keys_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/keys{/key_id}',
  collaborators_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/collaborators{/collaborator}',
  teams_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/teams',
  hooks_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/hooks',
  issue_events_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/issues/events{/number}',
  events_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/events',
  assignees_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/assignees{/user}',
  branches_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/branches{/branch}',
  tags_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/tags',
  blobs_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/git/blobs{/sha}',
  git_tags_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/git/tags{/sha}',
  git_refs_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/git/refs{/sha}',
  trees_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/git/trees{/sha}',
  statuses_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/statuses/{sha}',
  languages_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/languages',
  stargazers_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/stargazers',
  contributors_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/contributors',
  subscribers_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/subscribers',
  subscription_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/subscription',
  commits_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/commits{/sha}',
  git_commits_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/git/commits{/sha}',
  comments_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/comments{/number}',
  issue_comment_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/issues/comments{/number}',
  contents_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/contents/{+path}',
  compare_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/compare/{base}...{head}',
  merges_url: 'https://api.github.com/repos/kurokikaze/amadeus-bot/merges',
  archive_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/{archive_format}{/ref}',
  downloads_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/downloads',
  issues_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/issues{/number}',
  pulls_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/pulls{/number}',
  milestones_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/milestones{/number}',
  notifications_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/notifications{?since,all,participating}',
  labels_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/labels{/name}',
  releases_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/releases{/id}',
  deployments_url:
    'https://api.github.com/repos/kurokikaze/amadeus-bot/deployments',
  created_at: '2019-10-14T14:52:50Z',
  updated_at: '2019-10-16T08:45:32Z',
  pushed_at: '2019-10-16T08:45:30Z',
  git_url: 'git://github.com/kurokikaze/amadeus-bot.git',
  ssh_url: 'git@github.com:kurokikaze/amadeus-bot.git',
  clone_url: 'https://github.com/kurokikaze/amadeus-bot.git',
  svn_url: 'https://github.com/kurokikaze/amadeus-bot',
  homepage: null,
  size: 14,
  stargazers_count: 0,
  watchers_count: 0,
  language: 'JavaScript',
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  forks_count: 0,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: null,
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: 'master',
};

export const anotherTestRepo: GithubRepositoryResponse = {
  id: 155540694,
  node_id: 'MDEwOlJlcG9zaXRvcnkxNTU1NDA2OTQ=',
  name: 'andor-vis',
  full_name: 'kurokikaze/andor-vis',
  private: false,
  owner: testOwner,
  html_url: 'https://github.com/kurokikaze/andor-vis',
  description: 'Andor map graph and visualisation',
  fork: false,
  url: 'https://api.github.com/repos/kurokikaze/andor-vis',
  forks_url: 'https://api.github.com/repos/kurokikaze/andor-vis/forks',
  keys_url: 'https://api.github.com/repos/kurokikaze/andor-vis/keys{/key_id}',
  collaborators_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/collaborators{/collaborator}',
  teams_url: 'https://api.github.com/repos/kurokikaze/andor-vis/teams',
  hooks_url: 'https://api.github.com/repos/kurokikaze/andor-vis/hooks',
  issue_events_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/issues/events{/number}',
  events_url: 'https://api.github.com/repos/kurokikaze/andor-vis/events',
  assignees_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/assignees{/user}',
  branches_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/branches{/branch}',
  tags_url: 'https://api.github.com/repos/kurokikaze/andor-vis/tags',
  blobs_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/git/blobs{/sha}',
  git_tags_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/git/tags{/sha}',
  git_refs_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/git/refs{/sha}',
  trees_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/git/trees{/sha}',
  statuses_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/statuses/{sha}',
  languages_url: 'https://api.github.com/repos/kurokikaze/andor-vis/languages',
  stargazers_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/stargazers',
  contributors_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/contributors',
  subscribers_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/subscribers',
  subscription_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/subscription',
  commits_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/commits{/sha}',
  git_commits_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/git/commits{/sha}',
  comments_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/comments{/number}',
  issue_comment_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/issues/comments{/number}',
  contents_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/contents/{+path}',
  compare_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/compare/{base}...{head}',
  merges_url: 'https://api.github.com/repos/kurokikaze/andor-vis/merges',
  archive_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/{archive_format}{/ref}',
  downloads_url: 'https://api.github.com/repos/kurokikaze/andor-vis/downloads',
  issues_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/issues{/number}',
  pulls_url: 'https://api.github.com/repos/kurokikaze/andor-vis/pulls{/number}',
  milestones_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/milestones{/number}',
  notifications_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/notifications{?since,all,participating}',
  labels_url: 'https://api.github.com/repos/kurokikaze/andor-vis/labels{/name}',
  releases_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/releases{/id}',
  deployments_url:
    'https://api.github.com/repos/kurokikaze/andor-vis/deployments',
  created_at: '2018-10-31T10:42:36Z',
  updated_at: '2018-10-31T12:18:29Z',
  pushed_at: '2018-10-31T12:18:28Z',
  git_url: 'git://github.com/kurokikaze/andor-vis.git',
  ssh_url: 'git@github.com:kurokikaze/andor-vis.git',
  clone_url: 'https://github.com/kurokikaze/andor-vis.git',
  svn_url: 'https://github.com/kurokikaze/andor-vis',
  homepage: null,
  size: 2,
  stargazers_count: 0,
  watchers_count: 0,
  language: 'JavaScript',
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  forks_count: 0,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 5,
  license: null,
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: 'master',
};
