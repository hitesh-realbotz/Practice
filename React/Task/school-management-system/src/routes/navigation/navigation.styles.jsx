import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12 col-xxl-12 col-md-12 col-sm-12 '
}))`
  height: 70px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(193 116 237);
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 10px 15px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const Title = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: x-large;
  cursor: pointer;
  
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-weight: 500;
`;


export const HomeContainer = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  height: 100vh;
  display: flex;

  @media (max-width: 576px) { /* Extra small screens */
    .col-xs-2 {
      flex-basis: 16.66666667%; /* Override default behavior */
    }
    .col-xs-3 {
      flex-basis: 25%; /* Override default behavior */
    }
    .col-xs-4 {
      flex-basis: 33.33%; /* Override default behavior */
    }
    .col-sm-5 {
      flex-basis: 41.66666667%; /* Adjust to fit 11 columns */
    }
    .col-xs-6 {
      flex-basis: 50%; /* Override default behavior */
    }
    .col-xs-7 {
      flex-basis: 58.31%; /* Override default behavior */
    }
    .col-sm-8 {
      flex-basis: 66.66666667%; /* Adjust to fit 11 columns */
    }
    .col-xs-9 {
      flex-basis: 75%; /* Override default behavior */
    }
    .col-sm-11 {
      flex-basis: 91.66666667%; /* Adjust to fit 11 columns */
    }
    .col-sm-12 {
      flex-basis: 100%; /* Adjust to fit 11 columns */
    }
  }
 
`;
export const SideBarContainer = styled.div.attrs(() => ({
  className: 'col-1 col-lg-1 col-xl-1  col-xxl-1 col-md-2 col-sm-3 col-xs-3'
}))`
  display: flex;

`;