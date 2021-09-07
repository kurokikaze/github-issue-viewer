import {Action, BOOKMARK_ISSUE_SUCCESS, REMOVE_BOOKMARK} from '../actions';
import {BookmarkType, GithubIssuesResponse} from '../types';

type BookmarksShape = {
  bookmarks: BookmarkType[];
  issues: GithubIssuesResponse;
};

const initialState = {
  bookmarks: [],
  issues: [],
};

function issuesReducer(
  state: BookmarksShape = initialState,
  action: Action,
): BookmarksShape {
  switch (action.type) {
    case BOOKMARK_ISSUE_SUCCESS:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.bookmark],
        issues: action.issue ? [...state.issues, action.issue] : state.issues,
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          ({issue}) => issue !== action.issueId,
        ),
        issues: state.issues.filter(({id}) => id !== action.issueId),
      };
    default:
      return state;
  }
}

export default issuesReducer;
