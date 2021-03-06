const TYPE_USER = 'User';
const TYPE_ORG = 'Organization';

type GithubUserType = typeof TYPE_USER | typeof TYPE_ORG;

export type GithubUserResponse = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: GithubUserType;
  site_admin: boolean;
};

export type GithubRepositoryResponse = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUserResponse;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
};

export type GithubReposResponse = GithubRepositoryResponse[];

export type GithubNotFoundResponse = {
  message: string;
  documentation_url: string;
};

type GithubIssuePullRequestObject = {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
};

export type GithubIssueResponse = {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GithubUserResponse;
  labels: string[];
  state: string; // Actually enum
  locked: boolean;
  assignee: null;
  assignees: string[]; // No idea, it's always just me
  milestone: null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  pull_request: GithubIssuePullRequestObject;
  body: string;
  performed_via_github_app: null;
};

export type GithubIssuesResponse = GithubIssueResponse[];

export type RootStackParamList = {
  Settings: undefined;
  IssuesBrowser: undefined;
  BookmarksBrowser: undefined;
  IssueViewer: {
    issueId: number;
    isBookmark: boolean;
  };
};

export type PaginationLinksType = {
  first: number | null;
  last: number | null;
  prev: number | null;
  next: number | null;
};

export type BookmarkType = {
  issue: number;
  repo: string;
  username: string;
};

export type GithubOrganizationResponse = {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
};

export type GithubOrganizationsResponse = GithubOrganizationResponse[];

export type GithubCommentResponse = {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: GithubUserResponse;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
  performed_via_github_app: null;
};

export type GithubCommentsResponse = GithubCommentResponse[];
