import { createSelector } from 'reselect';
import { CONSTANTS } from '../../constants/constants';


export const selectProjectReducer = (state) => state.projects;

export const selectIsLoading = (state) => state.projects.isLoading;

export const selectProjects = createSelector(
  [selectProjectReducer],
  (projectsSlice) => projectsSlice.projects
);


export const selectTotalProjectsCount = (state) => {
  return state.projects.projects.length;
}

export const selectProjectsState = (state) => {
  // const projects = state.projects.projects;

  // Use reduce to count projects based on status
  const counts = state.projects.projects.reduce((acc, project) => {
    if (project.status === CONSTANTS.PROJECT_ONGOING_STATUS) {
      acc.totalOngoingProjects++;
    } else if (project.status === CONSTANTS.PROJECT_HOLD_STATUS) {
      acc.totalHoldProjects++;
    } else if (project.status === CONSTANTS.PROJECT_COMPLETE_STATUS) {
      acc.totalCompleteProjects++;
    }
    acc.totalProjects++; // Increment total count for each project
    return acc;
  }, {
    totalOngoingProjects: 0,
    totalHoldProjects: 0,
    totalCompleteProjects: 0,
    totalProjects: 0 
  });

  return counts;
};


