import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignUpContainer = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  display: flex;
  flex-direction: column;
  width: 100vw;
  h2 {
    margin: 10px 0;
  }
  align-items: center;
`;

export const ButtonsContainer = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;

`;

export const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #dc3545;
  margin: 10px 0px;
`;

export const RowContainer = styled.div.attrs(() => ({
  className: 'col-12 col-lg-12 col-xl-12 col-md-12 col-sm-12 col-xs-12'
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;