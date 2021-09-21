import {Action, LOAD_ORGANIZATION_SUCCESS} from '../actions';

type ConfigurationShape = {
  organization: string;
};

export const initialState = {
  organization: '',
};

function configurationReducer(
  state: ConfigurationShape = initialState,
  action: Action,
): ConfigurationShape {
  switch (action.type) {
    case LOAD_ORGANIZATION_SUCCESS:
      return {
        ...state,
        organization: action.organization,
      };
    default:
      return state;
  }
}

export default configurationReducer;
