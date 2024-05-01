import { PROJECTS_ACTION_TYPES } from './project.types';

export const PROJECTS_INITIAL_STATE = {
  projects: [  ],
  isLoading: false,
  error: null,
};

export const projectsReducer = (
  state = PROJECTS_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
    
  switch (type) {
    case PROJECTS_ACTION_TYPES.FETCH_PROJECTS_START:
    case PROJECTS_ACTION_TYPES.ADD_PROJECT_START:
    case PROJECTS_ACTION_TYPES.UPDATE_PROJECT_START:
    case PROJECTS_ACTION_TYPES.DELETE_PROJECT_START:
      return { ...state, isLoading: true };

    case PROJECTS_ACTION_TYPES.FETCH_PROJECTS_SUCCESS:
    case PROJECTS_ACTION_TYPES.ADD_PROJECT_SUCCESS:
    case PROJECTS_ACTION_TYPES.UPDATE_PROJECT_SUCCESS:
    case PROJECTS_ACTION_TYPES.DELETE_PROJECT_SUCCESS:
      return { ...state, projects: payload, isLoading: false };

    case PROJECTS_ACTION_TYPES.FETCH_PROJECTS_FAILED:
    case PROJECTS_ACTION_TYPES.ADD_PROJECT_FAILED:
    case PROJECTS_ACTION_TYPES.UPDATE_PROJECT_FAILED:
    case PROJECTS_ACTION_TYPES.DELETE_PROJECT_FAILED:
      return { ...state, error: payload, isLoading: false };
      
    default:
      return state;
  }
};
