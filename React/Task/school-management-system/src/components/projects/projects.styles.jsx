import styled from "styled-components";

export const ProjectsTab = styled.div.attrs(() => ({
  className: 'col-11 col-lg-11 col-xl-11 col-xxl-11 col-md-10 col-sm-9 col-xs-9'
}))`
  display: flex;
  flex-direction: column; 
  margin-top: 5px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5px;
`;
