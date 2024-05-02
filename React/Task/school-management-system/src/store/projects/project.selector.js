import { createSelector } from 'reselect';


export const selectProjectReducer = (state) => state.projects;

export const selectIsLoading = (state) => state.projects.isLoading;

export const selectProjects = createSelector(
  [selectProjectReducer],
  (projectsSlice) => projectsSlice.projects
);

