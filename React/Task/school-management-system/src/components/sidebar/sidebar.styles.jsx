import styled from "styled-components";
import { Link } from 'react-router-dom';

export const SideBarContent = styled.div.attrs(() => ({
  className: 'col-4 col-lg-3  col-xxl-4  col-xxl-4 col-md-4 col-sm-11 cpl-xs-3'
}))`
  width: 100%;
  display: flex;
  flex-direction: column;
  // background-color:  #a275e9;
  background-color: #af8ee4;
`;
export const SideBarLink = styled.div`
  width: 100%;
  text-decoration: none;
  color: black;
  font-weight: 500;
  background-color: ${(props) => (props.isActive ? '#9458f2' : 'inherit')};
  &:hover {
    cursor: pointer;
    background-color:  #a275e9;
  }
`;

export const NavLink = styled(Link)`
  padding: 0px 5px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;


  
`;