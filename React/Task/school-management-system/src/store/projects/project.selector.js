import { createSelector } from 'reselect';


export const selectProjectReducer = (state) => state.projects;


export const selectProjects = createSelector(
  [selectProjectReducer],
  (projectsSlice) => projectsSlice.projects
);

